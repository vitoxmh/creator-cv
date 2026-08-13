export const initialData = {
  personal: {
    fullName: 'Ana García López',
    jobTitle: 'Diseñadora UX · Desarrolladora Frontend',
    email: 'ana.garcia@correo.com',
    phone: '+34 600 123 456',
    address: 'Madrid, España',
    website: 'www.anagarcia.dev',
    linkedin: 'linkedin.com/in/anagarcia',
    photo: null,
    summary:
      'Diseñadora y desarrolladora frontend con más de 6 años de experiencia creando interfaces digitales accesibles y centradas en la persona. Apasionada por el diseño de sistemas, la mejora continua del producto y el trabajo en equipos multidisciplinares.'
  },
  experience: [
    {
      role: 'Desarrolladora Frontend Senior',
      company: 'TechNova Solutions',
      start: 'Ene 2021',
      end: 'Actualidad',
      bullets:
        'Lideré la migración de una plataforma monolítica a React y TypeScript, reduciendo el tiempo de carga en un 40%.\nColaboré con el equipo de diseño para construir un sistema de diseño reutilizable usado en 12 productos.\nMentoricé a 4 desarrolladores junior y dirigí las sesiones semanales de revisión de código.'
    },
    {
      role: 'Diseñadora UI / Desarrolladora Frontend',
      company: 'Pixel Studio',
      start: 'Mar 2018',
      end: 'Dic 2020',
      bullets:
        'Diseñé y desarrollé más de 25 sitios web y aplicaciones para clientes de retail y servicios.\nImplementé mejoras de accesibilidad (WCAG AA) y rendimiento en los proyectos asignados.\nRedacté la guía de estilo de la agencia y la documentación del proceso de diseño.'
    },
    {
      role: 'Desarrolladora Web Junior',
      company: 'WebCorp',
      start: 'Jul 2016',
      end: 'Feb 2018',
      bullets:
        'Mantuve y amplié maquetas HTML/CSS/JS para campañas de marketing.\nAutomaticé la generación de informes de calidad de las landing pages con Node.js.'
    }
  ],
  education: [
    {
      degree: 'Grado en Ingeniería Informática',
      institution: 'Universidad Politécnica de Madrid',
      start: '2012',
      end: '2016',
      description: 'Especialización en sistemas de información e interacción persona-ordenador.'
    },
    {
      degree: 'Máster en Diseño de Experiencia de Usuario',
      institution: 'Escuela de Diseño UX',
      start: '2017',
      end: '2018',
      description: 'Investigación de usuarios, prototipado, arquitectura de la información y testing de usabilidad.'
    }
  ],
  skills: [
    { category: 'Front-End', items: ['React', 'TypeScript', 'JavaScript', 'Vue.js', 'HTML5', 'CSS3', 'SCSS', 'jQuery'] },
    { category: 'Back-End', items: ['Node.js', 'PHP', 'CodeIgniter', 'Python'] },
    { category: 'Bases de datos', items: ['MySQL', 'PostgreSQL', 'SQLite', 'SQL'] },
    { category: 'Herramientas / DevOps', items: ['Git', 'Docker', 'Linux', 'Hugo'] },
    { category: 'CMS', items: ['WordPress'] },
    { category: 'Otros', items: ['Unity', 'C#', 'Figma', 'OpenCode'] }
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'B2 · Avanzado' }
  ],
  courses: [
    { title: 'React Avanzado y TypeScript', institution: 'Platzi', year: '2023' },
    { title: 'Diseño de Experiencia de Usuario', institution: 'Google · Coursera', year: '2022' }
  ],
  projects: [
    {
      name: 'Sistema de diseño OpenUI',
      description: 'Biblioteca de componentes accesibles construida con React, usada en 12 productos de la empresa.',
      link: 'github.com/anagarcia/openui'
    },
    {
      name: 'Portal de datos abiertos',
      description: 'Dashboard público de datos de movilidad con visualizaciones interactivas en D3.js.',
      link: 'anagarcia.dev/datos'
    }
  ]
}
