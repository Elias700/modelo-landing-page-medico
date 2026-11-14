import { Injectable, isDevMode } from '@angular/core';
import { SITE_CONFIG, SiteConfig } from './site.config';

export interface NavItem {
  readonly id: string;
  readonly label: string;
}

/** Dados derivados de SITE_CONFIG prontos para a interface. Retorna `null` quando algo não foi configurado. */
@Injectable({ providedIn: 'root' })
export class SiteService {
  readonly config: SiteConfig = SITE_CONFIG;

  /** Em desenvolvimento, exibe marcadores "a confirmar" onde faltam dados. Em produção, o campo some. */
  readonly showPending = isDevMode();

  readonly navItems: readonly NavItem[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre mim' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'prevencao', label: 'Prevenção' },
    { id: 'como-funciona', label: 'Como funciona' },
    { id: 'perguntas-frequentes', label: 'Perguntas frequentes' },
    { id: 'contato', label: 'Contato' },
  ];

  readonly whatsappUrl: string | null = this.buildWhatsappUrl();
  readonly phoneHref: string | null = this.buildPhoneHref();
  readonly registryLabel: string | null = this.buildRegistryLabel();
  readonly rqeLabel: string | null = this.config.doctor.registry.rqe
    ? `RQE ${this.config.doctor.registry.rqe}`
    : null;
  readonly addressLines: readonly string[] = this.buildAddressLines();
  readonly hasClinicInfo: boolean =
    this.addressLines.length > 0 ||
    this.config.clinic.openingHours.length > 0 ||
    this.config.clinic.modalities.length > 0 ||
    this.config.clinic.mapsUrl !== null;
  readonly hasContactChannel: boolean = this.whatsappUrl !== null || this.phoneHref !== null;

  /** Destino do CTA principal: WhatsApp quando configurado; caso contrário, a seção de contato. */
  readonly primaryCtaHref: string = this.whatsappUrl ?? '#contato';
  readonly primaryCtaIsExternal: boolean = this.whatsappUrl !== null;

  private buildWhatsappUrl(): string | null {
    const digits = this.config.contact.whatsapp?.replace(/\D/g, '');
    if (!digits || digits.length < 12) return null;
    return `https://wa.me/${digits}?text=${encodeURIComponent(this.config.contact.whatsappMessage)}`;
  }

  private buildPhoneHref(): string | null {
    const digits = this.config.contact.phone?.replace(/\D/g, '');
    return digits ? `tel:+55${digits.replace(/^55/, '')}` : null;
  }

  private buildRegistryLabel(): string | null {
    const { crm, crmState } = this.config.doctor.registry;
    return crm && crmState ? `CRM/${crmState} ${crm}` : null;
  }

  private buildAddressLines(): string[] {
    const { street, district, city, state, zipCode } = this.config.clinic;
    const cityLine = [city, state].filter(Boolean).join(' — ');
    return [street, district, cityLine, zipCode ? `CEP ${zipCode}` : null].filter(
      (line): line is string => !!line,
    );
  }
}
