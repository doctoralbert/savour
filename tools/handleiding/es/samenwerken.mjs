// Manual (Spaans), sección «Compartir y equipos de cocina».

export const groups = {
  samenwerken: {
    name: 'Compartir y equipos de cocina',
    intro: 'Enviar una receta rápido o un recetario para toda tu brigada, con roles, carpetas e invitaciones.'
  }
};

export const pages = {
  keukenteams: {
    slug: 'es/manual-compartir-y-equipos-de-cocina',
    menu: 'Resumen: compartir y equipos de cocina',
    h1: 'Compartir y equipos de cocina',
    title: 'Compartir recetas y equipos de cocina con roles | Manual de Savour',
    desc: 'Así compartes recetas en Savour: un enlace por WhatsApp, Telegram, SMS o correo, y equipos de cocina con los roles propietario, editor y lector para toda tu brigada.',
    lead: 'Enviar una receta rápido, o un recetario para toda tu brigada.',
    sections: [
      ['Compartir una receta', 'Envía una receta como enlace, también a alguien sin cuenta, y decide cuánto tiempo funciona. Ver [Compartir una receta con un enlace](#delen-link).'],
      ['Un equipo de cocina', 'Un equipo de cocina es el recetario de tu cocina. Todos los miembros ven las mismas recetas en su móvil, tableta u ordenador. Cuando el autor cambia una receta, todos ven la nueva versión al momento.'],
      [
        'Todo sobre los equipos de cocina',
        'Paso a paso:',
        [
          '[Crear un equipo de cocina](#keukenteam-maken)',
          '[Roles: propietario, editor y lector](#keukenteam-rollen)',
          '[Invitar a tu equipo](#keukenteam-uitnodigen)',
          '[Recetas y carpetas en el equipo](#keukenteam-mappen)',
          '[Copiar la receta de un compañero](#recept-overnemen)',
          '[Salir, eliminar y Savour Pro](#keukenteam-verlaten)'
        ]
      ],
      ['Lo que cuesta', 'Crear un equipo de cocina requiere [Savour Pro](#gratis-en-pro). Ser miembro es gratis. Para toda una cocina con Pro para todos existe una [suscripción de organización](#organisatie).'],
      ['Leer más', 'Lo que un recetario compartido hace por tu equipo: [Recetario compartido para tu equipo de cocina](/blog/gedeeld-receptenboek-keukenteam) y [Los equipos de cocina explicados](/blog/gedeelde-mappen-uitgelegd).']
    ]
  },
  'delen-link': {
    slug: 'es/manual-compartir-receta-con-enlace',
    menu: 'Compartir una receta con un enlace',
    title: 'Compartir una receta por WhatsApp, Telegram, SMS o correo | Manual de Savour',
    desc: 'Así compartes una receta de Savour con un enlace: por WhatsApp, Telegram, SMS o correo, con límite de tiempo, desactivar el enlace y dejar que la copien.',
    lead: 'Una receta para un compañero, un proveedor o un becario, también sin cuenta.',
    sections: [
      ['Compartir', 'Abre la receta y elige «Compartir». Envíala por WhatsApp, Telegram, SMS o correo, o copia el enlace. En WhatsApp la receta aparece con su propia imagen de vista previa.'],
      ['Qué ve quien la recibe', 'Quien abre el enlace ve la receta, también sin cuenta. Puede [escalarla](#omrekenen) y usar el [modo cocina](#kookmodus), pero no editarla.'],
      ['Cuánto dura el enlace', 'En «¿Durante cuánto tiempo?» eliges 1 hora, 1 día, 1 semana o ilimitado. Después el enlace deja de funcionar.'],
      ['Desactivar el enlace', 'Con «Desactivar enlace» nadie puede abrir ya la receta con ese enlace, aunque no haya pasado el tiempo.'],
      ['Dejar que la copien', 'Si activas «Los destinatarios pueden copiar esta receta», quienes tengan cuenta pueden añadirla a sus recetas como copia propia. Tu receta no cambia.'],
      ['Con todo tu equipo', 'Si compartes recetas a menudo con las mismas personas, usa un [equipo de cocina](#keukenteams): nadie tendrá que guardar enlaces.']
    ]
  },
  'keukenteam-maken': {
    slug: 'es/manual-crear-equipo-de-cocina',
    menu: 'Crear un equipo de cocina',
    title: 'Crear un equipo de cocina en Savour | Manual',
    desc: 'Así creas un equipo de cocina en Savour: nombre e imagen, añadir recetas, crear carpetas e invitar a tu equipo. Con Savour Pro, también en la semana de prueba.',
    lead: 'En cinco minutos, un recetario para toda tu cocina.',
    sections: [
      ['Crearlo', 'En el menú, en Equipos de cocina, elige «Crear equipo de cocina» y ponle un nombre, como el de tu restaurante o cocina. Funciona con [Savour Pro](#gratis-en-pro), también en la semana de prueba gratuita.'],
      ['Ajustes', 'En los ajustes del equipo cambias en General el nombre y la imagen. En Compartir está el enlace de invitación y en «Miembros y permisos» gestionas quién está.'],
      ['Añadir recetas', 'Elige «Añadir receta» y marca recetas de tu propia biblioteca. La receta sigue siendo tuya: está en el equipo y en tus recetas. Ver [Recetas y carpetas en el equipo](#keukenteam-mappen).'],
      ['Invitar a gente', 'Envía a tu equipo una invitación por WhatsApp, Telegram, correo o enlace. Ver [Invitar a tu equipo](#keukenteam-uitnodigen).'],
      ['Por dónde empezar', 'Empieza con las recetas base que todos usan a diario, como fondos, salsas y guarniciones fijas. Después amplía por partida o por menú.']
    ]
  },
  'keukenteam-rollen': {
    slug: 'es/manual-roles-en-el-equipo',
    menu: 'Roles: propietario, editor y lector',
    title: 'Roles en un equipo de cocina: propietario, editor y lector | Manual de Savour',
    desc: 'Quién puede hacer qué en un equipo de cocina de Savour: el propietario gestiona, el editor añade recetas y carpetas, el lector ve, imprime y escala.',
    lead: 'Tú gestionas, tu segundo edita y el resto consulta.',
    sections: [
      [
        'Los tres roles',
        'Cada miembro tiene un rol:',
        [
          'Propietario: gestiona el equipo, sus miembros y sus roles. Solo el propietario saca a gente del equipo.',
          'Editor: añade recetas y carpetas, las quita y gestiona las carpetas.',
          'Lector: ve, imprime y escala.'
        ]
      ],
      ['Cambiar un rol', 'Los miembros nuevos entran como lectores. El propietario cambia su rol en «Miembros y permisos» en los ajustes del equipo.'],
      ['Editar una receta', 'Solo el autor puede editar una receta, también en un equipo. Así nadie cambia por error la ficha de otro. Los demás pueden [copiarla](#recept-overnemen).'],
      ['Qué rol para quién', 'Un reparto habitual: el jefe de cocina es propietario, segundos y jefes de partida son editores, ayudantes y becarios son lectores.']
    ]
  },
  'keukenteam-uitnodigen': {
    slug: 'es/manual-invitar-a-tu-equipo',
    menu: 'Invitar a tu equipo',
    title: 'Invitar a tu equipo de cocina por WhatsApp, correo o enlace | Manual de Savour',
    desc: 'Así invitas a cocineros a tu equipo en Savour: por WhatsApp, Telegram, correo o el enlace de invitación. Ser miembro es gratis, también sin Savour Pro.',
    lead: 'Toda tu brigada dentro con un mensaje en el grupo.',
    sections: [
      ['Invitar', 'Abre los ajustes del equipo y elige en Compartir «Compartir / invitar». Envía la invitación por WhatsApp, Telegram o correo, o elige «Copiar enlace» y ponlo en vuestro grupo.'],
      ['Qué hace el compañero', 'Tu compañero abre el enlace e inicia sesión o [crea una cuenta gratuita](#account-maken). Después es miembro del equipo como lector.'],
      ['Gratis para los miembros', 'Ser miembro de un equipo de cocina es gratis, también sin Savour Pro. Solo el propietario necesita Pro.'],
      ['Ajustar el rol', 'Después dale a tu segundo el rol de editor. Ver [Roles](#keukenteam-rollen).'],
      ['Sacar a alguien', 'Si alguien se va, el propietario lo saca del equipo en «Miembros y permisos». Conserva sus propias recetas; las del equipo ya no las ve.']
    ]
  },
  'keukenteam-mappen': {
    slug: 'es/manual-recetas-y-carpetas-del-equipo',
    menu: 'Recetas y carpetas en el equipo',
    title: 'Recetas y carpetas en un equipo de cocina: gestionar y archivar | Manual',
    desc: 'Así organizas un equipo de cocina en Savour: añadir recetas, carpetas por partida o menú, gestionar, ordenar y archivar carpetas e imprimir el equipo.',
    lead: 'El recetario de tu cocina, organizado como trabaja tu brigada.',
    sections: [
      ['Añadir recetas', 'En el equipo elige «Añadir receta» y marca recetas de tu biblioteca. La receta sigue siendo tuya y está tanto en el equipo como en tus recetas. Si la cambias, el equipo ve la nueva versión al momento.'],
      ['Carpetas', 'Divide el equipo en carpetas, por partida (garde manger, salsas, pastelería) o por menú. Un propietario o editor crea carpetas y mete recetas.'],
      ['Gestionar carpetas', 'Con «Gestionar carpetas» renombras, ordenas las carpetas como en tu cocina y archivas las que ya no usas, como el menú de la temporada pasada.'],
      ['Archivo', 'Las carpetas archivadas y sus recetas se conservan. Están abajo, en «Archivo».'],
      ['Quitar del equipo', 'Abre una receta desde el equipo y elige ⋯ «Quitar del equipo de cocina» o «Quitar de la carpeta». La receta sigue siendo de su autor.'],
      ['Imprimir', 'Imprime todo el equipo, una carpeta o una selección propia de una vez, con el logo del propietario. Ver [Imprimir varias recetas](#printen-map).']
    ]
  },
  'recept-overnemen': {
    slug: 'es/manual-copiar-una-receta',
    menu: 'Copiar la receta de un compañero',
    title: 'Copiar la receta de un compañero como propia | Manual de Savour',
    desc: 'Así copias en Savour la receta de un compañero: «Añadir a mis recetas» te da una copia propia que puedes cambiar. El original sigue siendo del autor.',
    lead: 'Tu propia versión de la receta de un compañero, sin cambiar el original.',
    sections: [
      ['En un equipo de cocina', 'En cada receta de un compañero del equipo ves «Añadir a mis recetas». Recibes una copia propia en tu biblioteca.'],
      ['Con un enlace compartido', 'Si el autor activó al [compartir](#delen-link) «Los destinatarios pueden copiar esta receta», puedes añadirla desde el enlace con tu cuenta.'],
      ['Tu copia', 'Tu copia es solo tuya: puedes [editarla](#recept-maken), ponerla en tus [carpetas](#mappen) y escalarla. El original sigue siendo del autor y no cambia.']
    ]
  },
  'keukenteam-verlaten': {
    slug: 'es/manual-salir-o-eliminar-equipo',
    menu: 'Salir, eliminar y Savour Pro',
    title: 'Salir de un equipo de cocina o eliminarlo, y Savour Pro | Manual',
    desc: 'Qué pasa si sales de un equipo de cocina de Savour o lo eliminas, y qué le pasa al equipo si el propietario deja Savour Pro.',
    lead: 'Qué pasa con las recetas cuando alguien se va o lo deja.',
    sections: [
      ['Salir', 'Un miembro siempre puede salir de un equipo. Conservas tus recetas; las de los demás ya no las ves. Si quieres guardar una, [cópiala antes](#recept-overnemen).'],
      ['Eliminar', 'Solo el propietario puede eliminar el equipo, en General dentro de los ajustes. Las recetas siguen en la biblioteca de su autor.'],
      ['Si el propietario deja Pro', 'Un equipo de cocina funciona mientras el propietario tenga [Savour Pro](#gratis-en-pro), también en la semana de prueba. Si se acaba, el equipo queda bloqueado, pero todo se conserva hasta que el propietario vuelva a tener Pro.']
    ]
  },
  'collega-uitnodigen': {
    slug: 'es/manual-invitar-a-un-colega',
    menu: 'Invitar a un colega: 14 días de Pro',
    title: 'Invitar a un colega y recibir 14 días de Savour Pro | Manual',
    desc: 'Así invitas a un colega a Savour con tu enlace personal y recibes 14 días de Savour Pro de regalo cuando crea una cuenta e inicia sesión.',
    lead: 'Comparte Savour con un colega y recibe Pro a cambio.',
    sections: [
      ['Tu enlace personal', 'En el menú, en General, elige «Invitar a un colega». Copia tu enlace personal o compártelo por WhatsApp u otra app.'],
      ['Cuándo recibes el regalo', 'Cuando tu colega crea una cuenta con tu enlace, confirma su correo e inicia sesión, recibes 14 días de Savour Pro. Tu colega recibe la prueba normal de 7 días.'],
      ['Si ya pagas Pro', 'Con una suscripción de pago recibes los 14 días como saldo en tu próxima factura. Si la has cancelado, empiezan tras tu periodo pagado.'],
      ['Cuántas veces', 'El regalo vale para cuentas nuevas, una vez por colega y hasta 12 veces. En «Invitar a un colega» ves cuántos has invitado.']
    ]
  }
};
