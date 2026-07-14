# 15 — Checklist Pré-Deploy

> Checklist a executar **antes de cada deploy** do Toolium à produção (Vercel / toolium.com.br).
> Complementar ao `docs/14-CHECKLIST_DE_DESENVOLVEMENTO.md` (que é por-tarefa); este é por-release.

## ☐ A. Build e tipo

```
☐ A.1  `bun run lint` limpo (0 erros, 0 warnings)
☐ A.2  `bunx tsc --noEmit` sem erros em `src/`
☐ A.3  `bun run build` (ou `next build`) executa sem erros
☐ A.4  Build `standalone` gerado (.next/standalone)
☐ A.5  Pasta `public/` copiada para o standalone (script de build já faz)
```

## ☐ B. Variáveis de ambiente

```
☐ B.1  `DATABASE_URL` definida (mesmo que Prisma não seja usado, o client importado em lib/db.ts pode exigir) — ou confirmar que lib/db.ts foi removido
☐ B.2  Sem secrets committed (grep por chaves/tokens no diff)
☐ B.3  `siteConfig.url` em src/lib/seo.ts aponta para https://toolium.com.br (já configurado)
☐ B.4  `siteConfig.adsenseClient` = ca-pub-2570963650556560 (já configurado)
```

## ☐ C. SEO de produção

```
☐ C.1  sitemap.xml acessível em /sitemap.xml e lista 43+ URLs
☐ C.2  robots.txt acessível em /robots.txt e aponta para o sitemap
☐ C.3  manifest.webmanifest acessível e válido
☐ C.4  favicon /icon.svg acessível
☐ C.5  OG image (og.svg ou futuro og.png) acessível e referenciada em metadata
☐ C.6  <html lang="pt-BR"> presente
☐ C.7  canonical setado em todas as rotas
☐ C.8  JSON-LD válido (testar em https://search.google.com/test/rich-results)
☐ C.9  (Opcional) google-site-verification meta tag configurada
```

## ☐ D. AdSense

```
☐ D.1  Script AdSense carrega no build de produção (verificar no source)
☐ D.2  (Após aprovação) AdBanner com `slot` real em cada posição
☐ D.3  (Após aprovação) public/ads.txt presente com a linha do Google
☐ D.4  Consentimento de cookies respeitado (banner aparece antes de carregar anúncios, se gating implementado)
☐ D.5  3 posições de AdBanner preservadas por página de ferramenta
```

## ☐ E. Funcionalidade (smoke test)

```
☐ E.1  Home carrega, botões "Explorar" e "Ver calculadoras" funcionam
☐ E.2  /ferramentas carrega, busca e filtro por categoria funcionam
☐ E.3  1 ferramenta de cada categoria testada e funcional:
         - 1 calculadora (ex.: /calculadora-juros-compostos)
         - 1 conversor (ex.: /conversor-temperatura)
         - 1 gerador (ex.: /gerador-senhas)
         - 1 ferramenta de imagem (ex.: /compressor-imagem)
         - 1 ferramenta de produtividade (ex.: /cronometro-online)
☐ E.4  5 páginas de categoria carregam (/ferramentas/<categoria>)
☐ E.5  4 páginas institucionais carregam (/sobre, /privacidade, /termos, /cookies)
☐ E.6  Breadcrumb funciona em todas as páginas internas
☐ E.7  Toggle de tema funciona e persiste
☐ E.8  Banner de cookies aparece na primeira visita e é dispensável
```

## ☐ F. Responsividade

```
☐ F.1  Mobile (390px): header colapsa, sem scroll horizontal, grids reorganizam
☐ F.2  Tablet (768px): layout intermediário correto
☐ F.3  Desktop (1280px+): layout completo
☐ F.4  Ferramentas com tabelas (financiamento, cronômetro) fazem scroll interno
```

## ☐ G. Acessibilidade

```
☐ G.1  Navegação por teclado (Tab) cobre todos os interativos
☐ G.2  Foco visível em todos os focáveis
☐ G.3  aria-labels presentes em botões de ícone
☐ G.4  (Opcional) auditoria Lighthouse ≥ 90 em Acessibilidade
```

## ☐ H. Performance

```
☐ H.1  Páginas são estáticas (SSG) — confirmar no header de resposta ou no build
☐ H.2  Imagens otimizadas (SVG inline para logo; Canvas para ferramentas de imagem)
☐ H.3  Fontes Geist via next/font (já configurado)
☐ H.4  Sem bloqueio de render por scripts pesados (AdSense é afterInteractive)
☐ H.5  (Opcional) Lighthouse Performance ≥ 90 na home
```

## ☐ I. Segurança / privacidade

```
☐ I.1  Ferramentas de imagem processam 100% client-side (sem upload)
☐ I.2  Senhas/QR/hash gerados client-side (sem envio ao servidor)
☐ I.3  Política de Privacidade (/privacidade) acessível
☐ I.4  Política de Cookies (/cookies) acessível
☐ I.5  Termos de Uso (/termos) acessíveis
☐ I.6  Banner de consentimento funcional
☐ I.7  Sem dados pessoais coletados sem necessidade
```

## ☐ J. Pós-deploy

```
☐ J.1  Site acessível em https://toolium.com.br
☐ J.2  HTTPS ativo, sem mixed content
☐ J.3  /sitemap.xml acessível publicamente
☐ J.4  /robots.txt acessível publicamente
☐ J.5  Search Console configurado e sitemap enviado
☐ J.6  (Após aprovação) AdSense ativo e exibindo anúncios
☐ J.7  Monitoramento de erros (Sentry/vercel Analytics) configurado (opcional)
```

## ☐ K. Documentação

```
☐ K.1  docs/16-HISTORICO_DE_ALTERACOES.md atualizado com a versão do deploy
☐ K.2  docs/00-VISAO_DO_PROJETO.md reflete o estado atual
☐ K.3  docs/RELATORIO_ETAPA_NN.md (se aplicável) anexado
```

---

## Critério de pronto para produção

O deploy só deve prosseguir com **todas as seções A, B, C, E, F, I, J** marcadas (ou N/A justificado). As seções D (AdSense pós-aprovação), G/H (Lighthouse) e K (docs) podem ter itens opcionais, mas devem ser revisados.
