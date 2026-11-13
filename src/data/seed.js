export const OFICIOS = [
  { id: 'gasista', plural: 'Gasistas', singular: 'Gasista', servicio: 'Gas', icon: 'Flame' },
  { id: 'electricista', plural: 'Electricistas', singular: 'Electricista', servicio: 'Electricidad', icon: 'Zap' },
  { id: 'plomero', plural: 'Plomeros', singular: 'Plomero', servicio: 'Plomería', icon: 'Droplets' },
  { id: 'costurera', plural: 'Costureras', singular: 'Costurera', servicio: 'Costura', icon: 'Scissors' },
  { id: 'carpintero', plural: 'Carpinteros', singular: 'Carpintero', servicio: 'Carpintería', icon: 'Hammer' },
  { id: 'pintor', plural: 'Pintores', singular: 'Pintor', servicio: 'Pintura', icon: 'PaintRoller' },
  { id: 'jardinero', plural: 'Jardineros', singular: 'Jardinero', servicio: 'Jardinería', icon: 'Leaf' },
  { id: 'albanil', plural: 'Albañiles', singular: 'Albañil', servicio: 'Albañilería', icon: 'HardHat' },
]

export const BARRIOS = ['Banda Norte', 'Alberdi', 'Las Delicias', 'Fénix', 'Bimaco', 'Obrero', 'Villa Golf', 'Macrocentro']

export const PAGOS = ['Efectivo', 'Transferencia', 'Mercado Pago']

// Barrios que existieron en versiones anteriores: se migran para no romper datos guardados en el navegador
export const BARRIOS_ANTERIORES = { 'Jardín': 'Bimaco', 'Los Almendros': 'Macrocentro' }

export const URGENCIAS = [
  { id: 'hoy', label: 'Es urgente, para hoy' },
  { id: 'semana', label: 'Esta semana' },
  { id: 'sinapuro', label: 'Sin apuro' },
]

const r = (autor, barrio, estrellas, texto) => ({ autor, barrio, estrellas, texto })

// Datos ficticios con fines demostrativos
export const SEED_WORKERS = [
  {
    id: 'carlos-rodriguez', nombre: 'Carlos Rodríguez', oficio: 'gasista', barrio: 'Banda Norte', telefono: '3584000101',
    matriculado: true, trueque: { busca: 'electricista' }, experiencia: 15, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a sábado, de 8 a 18 h',
    descripcion: 'Instalación y reparación de gas natural y envasado. Pérdidas, estufas, calefones y cocinas.',
    reviews: [
      r('Marta', 'Alberdi', 5, 'Vino puntual, resolvió la pérdida de gas y dejó todo limpio. Muy recomendable.'),
      r('Jorge', 'Banda Norte', 5, 'Honesto con el precio y explicó todo lo que hacía. Lo volvería a llamar.'),
      r('Lidia', 'Fénix', 4, 'Muy buen trabajo con el calefón. Llegó un poco tarde pero avisó.'),
    ],
  },
  {
    id: 'roberto-sosa', nombre: 'Roberto Sosa', oficio: 'gasista', barrio: 'Banda Norte', telefono: '3584000102',
    matriculado: true, trueque: null, experiencia: 9, pagos: ['Efectivo', 'Mercado Pago'],
    disponibilidad: 'Lunes a viernes, de 9 a 17 h',
    descripcion: 'Gasista matriculado. Instalaciones nuevas, habilitaciones y revisión de artefactos.',
    reviews: [
      r('Nora', 'Banda Norte', 5, 'Prolijo y rápido. Me dejó la instalación funcionando perfecto.'),
      r('Carlos', 'Obrero', 4, 'Buen trabajo y buen trato.'),
    ],
  },
  {
    id: 'pablo-gimenez', nombre: 'Pablo Giménez', oficio: 'gasista', barrio: 'Fénix', telefono: '3584000103',
    matriculado: false, trueque: { busca: 'carpintero' }, experiencia: 6, pagos: ['Efectivo'],
    disponibilidad: 'Todos los días, de 10 a 19 h',
    descripcion: 'Reparación de pérdidas y cambio de flexibles. Acepto trueque por trabajos de carpintería.',
    reviews: [r('Elsa', 'Fénix', 4, 'Resolvió el problema el mismo día. Gente de confianza.')],
  },
  {
    id: 'diego-pereira', nombre: 'Diego Pereira', oficio: 'electricista', barrio: 'Las Delicias', telefono: '3584000104',
    matriculado: true, trueque: { busca: 'costurera' }, experiencia: 12, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a sábado, de 8 a 20 h',
    descripcion: 'Instalaciones eléctricas, tableros, cortocircuitos y luminarias. Presupuesto sin cargo.',
    reviews: [
      r('Raquel', 'Las Delicias', 5, 'Encontró la falla en minutos. Muy profesional y amable.'),
      r('Tomás', 'Bimaco', 5, 'Instaló todas las luces nuevas y dejó prolijo.'),
    ],
  },
  {
    id: 'hugo-alvarez', nombre: 'Hugo Álvarez', oficio: 'electricista', barrio: 'Banda Norte', telefono: '3584000105',
    matriculado: true, trueque: null, experiencia: 20, pagos: ['Efectivo', 'Transferencia', 'Mercado Pago'],
    disponibilidad: 'Lunes a viernes, de 7 a 16 h',
    descripcion: 'Electricista matriculado con más de 20 años de experiencia en casas y comercios del barrio.',
    reviews: [r('Susana', 'Banda Norte', 5, 'El mejor que tuve. Explica con paciencia y cobra lo justo.')],
  },
  {
    id: 'silvia-ledesma', nombre: 'Silvia Ledesma', titulo: 'Plomera', oficio: 'plomero', barrio: 'Banda Norte', telefono: '3584000106',
    matriculado: true, trueque: { busca: 'pintor' }, experiencia: 8, pagos: ['Efectivo', 'Mercado Pago'],
    disponibilidad: 'Lunes a sábado, de 8 a 18 h',
    descripcion: 'Destapes, cambio de canillas, tanques y cañerías. Trabajo limpio y con garantía.',
    reviews: [
      r('Beatriz', 'Alberdi', 5, 'Llegó en una hora y arregló la pérdida de la cocina. Excelente.'),
      r('Mario', 'Banda Norte', 4, 'Muy buena atención y precio justo.'),
    ],
  },
  {
    id: 'nelida-bustos', nombre: 'Nélida Bustos', oficio: 'costurera', barrio: 'Banda Norte', telefono: '3584000107',
    matriculado: false, trueque: { busca: 'electricista' }, experiencia: 25, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a viernes, de 9 a 18 h',
    descripcion: 'Arreglos de ropa, dobladillos, cierres y confección a medida. Cortinas y mantelería.',
    reviews: [r('Rosa', 'Banda Norte', 5, 'Me dejó el vestido como nuevo. Un amor de persona.')],
  },
  {
    id: 'marta-rios', nombre: 'Marta Ríos', oficio: 'costurera', barrio: 'Alberdi', telefono: '3584000108',
    matriculado: false, trueque: null, experiencia: 11, pagos: ['Efectivo'],
    disponibilidad: 'Martes a sábado, de 10 a 17 h',
    descripcion: 'Costura y arreglos en general. Uniformes escolares y ropa de trabajo.',
    reviews: [r('Pedro', 'Alberdi', 4, 'Rápida y prolija con los uniformes de mis hijos.')],
  },
  {
    id: 'julian-paz', nombre: 'Julián Paz', oficio: 'carpintero', barrio: 'Bimaco', telefono: '3584000109',
    matriculado: false, trueque: { busca: 'plomero' }, experiencia: 14, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a sábado, de 8 a 17 h',
    descripcion: 'Muebles a medida, puertas, ventanas y reparaciones de madera.',
    reviews: [r('Gladys', 'Bimaco', 5, 'Hizo una biblioteca hermosa y a buen precio.')],
  },
  {
    id: 'raul-medina', nombre: 'Raúl Medina', oficio: 'pintor', barrio: 'Obrero', telefono: '3584000110',
    matriculado: false, trueque: null, experiencia: 10, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a sábado, de 8 a 18 h',
    descripcion: 'Pintura de interiores y exteriores, impermeabilizantes y revestimientos.',
    reviews: [r('Cristina', 'Obrero', 4, 'Pintó toda la casa en tres días. Muy limpio.')],
  },
  {
    id: 'ana-torres', nombre: 'Ana Torres', titulo: 'Jardinera', oficio: 'jardinero', barrio: 'Villa Golf', telefono: '3584000111',
    matriculado: false, trueque: { busca: 'pintor' }, experiencia: 7, pagos: ['Efectivo', 'Mercado Pago'],
    disponibilidad: 'Martes a sábado, de 8 a 15 h',
    descripcion: 'Corte de pasto, poda, armado de canteros y mantenimiento de jardines.',
    reviews: [],
  },
  {
    id: 'esteban-vega', nombre: 'Esteban Vega', oficio: 'albanil', barrio: 'Macrocentro', telefono: '3584000112',
    matriculado: true, trueque: null, experiencia: 18, pagos: ['Efectivo', 'Transferencia'],
    disponibilidad: 'Lunes a viernes, de 7 a 17 h',
    descripcion: 'Arreglos de mampostería, revoques, pisos y ampliaciones pequeñas.',
    reviews: [r('Daniel', 'Macrocentro', 5, 'Hizo la ampliación del patio con mucho cuidado. Cumplió con los tiempos.')],
  },
]

// Pedidos de trabajo de ejemplo (datos ficticios): los publican empleadores y los ven los empleados
export const SEED_PEDIDOS = [
  { id: 'p1', oficio: 'plomero', barrio: 'Bimaco', urgencia: 'hoy', titulo: 'Pérdida de agua en el baño',
    descripcion: 'Gotea la canilla de la ducha y hay humedad en la pared.', contacto: 'Graciela M.', telefono: '3584000201', fecha: '2026-11-12' },
  { id: 'p2', oficio: 'pintor', barrio: 'Macrocentro', urgencia: 'semana', titulo: 'Pintar living y comedor',
    descripcion: 'Departamento de 2 ambientes. Las paredes ya están lijadas.', contacto: 'Estudio Contable Ferreyra', telefono: '3584000202', fecha: '2026-11-11' },
  { id: 'p3', oficio: 'electricista', barrio: 'Banda Norte', urgencia: 'semana', titulo: 'Cambiar tablero y agregar tomas',
    descripcion: 'Casa de dos plantas, necesito tablero nuevo y tres tomas en la cocina.', contacto: 'Familia Aguirre', telefono: '3584000203', fecha: '2026-11-10' },
  { id: 'p4', oficio: 'costurera', barrio: 'Alberdi', urgencia: 'sinapuro', titulo: 'Arreglar cortinas y cojines',
    descripcion: 'Seis cortinas para acortar y cuatro fundas de cojín.', contacto: 'Lucía R.', telefono: '3584000204', fecha: '2026-11-09' },
  { id: 'p5', oficio: 'jardinero', barrio: 'Villa Golf', urgencia: 'sinapuro', titulo: 'Poda de árboles y corte de pasto',
    descripcion: 'Patio grande, dos paraísos para podar.', contacto: 'Sergio B.', telefono: '3584000205', fecha: '2026-11-08' },
  { id: 'p6', oficio: 'albanil', barrio: 'Macrocentro', urgencia: 'semana', titulo: 'Arreglar revoque de la medianera',
    descripcion: 'Local comercial, hay que reparar unos 6 m² de revoque.', contacto: 'Panadería La Espiga', telefono: '3584000206', fecha: '2026-11-12' },
]
