import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { SiteService } from './core/config/site.service';

async function renderLanding(): Promise<HTMLElement> {
  const harness = await RouterTestingHarness.create('/');
  return harness.routeNativeElement as HTMLElement;
}

describe('Landing page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  it('renders exactly one h1 with the hero title', async () => {
    const page = await renderLanding();
    const headings = page.querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent).toContain('Sua saúde merece um olhar atento');
  });

  it('has every navigation target section', async () => {
    const page = await renderLanding();
    for (const item of TestBed.inject(SiteService).navItems) {
      expect(page.querySelector(`#${item.id}`), item.id).not.toBeNull();
    }
  });

  it('does not render WhatsApp or phone links while they are not configured', async () => {
    const page = await renderLanding();
    expect(page.querySelector('a[href*="wa.me"]')).toBeNull();
    expect(page.querySelector('a[href^="tel:"]')).toBeNull();
  });

  it('toggles FAQ items with correct aria-expanded state', async () => {
    const page = await renderLanding();
    const triggers = page.querySelectorAll<HTMLButtonElement>('.trigger');
    expect(triggers.length).toBe(8);
    expect(triggers[0].getAttribute('aria-expanded')).toBe('true');

    triggers[1].click();
    TestBed.tick();

    expect(triggers[0].getAttribute('aria-expanded')).toBe('false');
    expect(triggers[1].getAttribute('aria-expanded')).toBe('true');
  });
});

describe('SiteService', () => {
  it('does not expose contact links that are not configured', () => {
    const site = TestBed.inject(SiteService);
    expect(site.whatsappUrl).toBeNull();
    expect(site.phoneHref).toBeNull();
    expect(site.registryLabel).toBeNull();
    expect(site.primaryCtaHref).toBe('#contato');
  });
});
