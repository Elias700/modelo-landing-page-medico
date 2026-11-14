import { DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export type RevealTrigger = 'scroll' | 'load';

export interface MotionScope {
  readonly el: HTMLElement;
  readonly gsap: typeof gsap;
  readonly isCompact: boolean;
}

/** Função de configuração. Pode retornar uma função de limpeza (listeners etc.). */
export type MotionSetup = (scope: MotionScope) => void | (() => void);

export const MOTION_EASE = 'expo.out';
const COMPACT_QUERY = '(max-width: 899px)';
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

let pluginsRegistered = false;

function registerPlugins(): void {
  if (pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: MOTION_EASE });
  // Evita recalcular tudo quando a barra de endereço do celular aparece/some durante a rolagem.
  ScrollTrigger.config({ ignoreMobileResize: true });
  pluginsRegistered = true;

  // Recalcula posições quando as fontes web terminam de carregar (evita gatilhos deslocados).
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // Se o usuário ativar "reduzir movimento" com a página aberta, finaliza tudo e mostra o conteúdo.
  window.matchMedia(REDUCED_QUERY).addEventListener('change', (event) => {
    if (!event.matches) return;
    document.documentElement.classList.remove('motion');
    gsap.globalTimeline.progress(1);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
  });
}

/** Animações só rodam quando o <html> tem a classe `.motion` (definida no index.html). */
export function isMotionEnabled(): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    document.documentElement.classList.contains('motion')
  );
}

export function scrollTriggerFor(
  trigger: Element,
  mode: RevealTrigger,
  start = 'top 85%',
): ScrollTrigger.Vars | undefined {
  return mode === 'scroll' ? { trigger, start, once: true } : undefined;
}

/**
 * Executa `setup` após a primeira renderização, dentro de um `gsap.context` com escopo
 * no elemento hospedeiro. Tweens, ScrollTriggers e SplitTexts criados ali são revertidos
 * automaticamente quando o componente/diretiva é destruído.
 *
 * Deve ser chamada em contexto de injeção (construtor ou inicializador de campo).
 */
export function useMotion(setup: MotionSetup): void {
  const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  const destroyRef = inject(DestroyRef);
  let context: gsap.Context | undefined;

  afterNextRender(() => {
    if (!isMotionEnabled()) return;
    registerPlugins();
    const isCompact = window.matchMedia(COMPACT_QUERY).matches;
    context = gsap.context(() => setup({ el, gsap, isCompact }), el);
  });

  destroyRef.onDestroy(() => context?.revert());
}
