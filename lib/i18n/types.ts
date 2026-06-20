export type Locale = "en" | "es";

export interface NavItem {
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

export interface DeviceOption {
  key: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Dictionary {
  language: {
    switchLabel: string;
    english: string;
    spanish: string;
  };
  nav: {
    brand: string;
    items: NavItem[];
    menuItems: NavItem[];
    getFreeQuote: string;
  };
  home: {
    floatingBadges: {
      laptop: { label: string; title: string };
      smartphoneTablet: { label: string; title: string };
      sameDay: { label: string; title: string };
      original: { label: string; title: string };
      certified: { label: string; title: string };
      warranty: { label: string; title: string };
    };
    hero: {
      titleIndependent: string;
      titleHighlight: string;
      titleDevices: string;
      subtitle: string;
      requestQuote: string;
      requestCallback: string;
      yearsExperience: string;
      devicesServiced: string;
      sameDayService: string;
      imageAlt: string;
    };
    serviceQuote: {
      eyebrow: string;
      title: string;
      heading: string;
      onSiteTitle: string;
      onSiteDescription: string;
      inStoreTitle: string;
      inStoreDescription: string;
      popularBadge: string;
      bookNow: string;
      stepLabels: [string, string, string, string];
      nextBtn: string;
      backBtn: string;
      changeService: string;
      locationLabel: string;
      fillFields: string;
      successTitle: string;
      successBody: string;
      validation: {
        nameRequired: string;
        nameInvalid: string;
        phoneRequired: string;
        phoneInvalid: string;
        emailRequired: string;
        emailInvalid: string;
        deviceRequired: string;
        serviceRequired: string;
        streetRequired: string;
        cityRequired: string;
        cityInvalid: string;
        zipRequired: string;
        zipInvalid: string;
        dateRequired: string;
        timeRequired: string;
        issueRequired: string;
        issueMin: string;
      };
    };
    about: {
      eyebrow: string;
      heading: string;
      body: string;
      experienceTitle: string;
      experienceBody: string;
      technicianTitle: string;
      technicianBody: string;
      statValue: string;
      statLabel: string;
    };
    services: {
      eyebrow: string;
      heading: string;
      subtitle: string;
      waterDamage: { title: string; description: string };
      motherboard: { title: string; description: string };
      storage: { title: string; description: string };
      dataRecovery: { title: string; description: string };
    };
    stats: {
      eyebrow: string;
      heading: string;
      body: string;
      devicesServiced: string;
      happyCustomers: string;
      yearsExperience: string;
      warranty: string;
    };
    process: {
      heading: string;
      subtitle: string;
      steps: ProcessStep[];
    };
    testimonials: {
      heading: string;
      subtitle: string;
      items: TestimonialItem[];
    };
    faq: {
      eyebrow: string;
      heading: string;
      subtitle: string;
      items: FaqItem[];
    };
    contact: {
      badge: string;
      heading: string;
      body: string;
      requestCallbackDesktop: string;
      requestCallbackMobile: string;
      whatsapp: string;
    };
    footer: {
      tagline: string;
      taglineLine2: string;
      contactHours: string;
      address: string;
      monFri: string;
      monFriHours: string;
      saturday: string;
      saturdayHours: string;
      sunday: string;
      sundayHours: string;
      quickLinks: string;
      repairServices: string;
      pricing: string;
      faqs: string;
      reviews: string;
      legal: string;
      privacyPolicy: string;
      termsConditions: string;
      contactUs: string;
      mapTitle: string;
      disclaimer: string;
      copyright: string;
    };
    stickyCta: {
      requestQuote: string;
      requestCallback: string;
    };
    form: {
      devices: DeviceOption[];
      modal: {
        titleDefault: string;
        titleSuccess: string;
        subtitleDefault: string;
        subtitleSuccess: string;
        successHeading: string;
        successBody: string;
        successHint: string;
        contactSectionTitle: string;
        serviceSectionTitle: string;
        scheduleSectionTitle: string;
        issueSectionTitle: string;
        privacyNote: string;
        trustFreeQuote: string;
        trustFastResponse: string;
        fullName: string;
        fullNamePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        phone: string;
        phonePlaceholder: string;
        deviceType: string;
        devicePlaceholder: string;
        deviceAriaLabel: string;
        serviceMethod: string;
        inStoreTitle: string;
        inStoreDescription: string;
        onSiteTitle: string;
        onSiteDescription: string;
        streetAddress: string;
        streetAddressPlaceholder: string;
        city: string;
        cityPlaceholder: string;
        zip: string;
        zipPlaceholder: string;
        scheduleHeading: string;
        preferredDate: string;
        preferredTime: string;
        preferredTimePlaceholder: string;
        issueDescription: string;
        issuePlaceholder: string;
        cancel: string;
        submit: string;
        submitting: string;
      };
    };
  };
}
