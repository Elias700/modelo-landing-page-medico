import { SiteService } from '../../core/config/site.service';
import { IconName } from '../../shared/components/icon/icon';

/*
 * Textos da landing page. Todo o conteúdo abaixo deve ser revisado e confirmado
 * pela Dra. Ana Sales antes da publicação (Resolução CFM nº 2.336/2023).
 */

export interface ServiceItem {
  readonly title: string;
  readonly description: string;
  readonly icon: IconName;
}

export interface ConsultationStep {
  readonly title: string;
  readonly description: string;
}

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export const HERO_CONTENT = {
  eyebrow: 'Dra. Ana Sales — Clínica Geral',
  title: 'Sua saúde merece um olhar atento e um cuidado especial.',
  emphasis: 'cuidado especial.',
  subtitle:
    'Atendimento clínico humanizado, com foco na prevenção, no bem-estar e no cuidado integral com a sua saúde.',
  pillars: ['Escuta atenta', 'Prevenção', 'Cuidado integral'],
} as const;

export const ABOUT_CONTENT = {
  eyebrow: 'Sobre mim',
  title: 'Muito prazer, sou a Dra. Ana Sales.',
  emphasis: 'Dra. Ana Sales.',
  subtitle: 'Um cuidado que começa pela escuta e respeita a individualidade de cada paciente.',
  body: 'Na clínica geral, cada consulta é uma oportunidade de compreender a saúde de forma ampla. A escuta atenta, a avaliação individualizada e a orientação médica fazem parte de um atendimento que valoriza cada pessoa.',
} as const;

/** Lista demonstrativa — confirmar com a médica quais serviços são oferecidos. */
export const SERVICES: readonly ServiceItem[] = [
  {
    title: 'Consulta de clínica geral',
    description: 'Avaliação de sintomas, histórico e necessidades clínicas.',
    icon: 'stethoscope',
  },
  {
    title: 'Avaliação geral de saúde',
    description: 'Avaliação individualizada do estado de saúde.',
    icon: 'clipboard',
  },
  {
    title: 'Medicina preventiva',
    description: 'Orientações e acompanhamento preventivo.',
    icon: 'shield',
  },
  {
    title: 'Acompanhamento de condições crônicas',
    description: 'Acompanhamento clínico de condições como hipertensão e diabetes.',
    icon: 'heart',
  },
  {
    title: 'Avaliação de exames',
    description: 'Interpretação de exames conforme o contexto clínico.',
    icon: 'chart',
  },
  {
    title: 'Orientações de saúde',
    description: 'Orientações individualizadas sobre hábitos e cuidados.',
    icon: 'leaf',
  },
];

export const PREVENTION_CONTENT = {
  eyebrow: 'Prevenção',
  title: 'Cuidar da saúde também é prevenir.',
  emphasis: 'prevenir.',
  body: 'O acompanhamento médico permite avaliar fatores de risco, orientar hábitos de saúde e identificar necessidades de investigação e cuidado de forma individualizada.',
  topics: [
    'Avaliação de fatores de risco',
    'Orientação de hábitos de saúde',
    'Investigação e cuidado individualizados',
  ],
} as const;

export const CONSULTATION_STEPS: readonly ConsultationStep[] = [
  {
    title: 'Acolhimento',
    description: 'Espaço para compartilhar sintomas, dúvidas e necessidades.',
  },
  {
    title: 'Avaliação clínica',
    description: 'Análise do histórico e avaliação individualizada.',
  },
  {
    title: 'Orientação médica',
    description: 'Discussão das condutas e orientações adequadas.',
  },
  {
    title: 'Acompanhamento',
    description: 'Continuidade do cuidado conforme necessidade.',
  },
];

/** Respostas montadas a partir de SITE_CONFIG: nada é afirmado sem estar configurado. */
export function buildFaq(site: SiteService): FaqItem[] {
  const { clinic } = site.config;
  const listFormatter = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' });

  const scheduling = site.hasContactChannel
    ? 'O agendamento pode ser feito pelos canais informados na seção Contato desta página.'
    : 'As formas de agendamento estão reunidas na seção Contato desta página.';

  const insurance = clinic.insurancePlans.length
    ? `Atualmente são aceitos: ${listFormatter.format(clinic.insurancePlans)}. Confirme a cobertura do seu plano no momento do agendamento.`
    : 'As informações sobre convênios e formas de pagamento são confirmadas no momento do agendamento.';

  const online = clinic.modalities.length
    ? `As modalidades de atendimento disponíveis são: ${listFormatter.format(clinic.modalities.map((m) => m.toLowerCase()))}.`
    : 'As modalidades de atendimento disponíveis são informadas no momento do agendamento.';

  const location = site.addressLines.length
    ? `O consultório fica em ${site.addressLines.join(', ')}.`
    : 'O endereço completo é informado no momento do agendamento.';

  const hours = clinic.openingHours.length
    ? `Os atendimentos acontecem ${listFormatter.format(clinic.openingHours.map((h) => `${h.days.toLowerCase()}, ${h.hours}`))}.`
    : 'Os horários disponíveis são informados no momento do agendamento.';

  return [
    { question: 'Como agendar uma consulta?', answer: scheduling },
    {
      question: 'Como funciona a primeira consulta?',
      answer:
        'A primeira consulta é um momento para conversar sobre sintomas, histórico de saúde, hábitos e dúvidas. A partir dessa escuta e da avaliação clínica, são discutidas as orientações e os próximos passos adequados a cada caso.',
    },
    { question: 'A médica atende por convênio?', answer: insurance },
    { question: 'Existe atendimento online?', answer: online },
    { question: 'Onde fica o consultório?', answer: location },
    { question: 'Quais são os horários?', answer: hours },
    {
      question: 'Posso levar exames anteriores?',
      answer:
        'Sim. Exames, receitas e relatórios anteriores ajudam a compreender o seu histórico de saúde. Se tiver, leve-os à consulta.',
    },
    {
      question: 'Como funciona o acompanhamento?',
      answer:
        'A necessidade e a frequência de retornos são definidas de forma individualizada, conforme a avaliação clínica de cada paciente.',
    },
  ];
}
