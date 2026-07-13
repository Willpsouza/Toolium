# Security Audit — Toolium

> FASE 2 da Etapa 09 — Plano de correção de segurança.
> Auditoria concluída na FASE 1 (somente leitura). **Nada implementado ainda neste documento.**

## Auditoria — resumo do estado atual

O Toolium é uma aplicação **majoritariamente estática** (SSG, sem auth, sem DB em uso, sem uploads ao servidor), o que reduz significativamente a superfície de ataque. Pontos fortes já presentes:

- ✅ **Sem auth, sem DB, sem uploads** → superfície de ataque mínima;
- ✅ **Ferramentas processam dados client-side** (Canvas, Web Crypto, localStorage) → dados sensíveis não saem do dispositivo;
- ✅ **`dangerouslySetInnerHTML`** — todos os 6 usos são com `JSON.stringify()` de objetos schema fixos (Organization, WebSite, Breadcrumb, FAQ, HowTo, ItemList, CollectionPage) ou CSS de chart órfão → **não há input do usuário** → **não é vulnerável XSS**;
- ✅ **`.gitignore`** cobre `.env*`, `*.log`, `db/*.db` (verificado: `.env*` está ignorado);
- ✅ **Sem Open Redirect** — não há redirects baseados em input do usuário;
- ✅ **Sem `eval()` / `new Function()` / `innerHTML` direto** em código de produto;
- ✅ **Sem cookies HTTP definidos pelo app** (cookie consent usa localStorage; sidebar órfão usa cookie mas não é renderizado);
- ✅ **Sem middleware** — OK para site estático sem auth;
- ✅ **`next/font`** self-hosted → sem requisição a fonts.googleapis.com (reduz exposição);
- ✅ **Links externos** com `rel="noopener noreferrer"` (Etapa 01 auditou);
- ✅ **AdSense com gating por consentimento** (Etapa 07) → LGPD/GDPR compliant.

Foram encontrados **7 itens** de oportunidade, listados abaixo.

---

## Itens encontrados

### SEC-01 — Sem headers de segurança HTTP no `next.config.ts`
- **Arquivo**: `next.config.ts`
- **Problema**: O `next.config.ts` não define `headers()`. Não há:
  - `Content-Security-Policy` (CSP)
  - `X-Frame-Options` (ou `frame-ancestors` no CSP)
  - `X-Content-Type-Options`
  - `Referrer-Policy`
  - `Permissions-Policy`
  - `Strict-Transport-Security` (HSTS)
- **Impacto**: ALTO. Sem esses headers, o site está mais exposto a clickjacking, MIME sniffing, vazamento de referrer, embed não autorizado em iframes, e ataques de injeção. Para aprovação AdSense e boas práticas de produção, todos são recomendados.
- **Prioridade**: 🔴 ALTA
- **Como corrigir**: Adicionar `headers()` no `next.config.ts` com todos os headers. CSP deve permitir: self, AdSense (`pagead2.googlesyndication.com`, `adservice.google.com`, `googleads.g.doubleclick.net`, `tpc.googlesyndication.com`), fonts self-hosted, inline styles (Tailwind exige `'unsafe-inline'` para styles ou nonce), inline JSON-LD scripts.
- **Risco**: MÉDIO. CSP muito restritiva pode quebrar AdSense ou estilos Tailwind. Solução: CSP com `'unsafe-inline'` para styles (necessário para Tailwind 4 que injeta estilos em runtime) e permitir domínios do AdSense. Não usar `'unsafe-inline'` para scripts (JSON-LD é `<script type="application/ld+json">` que o Next executa, mas CSP para scripts com nonce seria ideal — porém Next 16 App Router não gera nonce automático sem middleware). Abordagem segura: CSP que permite `'self'` para scripts + domínios AdSense, `'unsafe-inline'` para styles (Tailwind), e confiaria que JSON-LD não é atacável (conteúdo é `JSON.stringify` de objetos fixos).
- **Decisão**: Implementar headers com CSP permissiva o suficiente para não quebrar nada, mas restritiva o suficiente para proteger. Validar com Agent Browser que AdSense, fontes e estilos continuam funcionando.

### SEC-02 — `X-Powered-By: Next.js` exposto
- **Arquivo**: `next.config.ts`
- **Problema**: Header `X-Powered-By: Next.js` é enviado em todas as respostas, revelando a stack tecnológica (fingerprinting).
- **Impacto**: BAIXO. Informação útil para atacantes planejar exploits específicos do Next.js.
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Adicionar `poweredByHeader: false` no `next.config.ts`.
- **Risco**: BAIXO. Apenas remove um header; não afeta funcionalidade.

### SEC-03 — Sem `error.tsx` (página 500 customizada)
- **Arquivo**: `src/app/error.tsx` (não existe)
- **Problema**: Sem `error.tsx`, erros de runtime em produção mostram uma página de erro genérica do Next.js que pode vazar informações em alguns cenários. Mais importante: experiência do usuário em erro não é tratada.
- **Impacto**: MÉDIO. UX ruim em erros; potencial vazamento de info em dev (stack traces).
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Criar `src/app/error.tsx` (client component) com UI em pt-BR, botão "Tentar novamente", e link para home. Não logar detalhes do erro no console em produção.
- **Risco**: BAIXO. Convenção nativa do Next.js; não afeta rotas existentes.

### SEC-04 — Dependências com vulnerabilidades conhecidas (54 total)
- **Arquivo**: `package.json`
- **Problema**: `bun audit` reporta 54 vulnerabilidades (24 high, 25 moderate, 5 low). Quase todas em **dependências transitivas de pacotes não usados pelo produto**:
  - `picomatch` (high — ReDoS) via `next-intl` (órfão) e `eslint-config-next` (dev);
  - Outras em `@dnd-kit`, `@mdxeditor`, `recharts`, `vaul`, `cmdk` — todos sustentam componentes UI órfãos.
- **Impacto**: BAIXO-MÉDIO. As vulnerabilidades estão em deps não importadas pelo bundle de produção (tree-shaking remove). `picomatch` via eslint é dev-only. Mas o relatório de audit polui e pode sinalizar em CI.
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: A correção real é remover deps órfãs (Etapa 09 de limpeza, futura). Nesta etapa, **apenas documentar** — não desinstalar deps (risco de quebrar algo, fora do escopo "sem alterar funcionalidades"). `bun update` poderia ajudar mas pode introduzir breaking changes.
- **Risco**: N/A (adiado — requer etapa de limpeza de deps).
- **Decisão**: Documentar como pendência. As vulnerabilidades não afetam o bundle de produção (deps não importadas).

### SEC-05 — `reactStrictMode: false`
- **Arquivo**: `next.config.ts`
- **Problema**: `reactStrictMode` está desativado. Strict mode ajuda a detectar bugs potenciais (efeitos colaterais, refs mutáveis) em desenvolvimento.
- **Impacto**: BAIXO. Não é vulnerabilidade direta, mas desativa verificações de qualidade.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Mudar para `reactStrictMode: true`. Pode causar dupla-renderização em dev (comportamento esperado para detectar bugs).
- **Risco**: BAIXO em produção (strict mode só afeta dev). **Mas pode alterar comportamento em dev** (dupla invocação de effects). Conforme regra "não alterar funcionalidades", e como o produto já está validado sem strict mode, **adiar** para não introduzir regressões em dev.
- **Decisão**: Documentar como recomendação futura. Não implementar nesta etapa.

### SEC-06 — `ignoreBuildErrors: true` no next.config
- **Arquivo**: `next.config.ts`
- **Problema**: `typescript.ignoreBuildErrors: true` faz o build ignorar erros de tipo — pode mascarar bugs que viram vulnerabilidades (ex.: tipo any permitindo input malicioso).
- **Impacto**: MÉDIO. Hoje `src/` está limpo, mas a flag remove uma camada de proteção.
- **Prioridade**: 🟡 MÉDIA
- **Como corrigir**: Remover `typescript.ignoreBuildErrors`. Como `src/` compila limpo, não haverá erros.
- **Risco**: BAIXO (src/ está limpo). **Mas**: se houver erro latente em arquivo não coberto pelo `tsc --noEmit` manual, o build quebraria. Conforme regra "não alterar funcionalidades", e como mudar config de build é sensível, **adiar** para etapa de higiene de config dedicada.
- **Decisão**: Documentar como recomendação futura (já em `docs/09-PONTOS_DE_MELHORIA.md` ALTO-1).

### SEC-07 — Sem `.env.example` documentando variáveis necessárias
- **Arquivo**: `.env.example` (não existe)
- **Problema**: O projeto usa `DATABASE_URL` (em `lib/db.ts`, órfão) mas não há `.env.example` documentando variáveis de ambiente necessárias. Embora `.gitignore` cubra `.env*`, um novo desenvolvedor não saberia o que configurar.
- **Impacto**: BAIXO. O produto em si não usa DB, mas `lib/db.ts` importa `@prisma/client` que exige `DATABASE_URL`.
- **Prioridade**: 🟢 BAIXA
- **Como corrigir**: Criar `.env.example` com `DATABASE_URL="file:./db/custom.db"` documentado.
- **Risco**: BAIXO. Apenas arquivo de exemplo, não afeta código.

---

## Itens NÃO corrigidos (confirmados OK)

| Item | Estado |
|---|---|
| `dangerouslySetInnerHTML` | ✅ Seguro — todos com `JSON.stringify` de objetos fixos |
| Open Redirects | ✅ Nenhum (sem redirects baseados em input) |
| XSS | ✅ Sem `eval`/`innerHTML` direto; inputs são controlados por React |
| Sanitização de entradas | ✅ Ferramentas usam `parseNumber` (não `eval`); Canvas API não injeta HTML |
| Variáveis de ambiente | ✅ `.env` no `.gitignore`; `DATABASE_URL` é path SQLite local (não secret) |
| Exposição de chaves | ✅ AdSense client é público (não secret); sem API keys no código |
| Cookies HTTP | ✅ App não define cookies HTTP (cookie consent usa localStorage) |
| Middleware | ✅ Não necessário (site estático sem auth) |
| Página 404 | ✅ Customizada em pt-BR (Etapa 06) |
| Cache-Control | ✅ Gerenciado pelo Next.js/Vercel para assets estáticos |
| Links externos | ✅ `rel="noopener noreferrer"` |
| Fontes | ✅ Self-hosted via next/font |

## Tratamento de erros — análise
- ✅ Ferramentas usam guards (`Number.isFinite`, try/catch em AdBanner push, cleanup em effects);
- ✅ `notFound()` do next/navigation em rotas dinâmicas para slugs inválidos;
- ⚠️ Sem `error.tsx` global — erros de runtime não tratados mostram página default (SEC-03);
- ✅ Sem stack traces expostos em produção (Next.js esconde por default em `NODE_ENV=production`).

---

## Plano de implementação (FASE 3)

Itens a implementar (seguros, baixo risco, não alteram funcionalidades):

1. **SEC-01** (ALTA) — Adicionar `headers()` no `next.config.ts` com CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS.
2. **SEC-02** (MÉDIA) — Adicionar `poweredByHeader: false` no `next.config.ts`.
3. **SEC-03** (MÉDIA) — Criar `src/app/error.tsx` (client component) com UI pt-BR e botão "Tentar novamente".
4. **SEC-07** (BAIXA) — Criar `.env.example` documentando `DATABASE_URL`.

Itens adiados (requerem etapa dedicada ou podem alterar comportamento):
- **SEC-04** (deps vulneráveis) — remover deps órfãs em etapa de limpeza;
- **SEC-05** (reactStrictMode) — pode alterar comportamento em dev;
- **SEC-06** (ignoreBuildErrors) — mudar config de build é sensível.

**Arquivos a modificar na FASE 3**: `next.config.ts` (headers + poweredByHeader), `src/app/error.tsx` (novo), `.env.example` (novo).

**Arquivos NÃO modificar**: ferramentas, componentes, layout, rotas, dados, lib, AdSense, SEO, UX.

**Validação pós-implementação**: lint + tsc + dev server + Agent Browser (verificar headers servidos, AdSense funciona, estilos Tailwind funcionam, error.tsx não quebra nada).
