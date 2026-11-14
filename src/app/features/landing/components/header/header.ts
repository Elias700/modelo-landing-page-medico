import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { SiteService } from '../../../../core/config/site.service';
import { Button } from '../../../../shared/components/button/button';

const MENU_LOCK_CLASS = 'menu-open';

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '[class.is-hidden]': 'hidden() && !menuOpen()',
    '[class.is-open]': 'menuOpen()',
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
export class Header {
  protected readonly site = inject(SiteService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly hidden = signal(false);
  protected readonly activeId = signal('inicio');

  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggle');
  private readonly menuPanel = viewChild.required<ElementRef<HTMLElement>>('panel');

  constructor() {
    afterNextRender(() => {
      this.watchScroll();
      this.watchSections();
    });
    this.destroyRef.onDestroy(() => document.documentElement.classList.remove(MENU_LOCK_CLASS));
  }

  protected toggleMenu(): void {
    if (this.menuOpen()) {
      this.closeMenu(true);
      return;
    }
    this.menuOpen.set(true);
    document.documentElement.classList.add(MENU_LOCK_CLASS);
    // Foco no primeiro link após o painel ficar visível.
    requestAnimationFrame(() => this.menuPanel().nativeElement.querySelector('a')?.focus());
  }

  /** Remove o bloqueio de rolagem de forma síncrona para que o clique na âncora role a página. */
  protected closeMenu(returnFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    document.documentElement.classList.remove(MENU_LOCK_CLASS);
    if (returnFocus) this.toggleButton().nativeElement.focus();
  }

  /** Mantém o Tab dentro do menu aberto (botão de fechar + links). */
  protected trapFocus(event: KeyboardEvent): void {
    if (!this.menuOpen() || event.key !== 'Tab') return;
    const focusable = [
      this.toggleButton().nativeElement,
      ...this.menuPanel().nativeElement.querySelectorAll<HTMLElement>('a[href]'),
    ];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private watchScroll(): void {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      this.scrolled.set(y > 24);
      if (Math.abs(y - lastY) > 6) {
        this.hidden.set(y > lastY && y > window.innerHeight * 0.6);
        lastY = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }

  private watchSections(): void {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) this.activeId.set(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const item of this.site.navItems) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
