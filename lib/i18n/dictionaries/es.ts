import type { Dictionary } from "../types";

export const es: Dictionary = {
  language: {
    switchLabel: "Idioma",
    english: "English",
    spanish: "Español",
  },
  nav: {
    brand: "Device Service NYC",
    items: [
      { label: "Inicio", href: "/" },
      { label: "Reservar", href: "/#quote" },
      { label: "Nosotros", href: "/#about" },
      { label: "Servicios", href: "/#services" },
      { label: "Precios", href: "/pricing" },
      { label: "Por Qué Confiar", href: "/#stats" },
      { label: "Testimonios", href: "/#testimonials" },
      { label: "Preguntas", href: "/#faq" },
      { label: "Contacto", href: "/#contact" },
    ],
    menuItems: [
      { label: "Inicio", href: "/" },
      { label: "Reservar", href: "/#quote" },
      { label: "Nosotros", href: "/#about" },
      { label: "Servicios", href: "/#services" },
      { label: "Precios", href: "/pricing" },
      { label: "Testimonios", href: "/#testimonials" },
      { label: "Preguntas", href: "/#faq" },
      { label: "Contacto", href: "/#contact" },
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos y Condiciones", href: "/terms" },
    ],
    getFreeQuote: "Solicitar Cotización",
  },
  home: {
    floatingBadges: {
      laptop: { label: "Laptop", title: "Servicio experto" },
      smartphoneTablet: { label: "Smartphone/Tablet", title: "Reparación rápida" },
      sameDay: { label: "Mismo Día", title: "Servicio Rápido" },
      original: { label: "Original", title: "Piezas Genuinas" },
      certified: { label: "Certificado", title: "Técnicos" },
      warranty: { label: "90 Días", title: "Garantía" },
    },
    hero: {
      titleIndependent: "Expertos en reparación de ",
      titleHighlight: "Smartphone, Tablet y ",
      titleDevices: "Laptop",
      subtitle:
        "Servicios profesionales para Smartphone, Tablet, Laptop y Desktop en Nueva York. Servicio el mismo día con piezas de calidad y técnicos experimentados en los que puede confiar.",
      requestQuote: "Solicitar Cotización",
      requestCallback: "Solicitar Llamada",
      yearsExperience: "Más de 7 Años de Experiencia",
      devicesServiced: "Más de 4,500 Dispositivos Reparados",
      sameDayService: "Servicio el Mismo Día",
      imageAlt:
        "Dispositivos Premium Brand - Servicio de Smartphone, Tablet, Laptop y Desktop",
    },
    serviceQuote: {
      eyebrow: "Reserve Su Reparación",
      title: "Solicitar Cotización de Servicio",
      heading: "¿Cómo desea su servicio?",
      onSiteTitle: "Vayan a Mí",
      onSiteDescription: "El técnico lo visita en su ubicación",
      inStoreTitle: "Iré al Local",
      inStoreDescription: "Visítenos en nuestro centro de Hicksville",
      popularBadge: "Más Popular",
      bookNow: "Reservar",
      stepLabels: ["SERVICIO", "FECHA", "HORA", "DETALLES"],
      nextBtn: "Siguiente →",
      backBtn: "← Atrás",
      changeService: "Cambiar",
      locationLabel: "Su Ubicación",
      fillFields: "Complete los campos requeridos para continuar",
      successTitle: "¡Cita Solicitada!",
      successBody: "Confirmaremos en 15 minutos.",
      validation: {
        nameRequired: "El nombre completo es obligatorio",
        nameInvalid: "Ingrese un nombre válido (solo letras)",
        phoneRequired: "El número de teléfono es obligatorio",
        phoneInvalid: "Ingrese un teléfono válido (10–15 dígitos, sin letras)",
        emailRequired: "El correo electrónico es obligatorio",
        emailInvalid: "Ingrese un correo electrónico válido",
        deviceRequired: "Seleccione un tipo de dispositivo",
        serviceRequired: "Elija un método de servicio",
        streetRequired: "La dirección es obligatoria",
        cityRequired: "La ciudad es obligatoria",
        cityInvalid: "Ingrese un nombre de ciudad válido",
        zipRequired: "El código postal es obligatorio",
        zipInvalid: "Ingrese un código postal válido de 5 dígitos",
        dateRequired: "Seleccione una fecha preferida",
        timeRequired: "Seleccione una hora preferida",
        issueRequired: "Describa el problema",
        issueMin: "Proporcione al menos 10 caracteres describiendo el problema",
      },
    },
    about: {
      eyebrow: "Más de 7 años de experiencia práctica en reparaciones",
      heading: "El Socio Ideal para sus Servicios de Dispositivos",
      body: "En Device Service NYC, nos especializamos en ofrecer servicios profesionales de reparación para Smartphone, Tablet, Laptop, Desktop y Premium Brand Watch. Ya sea una pantalla rota, un problema de batería o un fallo de software, lo tenemos cubierto con técnicos experimentados y piezas de calidad. Estamos comprometidos a restaurar su dispositivo al máximo rendimiento.",
      experienceTitle: "Experiencia en la que Puede Confiar",
      experienceBody:
        "Con años de experiencia en servicios de dispositivos Premium Brand, hemos construido una reputación de confiabilidad y calidad. Desde restauraciones simples hasta problemas complejos de hardware, lo manejamos todo con precisión y cuidado.",
      technicianTitle: "Servicio Técnico Confiable",
      technicianBody:
        "¿Tiene problemas con su dispositivo? Nuestro equipo ofrece servicios rápidos y profesionales para que vuelva a funcionar. Precios claros, piezas de calidad y comunicación transparente de principio a fin.",
      statValue: "4,500+",
      statLabel: "Dispositivos reparados",
    },
    services: {
      eyebrow: "Lo Que Ofrecemos",
      heading: "Amplia Variedad de Servicios de Reparación",
      subtitle:
        "Soluciones especializadas para todas sus necesidades de dispositivos Premium Brand",
      waterDamage: {
        title: "Restauración por Daño de Agua",
        description:
          "Técnicas avanzadas de restauración para devolver la vida a su dispositivo dañado por agua.",
      },
      motherboard: {
        title: "Revitalización de Placa Madre",
        description:
          "Reparación precisa de placas madre no funcionales, restaurando la funcionalidad completa.",
      },
      storage: {
        title: "Actualizaciones de Almacenamiento",
        description:
          "Actualice o reduzca el almacenamiento de todos los modelos de Laptop y Desktop según sus necesidades.",
      },
      dataRecovery: {
        title: "Recuperación de Datos",
        description:
          "Recupere datos críticos de su Laptop o Smartphone con nuestros servicios confiables de recuperación.",
      },
    },
    stats: {
      eyebrow: "Números que Hablan",
      heading: "Nuestro Éxito en Cifras",
      body: "En Device Service NYC, nos enorgullece ofrecer servicios profesionales de reparación para Smartphone, Tablet, Laptop y Desktop. Hemos reparado con éxito miles de dispositivos y ganado la confianza de cientos de clientes satisfechos en Nueva York. Nuestro enfoque en piezas de calidad, precios transparentes y trabajo confiable nos convierte en una opción de confianza para servicios de dispositivos en la zona.",
      devicesServiced: "Dispositivos reparados",
      happyCustomers: "Clientes Satisfechos",
      yearsExperience: "Años de Experiencia",
      warranty: "Garantía de Servicio",
    },
    process: {
      heading: "Cómo Garantizamos Servicios de Calidad",
      subtitle: "Nuestro proceso probado de 8 pasos para la excelencia",
      steps: [
        {
          title: "Consulta",
          description: "Consulta inicial sobre el problema de su dispositivo",
        },
        {
          title: "Diagnóstico",
          description: "Diagnóstico completo con herramientas avanzadas",
        },
        {
          title: "Cotización",
          description: "Presupuesto detallado con costos y plazos",
        },
        {
          title: "Aprobación",
          description: "Su confirmación antes de proceder",
        },
        {
          title: "Reparación",
          description: "Servicio experto con piezas genuinas",
        },
        {
          title: "Pruebas",
          description: "Pruebas exhaustivas para verificar el funcionamiento",
        },
        {
          title: "Entrega",
          description: "Dispositivo devuelto con cobertura de garantía",
        },
        {
          title: "Seguimiento",
          description: "Verificación post-servicio y cobertura de garantía",
        },
      ],
    },
    testimonials: {
      heading: "Opiniones de Nuestros Clientes",
      subtitle: "Escuche lo que dicen nuestros clientes satisfechos",
      items: [
        {
          quote:
            "Me sorprendió el servicio rápido y eficiente para mi Laptop dañada por agua. El técnico la restauró a perfecto funcionamiento, evitándome comprar una nueva. ¡Muy recomendado!",
          name: "James R.",
          title: "Brooklyn, NY",
        },
        {
          quote:
            "Mi Desktop tenía problemas de almacenamiento y el servicio de actualización fue impecable. Todo se explicó claramente y ahora mi dispositivo funciona más rápido que nunca. ¡Una experiencia fantástica!",
          name: "Sarah M.",
          title: "Manhattan, NY",
        },
        {
          quote:
            "Reemplacé la pantalla de mi Smartphone en menos de 2 horas. El servicio se ve perfecto y los precios fueron transparentes sin cargos ocultos. ¡Definitivamente volveré!",
          name: "Michael T.",
          title: "Queens, NY",
        },
        {
          quote:
            "La batería de mi Laptop se agotaba en 2 horas — la reemplazaron el mismo día. El técnico era muy conocedor y la garantía de 90 días da mucha tranquilidad.",
          name: "Emily W.",
          title: "Staten Island, NY",
        },
        {
          quote:
            "Se me cayó la Tablet y se rompió la pantalla. La llevé, me dieron un presupuesto por adelantado y estuvo lista esa misma tarde. ¡Excelente servicio!",
          name: "Carlos D.",
          title: "The Bronx, NY",
        },
      ],
    },
    faq: {
      eyebrow: "¿Tiene Preguntas?",
      heading: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesita saber antes de reservar su servicio",
      items: [
        {
          q: "¿Cuánto tiempo tarda un servicio típico?",
          a: "La mayoría de los reemplazos de pantalla y batería se completan en 1–3 horas mientras espera. Servicios más complejos como placa madre o daño por agua pueden tomar 24–48 horas. Siempre le damos un tiempo estimado antes de comenzar.",
        },
        {
          q: "¿Usan piezas genuinas Premium Brand?",
          a: "Sí. Usamos piezas OEM y genuinas Premium Brand para todos los servicios para garantizar la misma calidad, ajuste y sensación que el original. Nunca comprometemos la calidad de las piezas.",
        },
        {
          q: "¿Hay garantía en los servicios?",
          a: "Absolutamente. Cada servicio incluye una garantía de 90 días que cubre piezas y mano de obra. Si algo sale mal debido a nuestro servicio, lo reparamos sin cargo.",
        },
        {
          q: "¿Pueden reparar Smartphones o Laptops dañados por agua?",
          a: "Sí — el daño por agua es una de nuestras especialidades. Usando limpieza ultrasónica y técnicas de micro-soldadura, restauramos con éxito la mayoría de dispositivos Premium Brand dañados por líquidos. Tráigalo lo antes posible para mejores resultados.",
        },
        {
          q: "¿Necesito reservar una cita?",
          a: "¡Las visitas sin cita son bienvenidas! Para un servicio más rápido puede enviar una solicitud en línea para que podamos prepararnos. Para servicios de Laptop y Desktop recomendamos programar con anticipación.",
        },
        {
          q: "¿Cuánto cuesta un servicio?",
          a: "Los costos varían según el dispositivo y tipo de servicio. Ofrecemos un diagnóstico gratuito antes de comenzar cualquier trabajo, para que conozca el costo exacto por adelantado sin cargos ocultos.",
        },
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "Aceptamos efectivo, todas las tarjetas de crédito/débito principales, UPI, Google Pay y PhonePe.",
        },
        {
          q: "¿Qué pasa si mi dispositivo no se puede reparar?",
          a: "Si la reparación no es posible, no hay cargo por diagnóstico. Devolveremos su dispositivo y le explicaremos honestamente qué sucedió.",
        },
      ],
    },
    contact: {
      badge: "Repare su Dispositivo Hoy",
      heading: "¿Listo para Restaurar su Dispositivo?",
      body: "Contáctenos en cualquier momento para servicio profesional de Smartphone, Tablet, Laptop y Desktop con piezas de calidad y garantía de 90 días",
      requestCallbackDesktop: "Solicitar Llamada:",
      requestCallbackMobile: "Solicitar Llamada",
      whatsapp: "WhatsApp",
    },
    footer: {
      tagline:
        "Servicio profesional de Smartphone, Tablet, Laptop y Desktop en Nueva York.",
      taglineLine2:
        "Piezas de calidad. Garantía de 90 días. Servicio el mismo día.",
      contactHours: "Contacto y Horario",
      address: "14 Terry St, Hicksville, NY 11801",
      monFri: "Lun–Vie:",
      monFriHours: "9:00 AM – 6:00 PM",
      saturday: "Sábado:",
      saturdayHours: "10:00 AM – 4:00 PM",
      sunday: "Domingo:",
      sundayHours: "Cerrado",
      quickLinks: "Enlaces Rápidos",
      repairServices: "Servicios de Reparación",
      pricing: "Precios",
      faqs: "Preguntas Frecuentes",
      reviews: "Reseñas",
      legal: "Legal",
      privacyPolicy: "Política de Privacidad",
      termsConditions: "Términos y Condiciones",
      contactUs: "Contáctenos",
      mapTitle: "Device Service NYC — 14 Terry St, Hicksville, NY 11801",
      disclaimer:
        "Somos un proveedor de servicios de reparación independiente y no estamos afiliados, autorizados ni respaldados por Premium Brand Inc. Smartphone, Tablet, Laptop y Desktop son marcas registradas de Premium Brand Inc.",
      copyright: "Todos los derechos reservados.",
    },
    stickyCta: {
      requestQuote: "Solicitar Cotización",
      requestCallback: "Solicitar Llamada",
    },
    form: {
      devices: [
        { key: "laptop", label: "Laptop" },
        { key: "smartphone", label: "Smartphone" },
        { key: "tablet", label: "Tablet" },
        { key: "desktop", label: "Desktop" },
        { key: "smartwatch", label: "Smartwatch" },
        {
          key: "smart-glass",
          label: "Meta Glass o Smart Glass (Eliminación de LED)",
        },
        { key: "other", label: "Otro" },
      ],
      modal: {
        titleDefault: "Solicitar Cotización de Servicio",
        titleSuccess: "¡Solicitud Recibida!",
        subtitleDefault:
          "Repare su dispositivo con técnicos experimentados",
        subtitleSuccess: "Le responderemos dentro de 24 horas",
        successHeading: "¡Solicitud Enviada con Éxito!",
        successBody: "Nos pondremos en contacto pronto con una cotización.",
        successHint: "Revise su correo electrónico para los detalles de confirmación.",
        contactSectionTitle: "Tus Datos",
        serviceSectionTitle: "Dispositivo y Servicio",
        scheduleSectionTitle: "Horario Preferido",
        issueSectionTitle: "¿Cuál es el Problema?",
        privacyNote: "Tu información es privada y segura. Sin spam, nunca.",
        trustFreeQuote: "Cotización Gratis",
        trustFastResponse: "Respuesta en 24h",
        fullName: "Nombre Completo",
        fullNamePlaceholder: "Ingrese su nombre",
        email: "Correo Electrónico *",
        emailPlaceholder: "su@email.com",
        phone: "Número de Teléfono",
        phonePlaceholder: "+1 (555) 000-0000",
        deviceType: "Tipo de Dispositivo *",
        devicePlaceholder: "Seleccione su dispositivo",
        deviceAriaLabel: "Selección de dispositivo",
        serviceMethod: "Método de Servicio Preferido *",
        inStoreTitle: "Visita en Tienda",
        inStoreDescription: "Llevaré mi dispositivo a su centro de servicio",
        onSiteTitle: "Servicio a Domicilio",
        onSiteDescription: "Solicitar visita de un técnico en mi ubicación",
        streetAddress: "Dirección",
        streetAddressPlaceholder: "123 Calle Principal, Apt 4B",
        city: "Ciudad",
        cityPlaceholder: "Hicksville",
        zip: "Código Postal",
        zipPlaceholder: "11801",
        scheduleHeading: "Horario Preferido (Opcional)",
        preferredDate: "Fecha Preferida",
        preferredTime: "Hora Preferida",
        preferredTimePlaceholder: "Seleccionar hora",
        issueDescription: "Descripción del Problema",
        issuePlaceholder: "Describa el problema con su dispositivo...",
        cancel: "Cancelar",
        submit: "Enviar Solicitud",
        submitting: "Enviando...",
      },
    },
  },
};
