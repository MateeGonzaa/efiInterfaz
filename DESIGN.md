# Oficios Barriales · Documento de diseño

Proyecto E.F.I. · Interfaz de Usuario 2026 · Lucas Aruza y Mateo González · Río Cuarto, Córdoba

Este documento explica **qué se diseñó y por qué**: el problema, a quién va dirigido, la identidad de marca, el sistema visual, la estructura de navegación, cada pantalla, la accesibilidad y las decisiones que tomamos. Cada valor citado (colores, tamaños, rutas) sale del código del proyecto; los archivos de referencia están al final.

## Índice

1. [Contexto y objetivos](#1-contexto-y-objetivos)
2. [Usuarios y principios de diseño](#2-usuarios-y-principios-de-diseño)
3. [Identidad de marca](#3-identidad-de-marca)
4. [Color](#4-color)
5. [Tipografía](#5-tipografía)
6. [Forma, espacio y elevación](#6-forma-espacio-y-elevación)
7. [Componentes](#7-componentes)
8. [Iconografía](#8-iconografía)
9. [Arquitectura de información y navegación](#9-arquitectura-de-información-y-navegación)
10. [Pantallas](#10-pantallas)
11. [Diseño responsivo](#11-diseño-responsivo)
12. [Accesibilidad](#12-accesibilidad)
13. [Conceptos de UX aplicados](#13-conceptos-de-ux-aplicados)
14. [Voz y redacción](#14-voz-y-redacción)
15. [Estados de la interfaz](#15-estados-de-la-interfaz)
16. [Datos y persistencia](#16-datos-y-persistencia)
17. [Decisiones y compensaciones](#17-decisiones-y-compensaciones)
18. [Limitaciones conocidas del diseño](#18-limitaciones-conocidas-del-diseño)
19. [Archivos de referencia](#19-archivos-de-referencia)

---

## 1. Contexto y objetivos

### El problema

Ante una urgencia en casa, conseguir a alguien de confianza depende de tres cosas poco confiables:

- **Boca en boca:** recomendaciones sueltas, difíciles de encontrar cuando se necesitan.
- **Redes desordenadas:** grupos de Facebook y estados de WhatsApp, sin ubicación, sin filtros y sin forma de comparar.
- **Oficios sin vidriera:** quien trabaja bien pero no paga publicidad no tiene dónde mostrar su experiencia, su matrícula ni su disponibilidad.

> **Pregunta de diseño:** ¿cómo conectamos a vecinos que necesitan un servicio con vecinos que tienen un oficio?

### La propuesta

Una aplicación web **hiperlocal** (Río Cuarto, Córdoba), de una sola página (SPA), con 8 oficios y 8 barrios, de uso **gratuito y sin registro para buscar**. El contacto es directo, por llamada o WhatsApp.

La presentamos como producto de una empresa ficticia, **Raíz Digital Estudio** (desarrollo web y diseño centrado en el usuario, rubro *CivicTech*, economía colaborativa e intermediación hiperlocal de servicios).

### Objetivos de diseño

| # | Objetivo | Cómo lo medimos en el prototipo |
|---|---|---|
| 1 | Contactar a un vecino en pocos toques | Desde el inicio: elegir oficio → ver la ficha → *Llamar* o *WhatsApp* |
| 2 | Generar confianza antes de contactar | Matrícula, medios de pago, estrellas y reseñas visibles en la tarjeta |
| 3 | Que lo use cualquier persona, incluidas las mayores | Texto base de 18 px, botones de 52 px, lenguaje cotidiano |
| 4 | Dar vidriera gratuita a todos los barrios | Cualquier vecino publica su oficio sin costo desde *Mi perfil* |
| 5 | Funcionar bien en el celular | Diseño pensado primero para celular (*mobile-first*) |

## 2. Usuarios y principios de diseño

### Personas destinatarias

| Perfil | Necesidad | Qué le ofrecemos |
|---|---|---|
| **Vecino con una urgencia** (puede ser una persona mayor) | Encontrar rápido a alguien cercano y de confianza | Búsqueda por oficio y barrio, texto grande, contacto directo |
| **Trabajador independiente** (empleado) | Mostrar su experiencia y conseguir clientes sin pagar publicidad | Perfil público, insignias, agenda, presupuestos |
| **Empleador** (hogar o pequeño negocio) | Publicar un pedido y que lo vean los oficios de la zona | Pedidos con nivel de urgencia, por barrio |

### Principios

1. **Cercanía primero.** Todo se organiza por barrio, no por ciudad.
2. **Cero fricción.** Sin registro, sin descargas. Buscar y contactar sin crear una cuenta.
3. **Confianza visible.** La información que reduce el riesgo (matrícula, estrellas, medios de pago) aparece donde se decide, no escondida.
4. **Grande y claro.** Mejor un botón de más tamaño que un detalle fino. Se diseña para el dedo y para la vista cansada.
5. **No inventar lo que ya existe.** Usamos teléfono y WhatsApp, que la gente ya conoce, en lugar de un chat propio.
6. **Prevenir antes que corregir.** Se limitan las opciones para que sea difícil equivocarse.

## 3. Identidad de marca

### Nombre

**Oficios Barriales**: dice qué es (*oficios*) y para quién (*barriales*), en dos palabras y sin tecnicismos.

### Logo

El ícono es un **pin de mapa con una tuerca adentro**:

- El **pin** representa la cercanía al barrio.
- La **tuerca** representa el trabajo técnico y los oficios.
- La **línea inferior** terracota funciona como suelo o calle y da al conjunto un apoyo visual.

El isotipo es un vector SVG sobre una grilla de **48 × 48** con esquinas redondeadas (radio 13). Está construido con formas simples para que se lea desde el favicon (16 px) hasta íconos de tienda (1024 px).

| Elemento | Forma | Color |
|---|---|---|
| Fondo | Cuadrado redondeado 48 × 48, radio 13 | Verde bosque `#1F4D3A` |
| Pin | Gota de 25 px de ancho, punta hacia abajo | Crema `#F7F2E9` |
| Tuerca | Hexágono centrado en el pin | Terracota `#C2552D` |
| Agujero de la tuerca | Círculo de radio 2,7 | Crema `#F7F2E9` |
| Línea de apoyo | Trazo de 2,4 con terminación redondeada | Terracota `#C2552D` |

### Variantes y uso

| Variante | Dónde se usa | Archivo o componente |
|---|---|---|
| **Isotipo** (solo el ícono) | Favicon, íconos pequeños | `public/favicon.svg`, `LogoMark` en `ui.jsx` |
| **Horizontal** (ícono + "Oficios / Barriales") | Cabecera, pie de página y logo del README | `public/logo.svg`, `Logo` en `ui.jsx` |
| **Apilado** y **monocromático** | Previstos para comprobantes y material impreso | Definidos en la presentación; ver [limitaciones](#18-limitaciones-conocidas-del-diseño) |

Reglas de uso del logo horizontal: el nombre se compone en dos líneas, **"Oficios"** en 17 px negrita y **"Barriales"** en 13 px de peso medio en gris. El logo es siempre un enlace al inicio, con `aria-label="Oficios Barriales, ir al inicio"`.

### Personalidad

Cálido, cercano y confiable. El fondo crema da calidez, el verde bosque transmite seriedad y confianza, y la terracota aporta energía de oficio y de barrio.

## 4. Color

Los colores están definidos como *tokens* en `tailwind.config.js`, por lo que no se usan valores sueltos en los componentes.

### Paleta

| Token | Hex | Rol |
|---|---|---|
| `cream` | `#F7F2E9` | Fondo general de la aplicación |
| `forest` | `#1F4D3A` | Color primario: confianza, botones principales, títulos de marca |
| `forest-dark` | `#173B2C` | Estado *hover* del primario |
| `mint` | `#E2EDE6` | Superficies suaves y estado activo de la navegación |
| `terra` | `#C2552D` | Acentos y trueque; acciones destructivas livianas |
| `terra-dark` | `#A8451F` | Estado *hover* de acentos |
| `terra-soft` | `#F7E3DA` | Fondo de insignias de trueque y estado *pendiente* |
| `call` | `#16803F` | **Solo** botones de contacto (llamar y WhatsApp) |
| `call-dark` | `#126A34` | Estado *hover* de los botones de contacto |
| `ink` | `#1E2420` | Texto principal |
| `muted` | `#5A655E` | Texto secundario |
| `line` | `#E2DACB` | Bordes y separadores |
| `star` | `#E5A100` | Estrellas de calificación |

### Reglas de uso

- **Verde bosque** es el color de la marca y de la acción principal (*Reservar turno*, *Guardar presupuesto*, *Pagar*).
- **Verde llamada** está reservado a los botones de contacto. Que un verde distinto signifique siempre "hablar con alguien" hace que ese botón se reconozca de inmediato.
- **Terracota** marca lo que es alternativo o personal: trueque, favoritos (el corazón), estados pendientes y mensajes de error.
- **Menta** indica dónde estás (pestaña activa) y suaviza superficies.
- Los **estados** nunca dependen solo del color: llevan texto (*pendiente*, *confirmado*, *hecho*) o ícono.

### Contraste (WCAG 2.1)

Relaciones de contraste calculadas con la fórmula de WCAG. El mínimo es 4,5:1 para texto normal y 3:1 para texto grande y componentes de interfaz.

| Combinación | Contraste | Resultado |
|---|---|---|
| Texto `ink` sobre `cream` | 14,2:1 | Cumple AAA |
| Texto `ink` sobre blanco | 15,8:1 | Cumple AAA |
| Texto `muted` sobre `cream` | 5,5:1 | Cumple AA |
| Texto `muted` sobre blanco | 6,1:1 | Cumple AA |
| Texto `muted` sobre `mint` | 5,1:1 | Cumple AA |
| Blanco sobre `forest` | 9,6:1 | Cumple AAA |
| `forest` sobre `mint` | 8,0:1 | Cumple AAA |
| Blanco sobre `call` | 5,0:1 | Cumple AA |
| `call` sobre blanco (botón *outline*) | 5,0:1 | Cumple AA |
| `terra` sobre blanco | 4,5:1 | Cumple AA (justo en el límite) |
| `terra` sobre `terra-soft` | 3,7:1 | **No cumple** para texto pequeño (ver [limitaciones](#18-limitaciones-conocidas-del-diseño)) |
| `line` sobre blanco (borde de campos) | 1,4:1 | **No cumple** el 3:1 para componentes (ver limitaciones) |

## 5. Tipografía

**Familia:** [Inter](https://rsms.me/inter/), cargada desde Google Fonts en pesos 400, 500, 600 y 700, con `system-ui` y `sans-serif` como respaldo. Es una fuente pensada para pantallas, con letras abiertas y números claros, buena para texto grande y para precios.

### Escala

| Uso | Tamaño | Peso | Clase |
|---|---|---|---|
| Título de pantalla (`h1`) | 30 px en celular, 38 px desde 768 px | 700 | `.h1` |
| Título de bienvenida (inicio) | 32 px celular, 44 px escritorio | 700 | |
| Título de sección (`h2`) | 20 px celular, 24 px desde 768 px | 600 | `.h2` |
| **Texto base** | **18 px**, interlineado compacto | 400 | `body` |
| Texto de botones y campos | 16 px | 600 / 400 | `.btn`, `.field` |
| Etiquetas de campos | 14 px | 500 | `.label` |
| Texto secundario y metadatos | 14 px | 400 | `text-sm text-muted` |
| Etiquetas de la barra inferior | 11 px (12 px desde 640 px) | 500 | |

### Criterios

- **Base de 18 px** (en lugar de los 16 px habituales) para mejorar la lectura en personas mayores.
- El texto de menos de 14 px se limita a las etiquetas de la barra inferior, que siempre van acompañadas de un ícono de 24 px.
- Montos y totales se destacan en negrita y color primario (`text-forest`), con formato argentino (`$25.000`).

## 6. Forma, espacio y elevación

### Radios de esquina

| Elemento | Radio |
|---|---|
| Botones, campos, pestañas | `rounded-xl` (12 px) |
| Tarjetas | `rounded-2xl` (16 px) |
| Bloques de bienvenida (*hero*) | `rounded-3xl` (24 px) |
| Chips, insignias y avatares | `rounded-full` |

### Espaciado

Se usa la escala de 4 px de Tailwind. Las pantallas se organizan con `space-y-*` para que el ritmo vertical sea uniforme.

| Contexto | Valor |
|---|---|
| Margen lateral del contenido | 20 px en celular, 32 px desde 768 px |
| Ancho máximo del contenido | `max-w-6xl` (1152 px), centrado |
| Aire superior de cada pantalla | 20 px celular, 32 a 40 px escritorio |
| Reserva inferior en celular | 7 rem + área segura, para que la barra inferior no tape contenido |
| Separación entre tarjetas en grillas | 16 px |

### Elevación

Una sombra base, `shadow-soft`: muy suave, con dos capas de baja opacidad (`0 1px 2px` y `0 4px 16px`). Las tarjetas interactivas suben 2 px al pasar el cursor (`-translate-y-0.5`) y toman una sombra un poco más marcada. El diseño se apoya más en el borde (`line`) que en la sombra, para que se vea limpio sobre el fondo crema.

## 7. Componentes

Los estilos reutilizables viven en `src/index.css` (capa `components`) y los componentes de React en `src/components/ui.jsx`.

### Botones (`.btn`)

Todos comparten: alto mínimo de **52 px**, esquinas de 12 px, texto de 16 px en semibold, ícono opcional a la izquierda, feedback al presionar (`scale-[.98]`) y opacidad reducida al deshabilitarse.

| Variante | Aspecto | Cuándo se usa |
|---|---|---|
| `.btn-forest` | Fondo verde bosque, texto blanco | Acción principal de una pantalla |
| `.btn-call` | Fondo verde llamada, texto blanco | **Llamar** por teléfono |
| `.btn-outline` | Borde y texto verde llamada, fondo blanco | **WhatsApp**, acción secundaria de contacto |
| `.btn-outline-forest` | Borde y texto verde bosque, fondo blanco | Acción secundaria (*Dejar mi opinión*, *Ver todos*) |
| `.btn-white` | Fondo blanco, texto verde bosque | Acciones sobre fondos de color (banner de trueque) |
| Terracota (`bg-terra`) | Fondo terracota, texto blanco | *Buscar* en la bienvenida del inicio, sobre el fondo verde |

### Campos de formulario (`.field`, `.label`)

- Alto mínimo de 52 px, borde `line`, esquinas de 12 px, fondo blanco.
- Cada campo tiene una **etiqueta visible** (`.label`, 14 px) enlazada con `htmlFor`/`id`. No se usa el *placeholder* como única etiqueta.
- Los `select` truncan el texto con puntos suspensivos y reservan espacio para la flecha.
- El *placeholder* da un ejemplo concreto ("Ej: pérdida, tablero, cortinas…", "Ej: 25000").
- Al recibir el foco, el borde pasa a verde bosque y aparece un anillo (ver [accesibilidad](#12-accesibilidad)).

### Chips (`.chip`)

Botones redondeados de 44 px de alto mínimo para filtros y acciones secundarias. En estado activo (`aria-pressed="true"`) se invierten: fondo verde bosque y texto blanco. Se usan en los filtros de *Buscar* (Todos, Con matrícula, Trueque), en el medio de pago y en las acciones de turnos y presupuestos.

### Control segmentado (`.seg`, `.seg-btn`)

Dos opciones lado a lado (alto de 52 px) para elegir el rol en *Mi perfil*: **empleado** o **empleador**. La opción activa se rellena de verde bosque.

### Tarjeta (`.card`)

Fondo blanco, borde `line`, radio de 16 px y `shadow-soft`. Es el contenedor de casi todo el contenido: vecinos, turnos, presupuestos, pagos, formularios y estados vacíos.

### Tarjeta de vecino (`WorkerCard`)

Es la pieza central de la aplicación. De arriba hacia abajo:

1. Botón de **favorito** (corazón) en la esquina superior derecha.
2. **Avatar** con iniciales + nombre en negrita + oficio y barrio. Todo el bloque es un enlace a la ficha.
3. **Calificación** con estrella, promedio y cantidad de opiniones, o "Todavía sin opiniones".
4. **Insignias** (si corresponde): *Matrícula al día* y *Acepta trueque*.
5. **Botones de contacto**: *Llamar* y *WhatsApp*, en dos columnas.

### Otras piezas

| Componente | Descripción |
|---|---|
| `Avatar` | Círculo menta con las iniciales del nombre en verde bosque; es decorativo (`aria-hidden`) |
| `Rating` | Estrella rellena + promedio con coma decimal (`4,7`) + "N opiniones de vecinos" |
| `Stars` | Cinco estrellas con `role="img"` y `aria-label="4 de 5 estrellas"` |
| `Badge` | Insignia redondeada: *Matrícula al día* (menta, verde bosque, ícono de tilde) o *Acepta trueque* (terracota suave, ícono de intercambio) |
| `ContactButtons` | Variante compacta (dos columnas) y variante grande (ancho completo, texto de 18 px) para la ficha |
| `FavButton` | Botón de 44 px con `aria-pressed` y etiqueta que cambia entre "Guardar en favoritos" y "Quitar de favoritos" |

### Mensajes de error

Se muestran **debajo del campo**, en terracota, con `role="alert"` para que los lectores de pantalla los anuncien. Dicen qué hacer, no qué salió mal: *"Elegí a quién le pagás."*, *"Escribí tu número con código de área, por ejemplo 358 123 4567."*

## 8. Iconografía

Íconos de [lucide-react](https://lucide.dev/): trazo lineal uniforme, coherente con las esquinas redondeadas del sistema. Son decorativos (`aria-hidden="true"`) cuando acompañan texto.

Tamaños habituales: 16 px en insignias y chips, 20 px en botones, 24 px en la navegación inferior y en las tarjetas de acceso.

### Oficios

| Oficio | Servicio | Ícono |
|---|---|---|
| Gasista | Gas | `Flame` |
| Electricista | Electricidad | `Zap` |
| Plomero | Plomería | `Droplets` |
| Costurera | Costura | `Scissors` |
| Carpintero | Carpintería | `Hammer` |
| Pintor | Pintura | `PaintRoller` |
| Jardinero | Jardinería | `Leaf` |
| Albañil | Albañilería | `HardHat` |

Si un oficio no tuviera ícono asignado, se usa una llave (`Wrench`) por defecto.

### Medios de pago

| Medio | Ícono |
|---|---|
| Efectivo | `Banknote` |
| Transferencia | `Landmark` |
| Mercado Pago | `Smartphone` |

## 9. Arquitectura de información y navegación

### Mapa de la aplicación (9 secciones)

```
Oficios Barriales
├── Inicio ............ buscador, barrio y oficios
├── Buscar ............ directorio con filtros
│   └── Ficha del vecino ... opiniones y contacto
├── Agenda ............ turnos con estados
├── Pagos ............. comprobante e historial
└── Panel ............. resumen y favoritos
    ├── Presupuestos .. total automático
    ├── Mi perfil ..... empleado / empleador
    └── Trueque ....... intercambio de oficios
```

### Navegación principal: 5 pestañas

Se decidió limitar la navegación principal a **cinco** destinos, el máximo cómodo para una barra inferior en el celular. Las secciones secundarias se agrupan bajo **Panel**.

| Pestaña | Ícono | Se marca como activa en… |
|---|---|---|
| Inicio | `Home` | `/` |
| Buscar | `Search` | `/buscar` y `/vecino/:id` |
| Agenda | `CalendarDays` | `/agenda` |
| Pagos | `Wallet` | `/pagos` |
| Panel | `LayoutDashboard` | `/panel`, `/presupuestos`, `/mi-perfil` y `/trueque` |

- **Estado actual:** la pestaña activa lleva fondo menta y texto verde bosque, y `aria-current="page"` para lectores de pantalla.
- **Dónde está cada cosa:** el *Trueque* se llega desde el inicio, desde *Pagos* ("¿Preferís pagar con tu trabajo?") y desde el *Panel*.
- **En celular** la navegación va abajo, al alcance del pulgar; **en escritorio** va arriba, junto al logo.

### Rutas y enlaces antiguos

La app usa `HashRouter` (las rutas se escriben después de `#`), de modo que funciona en cualquier hosting estático sin configurar el servidor.

| Ruta | Pantalla |
|---|---|
| `/` | Inicio |
| `/buscar` (`?oficio=`, `?q=`, `?f=`) | Directorio con filtros |
| `/vecino/:id` | Ficha de un vecino |
| `/trueque` | Trueque |
| `/pagos` | Pagos |
| `/mi-perfil` | Perfil de empleado o empleador |
| `/panel` | Panel |
| `/agenda` | Agenda |
| `/presupuestos` | Presupuestos |
| `/sumate` → `/mi-perfil` | Redirección de un enlace de versiones anteriores |
| `/perfil/:id` → `/buscar` | Redirección de un enlace de versiones anteriores |
| `*` | Pantalla "No encontramos esa página" con botón *Volver al inicio* |

Los filtros de *Buscar* viven en la URL, de modo que una búsqueda se puede **compartir o recuperar con el botón Atrás**. Al cambiar de pantalla, la página vuelve arriba y el título de la pestaña del navegador se actualiza ("Pagos de servicios · Oficios Barriales").

### Flujos principales

**Contratar a un vecino (flujo central)**

```
Inicio → elegir oficio (o escribir en el buscador) → Buscar (filtrar) → Ficha del vecino
      → Llamar / WhatsApp        (contacto directo)
      → Agenda → reservar turno → confirmar → descargar al calendario
      → Pagos → elegir medio → comprobante → Dejar mi opinión
```

**Publicar un oficio (empleado)**

```
Panel → Mi perfil → elegir "empleado" → completar el formulario → perfil publicado
      → ver pedidos de su oficio y barrio → contactar por WhatsApp
```

**Publicar un pedido (empleador)**

```
Panel → Mi perfil → elegir "empleador" → describir el trabajo + urgencia → pedido publicado
```

## 10. Pantallas

En cada pantalla, el celular y el escritorio comparten contenido; cambia la distribución (ver [diseño responsivo](#11-diseño-responsivo)).

### Inicio

De arriba hacia abajo:

1. **Bienvenida** en bloque verde bosque de esquinas grandes: "Hola, vecino" y "¿Qué necesitás arreglar hoy? Encontrá a alguien de tu barrio."
2. **Buscador** de texto, **selector de barrio** y botón *Buscar* en terracota, en un formulario con `role="search"`. Debajo, tres cifras de contexto (vecinos con oficio, oficios y barrios).
3. **Elegí un oficio:** los 8 oficios como tarjetas con ícono grande (2 columnas en celular, 3 en tablet chica y 4 desde 768 px).
4. **Mejor valorados** de tu zona (los 3 primeros del barrio elegido) y enlace *Ver todos*.
5. **Cómo funciona** en tres pasos: *Elegí un oficio*, *Mirá las opiniones*, *Contactá directo*.
6. **Banner de trueque** en terracota con el botón *Ver trueques*.

### Buscar

- Título dinámico ("Gasistas en tu barrio", "Vecinos de la ciudad") y contador de resultados que se anuncia con `aria-live`.
- Buscador de texto que **ignora tildes y mayúsculas** y exige que aparezcan todas las palabras.
- Filtros por **oficio** y **barrio** (listas desplegables) y chips *Todos / Con matrícula / Trueque*.
- Resultados **ordenados por calificación**, desempatando por cantidad de opiniones.
- **Sin resultados:** mensaje claro y botón *Ver todos* para restablecer los filtros.

### Ficha del vecino

- Encabezado con avatar, nombre, oficio, barrio y calificación.
- Insignias, descripción, años de experiencia, disponibilidad y medios de pago que acepta.
- **Botones de contacto grandes**: *Llamar por teléfono* y *Escribir por WhatsApp*, con un mensaje de WhatsApp ya redactado, y un botón *Pagar un trabajo* que lleva a Pagos.
- **Opiniones**: lista de reseñas con estrellas, autor y barrio, y formulario para dejar una (nombre, barrio opcional, estrellas y comentario de al menos 5 caracteres). El promedio se recalcula al instante.

### Trueque

- Selector "Quiero ver quienes buscan…".
- Cada tarjeta muestra **lo que ofrece** y **lo que busca** enfrentados (por ejemplo, *Gas ⇄ Electricidad*), separados por un ícono de intercambio.
- Botón *Proponer trueque* con mensaje de WhatsApp ya redactado.

### Pagos

- Formulario: **¿A quién le pagás?**, **monto**, **detalle** (opcional) y **medio de pago**.
- Los medios de pago ofrecidos se limitan **a los que acepta ese vecino**, y se aclara qué acepta ("Carlos acepta: efectivo, transferencia.").
- **Comprobante** al pagar: número de operación, monto grande, para quién, servicio, medio, fecha y detalle; con *Hacer otro pago* y *Dejar mi opinión*.
- **Historial** con el total pagado.
- Aviso permanente: *"Es un prototipo: no se mueve dinero real."*

### Mi perfil (perfil dual)

Un control segmentado permite elegir el rol:

| Rol | Qué hace | Campos |
|---|---|---|
| **Empleado** | Publica su oficio y ve pedidos de su zona | Nombre, oficio, barrio, teléfono, si acepta trueque y qué busca, matrícula, descripción |
| **Empleador** | Publica y administra pedidos | Contacto, teléfono, oficio, barrio, título, descripción, **urgencia** (*hoy*, *esta semana*, *sin apuro*) |

Una vez publicado, el empleado puede **despublicar** su perfil y el empleador **borrar** sus pedidos.

### Agenda

- Formulario *Nuevo turno*: vecino, día (no se pueden elegir fechas pasadas), hora (franjas fijas de 08:00 a 18:00) y nota.
- Lista ordenada por fecha y hora. Cada turno muestra su **estado**: `pendiente` (terracota suave), `confirmado` (menta) o `hecho` (gris).
- Acciones: *Confirmar*, *Marcar hecho*, *Calendario* (descarga un archivo `.ics`) y *Cancelar*.

### Presupuestos

- Cliente y **renglones** con detalle, cantidad y precio; se pueden agregar y quitar renglones (nunca queda la lista vacía).
- **Total automático**, en tamaño grande.
- Guardados con **WhatsApp** (texto ya armado), **Imprimir** y **Borrar**. Al imprimir, se ocultan los formularios y los botones (`print:hidden`).

### Panel

- Saludo personalizado con el nombre si el usuario lo cargó.
- Cuatro **indicadores**: turnos activos, total pagado, favoritos y presupuestos; cada uno es un enlace a su sección.
- Cuatro **accesos rápidos**: Agenda, Presupuestos, Mi perfil y Trueque.
- Lista de **vecinos favoritos**, con el mismo componente de tarjeta.

## 11. Diseño responsivo

### Enfoque mobile-first

Los estilos base son los del celular; los de pantallas más grandes se agregan con los puntos de corte de Tailwind. Se probó en **390 px** (celular) y **1280 px** (escritorio).

| Punto de corte | Ancho | Qué cambia |
|---|---|---|
| (base) | menos de 640 px | Una columna, barra inferior fija, cabecera mínima con el logo |
| `sm` | 640 px | Etiquetas de la barra inferior un poco más grandes; algunos formularios pasan a dos columnas |
| `md` | 768 px | Aparece la **barra superior** con el menú; desaparece la inferior; títulos más grandes; grillas de 2 columnas |
| `lg` | 1024 px | Grillas de 3 columnas; pantallas de formulario con panel lateral (Pagos, Agenda) |

### Navegación adaptable

- **Celular:** cabecera fija de 56 px con el logo + barra inferior fija con 5 secciones (íconos de 24 px). El contenido reserva espacio abajo para que nada quede tapado.
- **Escritorio:** barra superior con logo y menú, y pie con aviso de prototipo.
- En iPhone se respetan las **áreas seguras** (`env(safe-area-inset-*)`), para que la barra inferior no choque con el borde.

### Listados

| Pantalla | Celular | Tablet | Escritorio |
|---|---|---|---|
| Buscar | 1 columna | 2 columnas | 3 columnas |
| Panel (favoritos) | 1 columna | 2 columnas | 3 columnas |
| Panel (indicadores) | 2 columnas | 2 columnas | 4 columnas |
| Trueque | 1 columna | 3 columnas | 3 columnas |
| Inicio (oficios) | 2 columnas | 3 y 4 columnas | 4 columnas |

### Prevención de desbordes

Un problema real detectado durante las pruebas: en *Pagos*, el selector de vecinos hacía que la página fuera más ancha que la pantalla. La solución combina varias técnicas, que quedaron como criterio para todo el proyecto:

- `min-w-0` en los hijos de grillas y contenedores flexibles, para que puedan encogerse.
- Texto largo con `truncate` (puntos suspensivos) o `break-words`.
- `overflow-x: hidden` en `html` y `body`, y `overflow-x-clip` en el contenido principal.
- Columnas de grilla con `minmax(0, 1fr)`.

## 12. Accesibilidad

El objetivo es **WCAG 2.1 nivel AA**. Lo que está implementado:

### Tamaño y legibilidad

- Texto base de **18 px**.
- Botones y campos de **al menos 52 px** de alto (la ley de Fitts: blancos grandes se aciertan más fácil). Los chips y el botón de favorito miden **44 px**, el mínimo recomendado para elementos táctiles.
- Etiquetas siempre visibles; no se confía en los *placeholders*.

### Teclado y foco

- **Foco visible** en todos los elementos interactivos: anillo de 4 px en verde bosque al 30 % (`:focus-visible`).
- Todo se puede operar con teclado; los controles son botones, enlaces y campos nativos.

### Lectores de pantalla

- `<html lang="es">`.
- Estructura con elementos semánticos: `header`, `nav` (con `aria-label="Principal"`), `main`, `footer`, `article`, `section`, `fieldset` y `legend`.
- `aria-label` en todos los controles que solo tienen ícono (*Guardar en favoritos*, *Quitar renglón*) y en los contactos (*Llamar a Carlos Rodríguez*).
- `aria-pressed` en chips, favoritos y estrellas; `aria-current="page"` en la navegación.
- `aria-live="polite"` en contadores de resultados, listas de turnos y comprobantes, y `role="alert"` en los errores de formulario.
- Íconos y avatares decorativos con `aria-hidden="true"`; las estrellas de calificación con `role="img"` y texto alternativo ("4 de 5 estrellas").
- La calificación **siempre** incluye el número, no solo estrellas.

### Movimiento

- Con `prefers-reduced-motion: reduce` se eliminan las transiciones y el desplazamiento suave.

### Color

- El significado no depende solo del color (ver [color](#4-color)).
- Ver las excepciones en las [limitaciones conocidas](#18-limitaciones-conocidas-del-diseño).

### Entrada de datos

- Teléfono en formato argentino: el código de área se escribe junto al número (10 dígitos); acepta espacios, guiones y un cero inicial.
- Monto con `inputMode="numeric"` para que el celular muestre el teclado numérico.
- Los formularios con validación propia usan `noValidate` y muestran errores en pantalla, con un lenguaje claro.

## 13. Conceptos de UX aplicados

| Concepto | Qué dice | Cómo se aplica |
|---|---|---|
| **Mobile-first y responsivo** | Diseñar primero para la pantalla más restringida | Barra inferior en celular y superior en escritorio; listados de 1 a 3 columnas |
| **Ley de Jakob** | Los usuarios prefieren que tu producto funcione como los que ya conocen | Botones de **Teléfono y WhatsApp** en lugar de un chat propio; mensaje de WhatsApp ya redactado |
| **Ley de Fitts** | El tiempo para alcanzar un objetivo depende de su tamaño y distancia | Botones de 52 px; navegación inferior al alcance del pulgar; contacto en la propia tarjeta |
| **WCAG** | Pautas de accesibilidad web | Texto de 18 px, foco visible, `aria-label`, contraste de color, `lang="es"` |
| **Prueba social** | La gente confía en lo que otros ya validaron | Estrellas, reseñas de vecinos con su barrio, insignias de confianza |
| **Prevención de errores** | Es mejor evitar el error que explicarlo | Medios de pago limitados al vecino; fechas pasadas bloqueadas; `Quitar renglón` deshabilitado con un solo renglón; validaciones con mensajes claros |
| **Arquitectura de información** | Organizar el contenido para que se encuentre | 9 secciones, 5 pestañas, rutas legibles y redirecciones para enlaces antiguos |
| **Reconocer antes que recordar** | Mostrar opciones en lugar de pedir que se recuerden | Oficios con ícono y nombre, listas desplegables, ejemplos en los campos |
| **Feedback del sistema** | Informar siempre qué pasó | Comprobante de pago, estados de turno, contador de resultados, promedio que se recalcula al instante |
| **Consistencia** | Lo mismo se ve y funciona igual en todos lados | Un único conjunto de botones, tarjetas y campos para toda la aplicación |

## 14. Voz y redacción

- **Voseo rioplatense**, cercano y respetuoso: "Elegí", "Escribí", "Probá", "Contanos", "Mirá".
- **Frases cortas y verbos de acción** en botones y títulos: *Llamar*, *Reservar turno*, *Proponer trueque*, *Guardar presupuesto*.
- **Lenguaje cotidiano**, sin tecnicismos: "pérdida de gas", "vecino", "tu barrio".
- **Los errores dicen qué hacer**, no lo que está mal: *"Contanos en pocas palabras qué necesitás."*
- **Honestidad sobre el prototipo**: se aclara en *Pagos* y en el pie de página que los datos y los pagos son ficticios.
- **Formatos locales**: fechas `dd/mm/aaaa`, miles con punto y moneda en pesos argentinos (`$25.000`), calificaciones con coma decimal (`4,7`).

## 15. Estados de la interfaz

| Estado | Tratamiento |
|---|---|
| **Vacío** | Mensaje amable que indica qué hacer: *"Todavía no tenés turnos. Reservá el primero desde el formulario."*, *"Tocá el corazón en un vecino para guardarlo acá."* |
| **Sin resultados** | Explica la causa y ofrece una salida (*Ver todos*) |
| **Error de formulario** | Texto terracota bajo el campo, anunciado con `role="alert"` |
| **Éxito** | Comprobante de pago con número de operación; turno que aparece en la lista; perfil publicado |
| **Deshabilitado** | Opacidad al 50 % (`disabled:opacity-50`) |
| **Presionado** | Escala al 98 % en botones; al 90 % en el corazón |
| **Hover** | Cambio a la variante oscura del color, o fondo menta |
| **Ruta inexistente** | Pantalla "No encontramos esa página", con botón para volver al inicio |
| **Cargando** | No aplica: no hay servidor, los datos se leen al instante |

## 16. Datos y persistencia

- Todo el estado global está en `AppContext`, y se guarda en `localStorage` cada vez que cambia.
- **9 claves:** `ob_barrio`, `ob_custom`, `ob_reviews`, `ob_usuario`, `ob_pedidos`, `ob_pagos`, `ob_turnos`, `ob_favs` y `ob_presus`.
- **Datos de ejemplo** (`seed.js`): 12 vecinos con reseñas y 6 pedidos, todos ficticios.
- **Migración:** si el navegador guardó un barrio de una versión anterior ("Jardín", "Los Almendros"), se convierte al barrio nuevo equivalente (Bimaco, Macrocentro). Si el barrio no existe, se usa *Banda Norte*.
- **Tolerancia a fallas:** si `localStorage` no está disponible o tiene datos dañados, la lectura y la escritura se envuelven en `try/catch` y la app sigue funcionando con los valores por defecto.
- **Promedios:** se calculan al leer (`rating` y `votos`), así que una opinión nueva actualiza la tarjeta y el orden del listado al instante.

## 17. Decisiones y compensaciones

| Decisión | Por qué | Qué cuesta |
|---|---|---|
| **Contacto por teléfono y WhatsApp**, sin chat propio | Ya lo usan todos; cero aprendizaje; no hay que moderar ni mantener un servidor de mensajes | Dependemos de apps externas; no sabemos si el contacto se concretó |
| **Sin registro para buscar** | Elimina la mayor barrera de entrada | No se pueden verificar identidades ni limitar opiniones falsas |
| **Prototipo en `localStorage`**, sin servidor | Se puede probar y mostrar sin infraestructura | Los datos viven solo en un navegador; un perfil publicado no lo ve nadie más |
| **`HashRouter`** | Funciona en cualquier hosting estático sin configurar redirecciones | Las URL llevan un `#` |
| **Texto base de 18 px y botones de 52 px** | Pensado para adultos mayores | Pantallas con menos información a la vez |
| **5 pestañas y el resto bajo *Panel*** | Una barra inferior no admite más de 5 destinos con comodidad | Trueque, Presupuestos y Perfil están a un toque más de distancia |
| **Verde distinto para contacto** | Se reconoce al instante qué botón conecta con una persona | Una variable más en la paleta |
| **Pagos limitados a los medios del vecino** | Evita un error imposible de revertir en la vida real | Menos libertad para quien paga |
| **Trueque como función propia** | Quita la plata del medio y une a los vecinos; es el diferencial local | Requiere que el vecino declare qué busca |
| **Matrícula como insignia** | Reduce riesgos en trabajos de gas y electricidad | En el prototipo no se verifica |

## 18. Limitaciones conocidas del diseño

Cosas que sabemos que se pueden mejorar. Las dejamos por escrito a propósito.

**Accesibilidad**

- **Contraste de `terra` sobre `terra-soft`** (3,7:1): lo usan la insignia *Acepta trueque* y el estado *pendiente*, con texto de 14 px. No llega al 4,5:1 de WCAG AA. Opciones: oscurecer el texto al tono `terra-dark` (`#A8451F`) o usar un fondo más claro.
- **Borde de los campos** (`line` sobre blanco, 1,4:1): el límite visual del campo no llega al 3:1 que pide WCAG 1.4.11. Mitigación actual: los campos son grandes, tienen etiqueta y anillo de foco; mejora posible: un borde más oscuro.
- **No hay enlace "Saltar al contenido"** para usuarios de teclado.
- **Las estrellas amarillas** (`#E5A100`, 2,2:1 sobre blanco) son decorativas: la información está siempre en el número y en el texto alternativo.

**Marca**

- Las variantes **apilada** y **monocromática** del logo están definidas en la presentación, pero en el código del proyecto hoy solo existen el isotipo y la versión horizontal.

**Producto**

- Las opiniones pueden dejarse sin haber contratado al vecino (ver próximos pasos).
- No hay pruebas automáticas: las verificaciones fueron manuales.
- Sin servidor, no hay cuentas ni notificaciones, y la matrícula no se verifica.

**Código**

- `src/pages/Perfil.jsx` y `src/pages/Sumate.jsx` son restos de versiones anteriores que ya no están en las rutas. Se pueden borrar.
- El comentario de `tailwind.config.js` indica que paleta y tipografía se tomaron del sistema de diseño de Figma.

## 19. Archivos de referencia

| Tema | Archivo |
|---|---|
| Colores, tipografía y sombra (*tokens*) | `tailwind.config.js` |
| Clases reutilizables (`.btn`, `.card`, `.field`, `.chip`, `.seg`) y reglas base | `src/index.css` |
| Logo, tarjetas, estrellas, insignias y botones de contacto | `src/components/ui.jsx` |
| Barras de navegación y estructura de página | `src/components/Layout.jsx` |
| Rutas, redirecciones y títulos | `src/App.jsx` |
| Estado global y persistencia | `src/context/AppContext.jsx` |
| Oficios, barrios, medios de pago, urgencias y datos de ejemplo | `src/data/seed.js` |
| Pantallas | `src/pages/*.jsx` |
| Logo y capturas | `public/` |
| Fuente y color de tema del navegador | `index.html` |
