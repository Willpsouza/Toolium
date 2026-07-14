# 05 — Rotas

> Documento de auditoria. Mapeia todas as rotas expostas pela app.

## Rotas do produto (App Router)

### Rota principal
| URL | Arquivo | Tipo |
|---|---|---|
| `/` | `src/app/page.tsx` | Server Component estático (landing page) |

### Ferramentas (rota dinâmica)
| URL | Arquivo | Tipo |
|---|---|---|
| `/<slug>` | `src/app/[slug]/page.tsx` | Dinâmica, SSG com `generateStaticParams` + `dynamicParams = false` |

Gera **32 rotas estáticas**, uma por ferramenta. Slugs (todos válidos e com componente registrado em `registry.tsx`):

**Calculadoras**: `calculadora-porcentagem`, `calculadora-juros-compostos`, `calculadora-juros-simples`, `calculadora-financiamento`, `calculadora-desconto`, `calculadora-regra-tres`, `calculadora-salario-liquido`, `calculadora-idade`, `diferenca-entre-datas`, `calculadora-imc`

**Conversores**: `conversor-temperatura`, `conversor-comprimento`, `conversor-peso`, `conversor-volume`, `conversor-area`, `conversor-velocidade`, `conversor-moedas`, `conversor-tempo`

**Geradores**: `gerador-senhas`, `gerador-qrcode`, `gerador-lorem-ipsum`, `gerador-nomes`, `gerador-hash`, `gerador-cores`

**Imagem**: `compressor-imagem`, `conversor-jpg-png`, `conversor-png-webp`, `redimensionador-imagem`

**Produtividade**: `cronometro-online`, `contador-palavras`, `conversor-fuso-horario`, `checklist-online`

### Categorias
| URL | Arquivo | Tipo |
|---|---|---|
| `/ferramentas` | `src/app/ferramentas/page.tsx` | Estático (lista + busca client-side) |
| `/ferramentas/<categoria>` | `src/app/ferramentas/[categoria]/page.tsx` | Dinâmica SSG, 5 categorias: `calculadoras`, `conversores`, `geradores`, `imagens`, `produtividade` |

### Institucionais
| URL | Arquivo |
|---|---|
| `/sobre` | `src/app/sobre/page.tsx` |
| `/privacidade` | `src/app/privacidade/page.tsx` |
| `/termos` | `src/app/termos/page.tsx` |
| `/cookies` | `src/app/cookies/page.tsx` |

### Metadata routes (Next.js nativo)
| URL | Arquivo |
|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` |
| `/robots.txt` | `src/app/robots.ts` |
| `/manifest.webmanifest` | `src/app/manifest.ts` |
| `/icon.svg` (favicon) | `src/app/icon.svg` (convenção App Router) |

### API
| URL | Arquivo | Estado |
|---|---|---|
| `/api` | `src/app/api/route.ts` | ⚠️ **Órfão** — retorna `{ message: "Hello, world!" }`. Não usado pelo produto. |

## Layout raiz

`src/app/layout.tsx` envolve todas as rotas com:
- `ThemeProvider` (next-themes)
- `SiteHeader` (cabeçalho fixo)
- `main` (conteúdo)
- `SiteFooter` (rodapé fixo ao fundo)
- `CookieConsent` (banner)
- `Toaster` (shadcn)
- Script Google AdSense (`next/script`, `afterInteractive`)
- JSON-LD global (WebSite + Organization)

## Resumo de contagem

| Tipo | Quantidade |
|---|---|
| Rotas de produto (face ao usuário) | 1 (home) + 32 (ferramentas) + 1 (ferramentas) + 5 (categorias) + 4 (institucionais) = **43** |
| Rotas de metadata | 4 (sitemap, robots, manifest, icon) |
| Rotas de API | 1 (órfã) |
| **Total de rotas** | **48** |

## Rotas quebradas?

**Nenhuma rota quebrada encontrada.** Verificado:
- Todos os 32 slugs do `tools.ts` têm componente correspondente no `registry.tsx` (import direto);
- As 5 categorias em `categories.ts` batem com `generateStaticParams` da rota de categoria;
- `dynamicParams = false` em ambas as rotas dinâmicas → slugs/categorias inválidas retornam 404 (comportamento correto);
- Links internos no header/footer/home usam os mesmos slugs;
- Dev server responde 200 em todas as rotas testadas (ver `RELATORIO_DA_AUDITORIA.md`).

## Link interno cruzado

- Header → dropdown "Ferramentas" lista as 5 categorias + "Ver todas";
- Home → cards de categoria (5) + "Ver todas" + 7 ferramentas populares + CTA;
- Página de ferramenta → breadcrumb com links para home/ferramentas/categoria;
- Página de categoria → seção "Outras categorias" linka as 4 restantes;
- Footer → categorias, populares, institucionais.

Todos os links usam `<Link href="...">` do `next/link` com caminhos relativos. **Sem links absolutos para localhost ou portas.**
