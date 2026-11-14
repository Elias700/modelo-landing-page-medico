/**
 * Fonte única dos dados editáveis do site.
 *
 * Campos com `null` ainda não foram confirmados pela médica e ficam OCULTOS na
 * interface. Não preencha com valores fictícios (Resolução CFM nº 2.336/2023).
 */

export interface ProfessionalRegistry {
  /** Número do CRM, ex.: '123456'. */
  readonly crm: string | null;
  /** UF do CRM, ex.: 'SP'. */
  readonly crmState: string | null;
  /** Registro de Qualificação de Especialista — somente se aplicável. */
  readonly rqe: string | null;
}

export interface Education {
  readonly course: string;
  readonly institution: string;
  readonly year: string | null;
}

export interface DoctorProfile {
  readonly name: string;
  readonly practiceArea: string;
  readonly registry: ProfessionalRegistry;
  readonly education: readonly Education[];
  readonly career: string | null;
  readonly experience: string | null;
  readonly philosophy: string | null;
}

export interface OpeningHours {
  readonly days: string;
  readonly hours: string;
}

export interface ClinicInfo {
  readonly street: string | null;
  readonly district: string | null;
  readonly city: string | null;
  readonly state: string | null;
  readonly zipCode: string | null;
  /** Link do Google Maps (ou equivalente) para "Como chegar". */
  readonly mapsUrl: string | null;
  readonly openingHours: readonly OpeningHours[];
  /** Ex.: 'Presencial', 'Teleconsulta'. */
  readonly modalities: readonly string[];
  /** Ex.: lista de convênios aceitos. Vazio = não informado. */
  readonly insurancePlans: readonly string[];
  readonly photos: readonly ClinicPhoto[];
}

export interface ClinicPhoto {
  /** Caminho em /public, ex.: '/images/consultorio/recepcao.jpg'. Somente fotos REAIS do consultório. */
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface ContactInfo {
  /** Somente dígitos com DDI + DDD, ex.: '5511999999999'. */
  readonly whatsapp: string | null;
  readonly whatsappMessage: string;
  /** Formato de exibição, ex.: '(11) 3333-3333'. */
  readonly phone: string | null;
  readonly email: string | null;
  readonly instagram: string | null;
}

export interface SiteConfig {
  readonly siteUrl: string | null;
  readonly doctor: DoctorProfile;
  readonly clinic: ClinicInfo;
  readonly contact: ContactInfo;
  readonly privacyPolicyUrl: string | null;
  readonly credit: { readonly label: string; readonly url: string | null };
}

export const SITE_CONFIG: SiteConfig = {
  siteUrl: null,
  doctor: {
    name: 'Dra. Ana Sales',
    practiceArea: 'Clínica Geral',
    registry: {
      crm: null,
      crmState: null,
      rqe: null,
    },
    education: [],
    career: null,
    experience: null,
    philosophy: null,
  },
  clinic: {
    street: null,
    district: null,
    city: null,
    state: null,
    zipCode: null,
    mapsUrl: null,
    openingHours: [],
    modalities: [],
    insurancePlans: [],
    photos: [],
  },
  contact: {
    whatsapp: null,
    whatsappMessage: 'Olá! Gostaria de obter informações sobre as consultas com a Dra. Ana Sales.',
    phone: null,
    email: null,
    instagram: null,
  },
  privacyPolicyUrl: null,
  credit: {
    label: 'ER Web',
    url: null,
  },
};
