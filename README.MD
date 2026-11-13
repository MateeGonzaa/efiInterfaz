Oficios Barriales: documentación del proyecto
Aplicación web para encontrar gasistas, electricistas, plomeros, costureras y otros oficios en el barrio, en Río Cuarto, Córdoba. Prototipo con datos ficticios.
1. Descripción general
Oficios Barriales conecta a vecinos que necesitan un arreglo con vecinos que tienen un oficio. Cada trabajador tiene una ficha con su barrio, experiencia, disponibilidad, formas de pago y opiniones de otros vecinos. El contacto es directo, por teléfono o WhatsApp.
La app también permite pagar un trabajo (de forma simulada), intercambiar servicios mediante trueque y registrarse como empleado o empleador.
2. Problema y objetivos
Problema: encontrar a alguien de confianza para un arreglo en casa suele depender de recomendaciones informales, y quienes tienen un oficio no tienen un lugar donde mostrarse.
Objetivos:
• Facilitar que los vecinos encuentren oficios cerca de su casa.
• Dar visibilidad a trabajadores independientes del barrio.
• Generar confianza mediante opiniones y matrícula al día.
• Permitir otras formas de acuerdo, como el trueque de servicios.
• Ofrecer una interfaz clara, con botones grandes y textos simples, pensada también para personas mayores.
3. Tecnologías utilizadas
Tecnología
Uso
React 18
Interfaz y componentes
Vite 5
Servidor de desarrollo y compilación
React Router 6 (HashRouter)
Navegación entre pantallas
Tailwind CSS 3
Estilos y sistema de diseño
lucide-react
Íconos
localStorage
Guardado de datos en el navegador
Fuente Inter
Tipografía
No tiene servidor ni base de datos: todo se guarda en el navegador de quien usa la app.
4. Funcionalidades
4.1 Inicio
Banner de bienvenida con buscador de texto y selector de barrio, contadores (vecinos, oficios y barrios), grilla de los 8 oficios, los tres vecinos mejor valorados del barrio elegido, sección "Cómo funciona" y acceso al trueque.
4.2 Buscar
Directorio de vecinos con filtros por oficio, barrio, búsqueda por texto y tipo (todos, con matrícula, con trueque). Los resultados se ordenan por calificación.
4.3 Ficha del vecino
Datos del trabajador, calificación promedio, insignias de "Matrícula al día" y "Acepta trueque", botones para llamar o escribir por WhatsApp, formas de pago y opiniones. Cualquier persona puede dejar una opinión con estrellas. En desktop se muestra en dos columnas.
4.4 Trueque de servicios
Lista de vecinos que cambian su trabajo por otro oficio, con filtro por lo que buscan y botón para proponer el intercambio por WhatsApp.
4.5 Pagos de servicios
Formulario para pagarle a un vecino: se elige a quién, el monto, un detalle opcional y el medio de pago (solo los que ese vecino acepta: efectivo, transferencia o Mercado Pago). Al pagar se genera un comprobante con número de operación y queda un historial con el total. Es una simulación: no se mueve dinero real.
4.6 Perfil
Selector entre dos roles:
• Empleado: publica su oficio con nombre, oficio, barrio, WhatsApp, descripción, si acepta trueque y si tiene matrícula. Puede ver cómo lo ven los demás o quitar su perfil. También ve los pedidos de trabajo de su oficio en su barrio.
• Empleador: publica pedidos de trabajo (oficio, barrio, título, detalles y urgencia), los administra y puede ir directo al listado de vecinos de ese oficio.
5. Estructura del proyecto
oficios-barriales/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── public/favicon.svg
└── src/
    ├── main.jsx
    ├── App.jsx              rutas y títulos
    ├── index.css            estilos base y componentes
    ├── context/AppContext.jsx   estado global
    ├── data/seed.js         oficios, barrios y datos de ejemplo
    ├── components/
    │   ├── Layout.jsx       barras de navegación y pie
    │   └── ui.jsx           logo, tarjetas, estrellas, botones
    └── pages/
        ├── Inicio.jsx
        ├── Buscar.jsx
        ├── Vecino.jsx
        ├── Trueque.jsx
        ├── Pagos.jsx
        └── MiPerfil.jsx
6. Rutas
Ruta
Pantalla
/
Inicio
/buscar
Directorio con filtros
/vecino/:id
Ficha de un vecino
/trueque
Trueque de servicios
/pagos
Pagos de servicios
/mi-perfil
Perfil de empleado o empleador
Las rutas anteriores /sumate y /perfil/:id redirigen a las nuevas.
7. Datos y estado
Datos de ejemplo (seed.js): 8 oficios (gasista, electricista, plomero, costurera, carpintero, pintor, jardinero y albañil), 8 barrios (Banda Norte, Alberdi, Las Delicias, Fénix, Bimaco, Obrero, Villa Golf y Macrocentro), 12 vecinos ficticios con reseñas y 6 pedidos de trabajo de ejemplo.
Estado global (AppContext): guarda en localStorage el barrio elegido, los perfiles creados, las opiniones nuevas, el usuario y su rol, los pedidos propios y los pagos. Si el navegador tenía guardado un barrio de una versión anterior (Jardín o Los Almendros), se convierte automáticamente a Bimaco o Macrocentro.
Calificaciones: el promedio de estrellas se calcula a partir de todas las opiniones, las de ejemplo y las nuevas.
8. Diseño
• Paleta: crema (#F7F2E9) de fondo, verde bosque (#1F4D3A) como color principal, terracota (#C2552D) para acciones destacadas y trueque, y verde de llamada (#16803F) para contactar.
• Tipografía: Inter, con texto base de 18 px para que sea fácil de leer.
• Logo: un pin de barrio con una tuerca adentro, que une "oficio" con "en tu barrio".
• Navegación: barra inferior en celulares (Inicio, Buscar, Pagos y Perfil) y barra superior en pantallas grandes.
• Responsive: los listados pasan de 1 a 2 y 3 columnas, y la ficha del vecino se divide en dos columnas en desktop.
• Accesibilidad: botones de al menos 52 px, foco visible, etiquetas para lectores de pantalla, mensajes de error claros y respeto por la preferencia de reducir animaciones.
9. Cómo ejecutarlo
1.  Instalar Node.js (versión 18 o superior).
2.  En la carpeta del proyecto, ejecutar npm install.
3.  Ejecutar npm run dev y abrir la dirección que indica la terminal.
4.  Para generar la versión final, ejecutar npm run build; el resultado queda en la carpeta dist.
10. Limitaciones y trabajo futuro
• Los datos se guardan solo en el navegador y no se comparten entre personas. El siguiente paso sería agregar un servidor y una base de datos.
• El pago es una simulación; habría que integrar un medio de pago real, como Mercado Pago.
• Falta un inicio de sesión para verificar la identidad de cada usuario.
• Las opiniones no se validan: cualquiera puede dejar una. Se podría permitirlas solo a quienes contrataron al vecino.
• Ideas futuras: mapa de barrios, notificaciones de nuevos pedidos, fotos de trabajos realizados y verificación de matrículas.
11. Aclaración
Todos los nombres, teléfonos, opiniones y pedidos son ficticios y están incluidos solo con fines demostrativos.