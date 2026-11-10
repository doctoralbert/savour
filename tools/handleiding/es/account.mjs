// Manual (Spaans), sección «Cuenta y suscripción».

export const groups = {
  account: {
    name: 'Cuenta y suscripción',
    intro: 'Tu perfil, apariencia e idioma, qué es gratis y qué añade Savour Pro, organizaciones, cancelar y eliminar tu cuenta.'
  }
};

export const pages = {
  'gratis-en-pro': {
    slug: 'es/manual-cuenta-y-pro',
    menu: 'Gratis y Savour Pro',
    title: 'Gratis o Savour Pro: qué incluye y cuánto cuesta | Manual',
    desc: 'Lo que puedes hacer gratis en Savour y lo que añade Savour Pro: recetas ilimitadas, IA para fotos, equipos de cocina, imprimir con logo y descargas. 2,99 € al mes.',
    lead: 'Qué es gratis, qué añade Savour Pro y cómo funciona la semana de prueba.',
    sections: [
      ['Gratis', 'Una cuenta gratuita guarda hasta 100 recetas, importa Word, PDF, texto y exportaciones de otras apps con el lector de Savour, escala, tiene modo cocina, imprime y puede ser miembro de equipos de cocina.'],
      [
        'Savour Pro',
        'Savour Pro cuesta 2,99 € al mes o 29 € al año y añade:',
        [
          'Recetas ilimitadas.',
          'IA para [fotos, letra a mano y casos dudosos](#import-ai), hasta 150 importaciones al mes.',
          '[Crear equipos de cocina](#keukenteam-maken) e invitar a tu equipo.',
          '[Imprimir con el logo de tu restaurante](#printen-logo).',
          '[Descargar en Word o como copia de seguridad](#downloaden).',
          'Sin anuncios en la app.'
        ]
      ],
      ['La semana de prueba', 'Las cuentas nuevas reciben 7 días de Savour Pro gratis, sin datos de pago. También en la prueba guardas hasta 100 recetas.'],
      ['Pagar', 'Pagas con iDEAL, tarjeta, Apple Pay, Google Pay o PayPal. No se cobra IVA (régimen neerlandés de pequeñas empresas). Cancela cuando quieras; mantienes Pro hasta el final del periodo pagado.'],
      ['Para toda una cocina', 'Si todos en tu cocina necesitan Pro, elige una [organización](#organisatie). Todos los precios están en [Savour Pro](/savour-pro).']
    ]
  },
  organisatie: {
    slug: 'es/manual-suscripcion-de-organizacion',
    menu: 'Organizaciones: Pro para toda la cocina',
    title: 'Suscripción de organización: Savour Pro para toda tu cocina | Manual',
    desc: 'Savour para toda una cocina: organizaciones de 5, 10 o 25 personas, todas con Savour Pro. Cómo invitar a tu equipo y gestionar las plazas.',
    lead: 'Savour Pro para todos en tu cocina, con una sola suscripción.',
    sections: [
      ['Qué es', 'Con una organización todos en tu equipo tienen Savour Pro. Hay suscripciones para 5, 10 o 25 personas: 8,99 €, 14,99 € o 29,99 € al mes.'],
      ['Configurarla', 'Elige una organización en la página [Savour Pro](/savour-pro) o ve a Mi cuenta → Savour Pro. Invita allí a tu equipo a las plazas.'],
      ['Organización o equipo de cocina', 'Una organización trata de quién tiene Pro. Un [equipo de cocina](#keukenteams) trata de qué recetas compartís. Para un equipo que comparte recetas basta un propietario con Pro; con una organización todos pueden además leer fotos, crear equipos e imprimir con logo.']
    ]
  },
  'abonnement-beheren': {
    slug: 'es/manual-gestionar-suscripcion',
    menu: 'Gestionar tu suscripción',
    title: 'Gestionar tu suscripción a Savour Pro y facturas | Manual',
    desc: 'Así gestionas tu suscripción en Savour: contratar Pro, mensual o anual, datos de pago y facturas, y el logo de tus impresiones.',
    lead: 'Todo sobre tu suscripción en un sitio: Mi cuenta → Savour Pro.',
    sections: [
      ['Dónde', 'Ve a Mi cuenta → Savour Pro. Ahí ves si tienes Savour Pro, una semana de prueba o una organización, y hasta cuándo.'],
      ['Contratar Pro', 'Elige Savour Pro mensual o anual y paga con iDEAL, tarjeta, Apple Pay, Google Pay o PayPal. Tienes Pro justo después de pagar.'],
      ['Cambios y facturas', 'Elige «Gestionar suscripción» en Savour Pro. Ahí cambias tus datos de pago, ves tus facturas y cancelas.'],
      ['Logo en las impresiones', 'El [logo de tus impresiones](#printen-logo) lo configuras en la pestaña «Logo en las impresiones».']
    ]
  },
  'pro-stoppen': {
    slug: 'es/manual-dejar-pro',
    menu: 'Dejar Savour Pro',
    title: 'Dejar Savour Pro: tus recetas se quedan | Manual',
    desc: 'Qué pasa al dejar Savour Pro: todas tus recetas se quedan, solo no puedes añadir más allá de 100, y tu equipo de cocina se bloquea hasta que vuelvas a tener Pro.',
    lead: 'Siempre conservas todo. Esto es lo que cambia.',
    sections: [
      ['Cancelar', 'Cancela en Mi cuenta → Savour Pro. Mantienes Pro hasta el final del periodo pagado.'],
      ['Tus recetas se quedan', 'Si dejas Pro, todas tus recetas se quedan, aunque tengas más de 100. Puedes verlas, escalarlas e imprimirlas. Solo no puedes añadir recetas nuevas por encima de 100.'],
      ['Tu equipo de cocina', 'Un equipo del que eres propietario queda bloqueado mientras no tengas Pro. Todo se conserva; con Pro vuelve a funcionar. Ver [Salir, eliminar y Savour Pro](#keukenteam-verlaten).'],
      ['Tras la semana de prueba', 'Tras la semana de prueba gratuita pasa lo mismo: todo lo que hayas creado se queda.']
    ]
  },
  'account-profiel': {
    slug: 'es/manual-mi-cuenta',
    menu: 'Mi cuenta: perfil y contraseña',
    title: 'Mi cuenta: nombre, foto de perfil y contraseña | Manual de Savour',
    desc: 'Así gestionas tu cuenta en Savour: cambiar nombre y foto de perfil, cambiar la contraseña, cerrar sesión y las otras pestañas de Mi cuenta.',
    lead: 'Tu perfil y los ajustes de tu cuenta en un solo sitio.',
    sections: [
      ['Dónde', 'Elige Ajustes en el menú o, en el móvil, el icono de Mi cuenta arriba. Mi cuenta tiene las pestañas Cuenta, Savour Pro, Logo en las impresiones, Apariencia, Categorías y Limpiar.'],
      ['Perfil', 'En Cuenta cambias tu nombre y tu foto de perfil. La foto de perfil se recorta para que tu cara quede bien encuadrada.'],
      ['Contraseña', 'Elige una contraseña nueva en Cuenta. Si ya no la recuerdas, usa «¿Has olvidado tu contraseña?» al [iniciar sesión](#inloggen).'],
      ['Más en Cuenta', 'Aquí [imprimes o descargas todas tus recetas](#downloaden), [invitas a un colega](#collega-uitnodigen), [instalas la app](#app-installeren), cierras sesión y [eliminas tu cuenta](#account-verwijderen).'],
      ['Las demás pestañas', '[Savour Pro](#abonnement-beheren), [Logo en las impresiones](#printen-logo), [Apariencia](#weergave-en-taal), [Categorías](#categorieen) y [Limpiar](#opschonen).']
    ]
  },
  'weergave-en-taal': {
    slug: 'es/manual-apariencia-e-idioma',
    menu: 'Tema oscuro o claro e idioma',
    title: 'Tema oscuro o claro y el idioma de Savour | Manual',
    desc: 'Así eliges en Savour el tema oscuro o claro y el idioma: neerlandés, inglés, alemán, español o francés. Tus recetas nunca se traducen.',
    lead: 'Para que Savour se lea mejor en tu cocina.',
    sections: [
      ['Oscuro o claro', 'Savour es oscuro con dorado por defecto. Elige «Oscuro» o «Claro» en Mi cuenta → Apariencia, o cambia con el botón de arriba. Tu elección se guarda en tu cuenta, también para tus otros dispositivos.'],
      ['Idioma', 'Con el botón de idioma de arriba pones Savour en neerlandés, inglés, alemán, español o francés. Los botones y las explicaciones cambian con él.'],
      ['Tus recetas no cambian', 'Las recetas y los nombres nunca se traducen. Una receta en neerlandés sigue en neerlandés aunque uses Savour en español.']
    ]
  },
  'account-verwijderen': {
    slug: 'es/manual-eliminar-cuenta',
    menu: 'Eliminar tu cuenta',
    title: 'Eliminar tu cuenta de Savour definitivamente | Manual',
    desc: 'Así eliminas tu cuenta de Savour: qué se elimina, qué puedes descargar antes y por qué no se puede deshacer.',
    lead: 'Lo eliminado no vuelve. Descarga antes lo que quieras conservar.',
    sections: [
      ['Descarga antes', 'Si quieres conservar tus recetas, [descárgalas antes](#downloaden) en Word o como copia, o [imprímelas](#printen-map).'],
      ['Eliminar', 'Ve a Mi cuenta → Cuenta y elige abajo «Eliminar cuenta definitivamente». Savour pregunta antes si estás seguro.'],
      ['Qué se elimina', 'Tus recetas personales, carpetas, favoritos y datos de perfil. No se puede deshacer.'],
      ['Una suscripción', 'Si tienes Savour Pro, [cancélalo antes](#pro-stoppen) en Savour Pro.']
    ]
  },
  'privacy-en-veiligheid': {
    slug: 'es/manual-privacidad-y-tus-recetas',
    menu: 'Tus recetas, privacidad y seguridad',
    title: 'Tus recetas, privacidad y seguridad en Savour | Manual',
    desc: 'De quién son tus recetas en Savour, quién puede verlas, dónde se guardan y cómo puedes llevártelas siempre. Con un enlace a la política de privacidad.',
    lead: 'Tus recetas son tuyas. Así las trata Savour.',
    sections: [
      ['Tuyas', 'Tus recetas son tuyas. Savour nunca elimina nada sin que lo pidas, y siempre puedes llevártelas.'],
      ['Quién las ve', 'Tus recetas y carpetas solo las ves tú. Las recetas que pones en un [equipo de cocina](#keukenteams) las ve ese equipo. Un [enlace compartido](#delen-link) lo puede abrir cualquiera que lo tenga mientras funcione.'],
      ['Dónde están', 'Tus recetas están en la nube para que llegues a ellas desde cualquier dispositivo. Las que has abierto también están en tu dispositivo para [usarlas sin conexión](#offline).'],
      ['Llevártelas', 'Con Savour Pro [descargas todas tus recetas](#downloaden) cuando quieras.'],
      ['Más', 'Todo sobre qué datos guarda Savour y con quién trabaja está en la [política de privacidad](/privacy).']
    ]
  }
};
