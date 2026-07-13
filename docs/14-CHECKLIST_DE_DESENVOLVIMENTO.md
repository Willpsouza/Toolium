# 14 — Checklist de Desenvolvimento

> Checklist **oficial** a ser executado antes de declarar qualquer tarefa concluída.
> Originado do `TOOLIUM_PROTOCOL.md` (seção 8). Em caso de conflito, o Protocolo prevalece.

## Como usar

Após implementar uma alteração, percorra **todos** os itens abaixo. Um item não marcado impede o encerramento da tarefa.

## ☐ 1. Validação automática

```
☐ 1.1  `bun run lint` finaliza sem erros e sem warnings
☐ 1.2  `bunx tsc --noEmit` não reporta erros em `src/` (grep "^src/" vazio)
☐ 1.3  Dev server (porta 3000) responde 200 nas rotas afetadas (`tail dev.log`)
☐ 1.4  (Quando aplicável) `bun run build` / build de produção executa sem erros
```

> **Nota de ambiente**: o build de produção pode estar restrito durante a iteração. Nesse caso, 1.1 + 1.2 + 1.3 são a validação mínima obrigatória. Documente no relatório da etapa se o build real não foi executado.

## ☐ 2. Código

```
☐ 2.1  Não foram introduzidos imports mortos
☐ 2.2  Não foram introduzidos componentes duplicados
☐ 2.3  Não foi criado código duplicado (se padrão repetido em 3+, documentou em docs/09)
☐ 2.4  Nenhum `any` explícito sem justificativa
☐ 2.5  Nenhum `console.log` em código de produção
☐ 2.6  Tipos explícitos em assinaturas públicas
☐ 2.7  Sem URLs absolutas para localhost/porta em fetch/links
```

## ☐ 3. Rotas

```
☐ 3.1  Nenhuma rota existente foi quebrada
☐ 3.2  Rotas dinâmicas mantêm `generateStaticParams` + `dynamicParams = false`
☐ 3.3  Slugs de ferramentas não foram renomeados (ou há redirect documentado)
☐ 3.4  Novas rotas (se houver) foram adicionadas a `sitemap.ts`
☐ 3.5  Novas rotas têm link de acesso (header/footer/home)
```

## ☐ 4. Componentes

```
☐ 4.1  Nenhum componente funcional foi removido sem justificativa
☐ 4.2  Novos componentes seguem o padrão de docs/11
☐ 4.3  Componentes de ferramenta: "use client" + default export + registro em registry.tsx
☐ 4.4  shadcn/ui não foi modificado em estilo (apenas props/classes no uso)
```

## ☐ 5. Funcionalidade

```
☐ 5.1  A funcionalidade alterada funciona como esperado (teste manual / Agent Browser)
☐ 5.2  Entradas inválidas não produzem NaN/crash (mostram "—" ou mensagem)
☐ 5.3  Estado persistente (localStorage) é lido com guarda de hidratação
☐ 5.4  Efeitos com interval/listener retornam cleanup
```

## ☐ 6. Responsividade

```
☐ 6.1  Layout funciona em 360px de largura (sem scroll horizontal)
☐ 6.2  Layout funciona em 768px e 1280px
☐ 6.3  Grids reorganizam corretamente em breakpoints
☐ 6.4  Header colapsa para Sheet no mobile
```

## ☐ 7. SEO

```
☐ 7.1  metadata preservada/adicionada em todas as rotas afetadas
☐ 7.2  buildMetadata() usado com path correto (canonical)
☐ 7.3  JSON-LD preservado (Breadcrumb/FAQ/HowTo) nas páginas de ferramenta
☐ 7.4  sitemap.ts atualizado se rotas foram adicionadas/removidas
☐ 7.5  Conteúdo editorial de tools.ts não foi removido
```

## ☐ 8. Acessibilidade

```
☐ 8.1  `<html lang="pt-BR">` mantido
☐ 8.2  Botões de ícone com aria-label
☐ 8.3  Inputs com <Label htmlFor>
☐ 8.4  Navegação por teclado funciona (Tab/Enter/Esc)
☐ 8.5  Semântica HTML mantida (header/main/footer/nav/section)
```

## ☐ 9. Tema (claro/escuro)

```
☐ 9.1  Toggle alterna a classe `dark` no <html>
☐ 9.2  Preferência persiste entre recargas (next-themes)
☐ 9.3  Sem cores hardcoded que não adaptam ao tema
☐ 9.4  Contraste de texto mantido nos dois temas
```

## ☐ 10. AdSense

```
☐ 10.1 Script AdSense permanece no layout.tsx
☐ 10.2 As 3 posições de <AdBanner /> em tool-page.tsx estão preservadas
☐ 10.3 Componente AdBanner não foi quebrado
☐ 10.4 (Se slot alterado) slots válidos do painel AdSense
```

## ☐ 11. Documentação

```
☐ 11.1 docs afetadas foram atualizadas
☐ 11.2 docs/16-HISTORICO_DE_ALTERACOES.md recebeu entrada
☐ 11.3 docs/RELATORIO_ETAPA_NN.md foi produzido
☐ 11.4 TOOLIUM_PROTOCOL.md / AI_RULES.md não foram contraditos
```

## ☐ 12. Encerramento

```
☐ 12.1 Todos os itens acima marcados (ou justificativa para os não aplicáveis)
☐ 12.2 Nenhuma regressão conhecida deixada para trás
☐ 12.3 Não foi avançado para a próxima etapa no mesmo fluxo
```

---

## Resultado do checklist

- **Todos marcados** → tarefa concluída, pode encerrar a etapa.
- **Item não aplicável** → marcar como N/A com justificativa no relatório.
- **Item falha** → **não encerrar**; corrigir ou documentar como item adiado com justificativa e prioridade.
