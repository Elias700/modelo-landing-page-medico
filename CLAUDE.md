# CLAUDE.md — Landing page Dra. Ana Sales (Clínica Geral)

Landing page institucional premium, de página única, para a Dra. Ana Sales (Clínica Geral). Projeto de portfólio da ER Web.

## Stack confirmada

- Angular **21.2** (CLI 21.2), builder `@angular/build:application` (esbuild), TypeScript 5.9.
- Standalone components, zoneless por padrão no Angular 21, Signals.
- Testes: Vitest (`ng test`). Formatação: Prettier (`.prettierrc`).
- Animações: **GSAP 3.15.0 (versão fixa) + ScrollTrigger + SplitText** — única dependência de runtime adicionada. Sem Lenis/smooth-scroll JS: rolagem nativa + `scroll-behavior: smooth`.
- Deploy alvo: Vercel — `vercel.json` (saída `dist/medica-claude/browser`, cache de assets com hash, cabeçalhos de segurança). As fotos originais `public/*.jpeg` são ignoradas no build (`angular.json` → `assets.ignore`).

Comandos: `npm start` (dev), `npm run build` (produção), `npm test`.

## Estrutura de pastas

```text
src/
├── app/
│   ├── core/config/          # site.config.ts — TODOS os dados editáveis da médica (fonte única)
│   │                         # site.service.ts — dados derivados (links WhatsApp/tel, CRM) ou null
│   ├── shared/
│   │   ├── components/       # button (a[appButton]), section-heading, media-frame
│   │   ├── directives/       # appReveal, appSplitText, appImageReveal, appParallax, appTilt
│   │   └── animations/       # motion.ts — useMotion(): registro GSAP, gsap.context, cleanup
│   ├── features/landing/
│   │   ├── components/       # header, hero, about, services, prevention,
│   │   │                     # consultation, clinic, faq, contact, footer
│   │   └── landing-page.ts
│   ├── modelo-landing-page/  # REFERÊNCIA (VibeCloner/Vero Studio) — NÃO editar, NÃO excluir, NÃO importar
│   ├── app.config.ts · app.routes.ts · app.ts
├── videos/                   # GIFs originais — preservar
├── styles.css                # tokens + base global
public/
├── images/                   # cópias renomeadas das fotos (originais preservados na raiz de public/)
├── media/                    # cópias renomeadas dos GIFs
```

Nomes de arquivo seguem o guia do Angular 21 (sem sufixo `.component`): `button.ts`, `button.html`, `button.css`.

## Arquitetura

- Somente standalone components, `ChangeDetectionStrategy.OnPush`, `inject()` em vez de construtor.
- Inputs/outputs com `input()`, `output()`, estado local com `signal()`/`computed()`.
- Control flow nativo (`@if`, `@for`, `@defer`). `@defer (on viewport)` para seções abaixo da dobra quando fizer sentido.
- Separação dados × apresentação: componentes leem de `core/config/site.config.ts`; nenhum texto profissional hardcoded fora dele (exceto copy de interface).
- Animações sempre via diretivas ou `useMotion()` (`shared/animations/motion.ts`); nunca chamar GSAP fora dele.
- `useMotion()` roda em `afterNextRender`, dentro de `gsap.context` com escopo no host, e reverte tudo no `DestroyRef`. Listeners devem ser removidos na função de limpeza retornada pelo setup.
- Animações só rodam se `<html>` tiver a classe `.motion` (script inline no `index.html`, ausente com reduced-motion). Estados iniciais ocultos ficam no CSS global (`[data-reveal]`, `[data-split]`, `[data-image-reveal]`), para não haver flash de conteúdo.

## Padrões de código

- Nomes descritivos em inglês no código; conteúdo público em **português brasileiro**.
- Sem `any` sem justificativa. Sem comentários óbvios. Sem duplicação.
- Não adicionar dependências sem necessidade e sem verificar `package.json`.
- Não modificar arquivos fora do escopo da tarefa.

## CSS e design

- Mobile-first; breakpoints: 600px, 900px (layouts em colunas), 1200px (menu horizontal do header), 1440px.
- Tokens em `:root` (`styles.css`):
  - `--color-ivory #F7F5F0` · `--color-sage #D9E5DF` · `--color-green #35584D`
  - `--color-green-deep #20342F` · `--color-champagne #C6A77D` · `--color-white #FFFFFF`
- Tipografia: títulos **Playfair Display** (serif editorial), texto **Manrope**. Não usar Cormorant/Cormorant Garamond: as versões atuais posicionam errado os acentos (á, ú, ê) no Chromium — testado em 2026-11-13. Auto-hospedadas em `public/fonts/` (woff2, subset latin, `@font-face` em `styles.css`, preload no `index.html`) — sem requisições ao Google (LGPD/performance).
- Tipografia e espaçamentos fluidos com `clamp()`. Escala de espaço por tokens `--space-*`.
- Raio de borda mínimo (2–4px), sem sombras pesadas, sem cards genéricos.
- Componentes estilizados no próprio `.css` do componente; o budget `anyComponentStyle` foi ajustado no `angular.json` (justificativa: seções editoriais com layout + responsivo).

## Animações (inspiradas na referência, implementação própria)

| Efeito        | Técnica                                                                        |
| ------------- | ------------------------------------------------------------------------------ |
| Text reveal   | SplitText em linhas/palavras, máscara `overflow: hidden`, `yPercent` + stagger |
| Scroll reveal | ScrollTrigger `start: 'top 85%'`, `once: true`                                 |
| Image reveal  | `clip-path: inset()` + leve `scale` na imagem interna                          |
| Parallax      | `yPercent` com `scrub`, faixa pequena (≤ 15%)                                  |
| Hover         | CSS: underline animado, texto do botão rolando (duplicado), tilt 3D sutil      |

Regras: só `transform`/`opacity`/`clip-path`; sem scroll hijacking/pin longo; `prefers-reduced-motion: reduce` desliga tudo (conteúdo visível sem JS); reduzir parallax no mobile; nunca esconder conteúdo de leitores de tela (SplitText com `aria` preservado).

## Performance (medido em 2026-11-13, build de produção)

- LCP desktop ≈ 0,7s; mobile (CPU 4×) ≈ 1,5s; CLS ≈ 0. Bundle inicial ≈ 121 kB transferidos.
- A imagem LCP do hero não usa máscara em telas < 900px (`[revealOnCompact]="false"`). Não adicionar atrasos longos de animação a elementos acima da dobra.

## Mídia

- Fotos: `<img>` com `width`/`height` explícitos (evitar CLS), `loading="lazy"` exceto a do hero (`fetchpriority="high"`), `alt` descritivo.
- Os "vídeos" disponíveis são **GIFs pequenos (~355–507px)**. Usar só em molduras pequenas; `<picture>` com `<source media="(prefers-reduced-motion: reduce)">` apontando para foto estática. Se forem convertidos para MP4/WebM: `muted autoplay loop playsinline preload="metadata"` + `poster`.
- Não apresentar fotos de estúdio como se fossem do consultório.

## Dados pendentes

- Campos não configurados em `site.config.ts` mostram `<app-pending>` ("… — a confirmar") **somente em `ng serve`** (`isDevMode()`); no build de produção somem.
- A seção Consultório só aparece em produção quando houver fotos reais ou informações do consultório.

## Acessibilidade

- HTML semântico, **um único `h1`** (hero), hierarquia h2/h3 correta.
- Foco visível (`:focus-visible`), skip link, navegação completa por teclado.
- Menu mobile: `aria-expanded`, `aria-controls`, fecha com `Esc`, foco gerenciado.
- Accordion: `<button aria-expanded aria-controls>` + região `role="region"`.
- Contraste AA mínimo (atenção a champagne sobre marfim — usar só decorativo ou em texto grande).

## Regras de conteúdo (Resolução CFM nº 2.336/2023)

- Todo conteúdo público em pt-BR.
- **Não inventar** informações médicas ou profissionais: formação, instituição, CRM/UF, RQE, endereço, telefone, WhatsApp, horários, convênios ficam como `null` em `site.config.ts` e a UI **oculta** o que não estiver preenchido (sem links quebrados, sem botões falsos).
- Apresentar como "Clínica Geral" — nunca "especialista em Clínica Médica" sem RQE confirmado.
- Proibido: promessas de cura, garantias de resultado, depoimentos fictícios, antes/depois, superlativos/superioridade, dados estruturados (JSON-LD) inventados.
- Conteúdo deve passar por revisão profissional antes da publicação.

## Regras de trabalho

- Preservar `src/app/modelo-landing-page/`, `src/videos/` e as imagens originais de `public/`.
- Não criar novo projeto Angular (`ng new`). Não alterar configs sem justificativa.
- Não executar comandos destrutivos, não commitar e não fazer deploy sem autorização.
- Antes de concluir qualquer etapa: `npm run build` sem erros; relatar arquivos criados/modificados, funcionalidades, animações, testes e pendências.
