---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
inputDocuments: []
---

# UX Design Specification ProyectoWeb-somosNMD-v-Final

**Author:** NMD
**Date:** 2026-02-27T13:36:47-03:00

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision

El proyecto es una página web (MVP enfocado inicialmente en landing page) para un grupo musical compuesto por 12 artistas. El objetivo a corto plazo es lanzar esta versión MVP que, además de presentar al grupo, incluirá un portfolio de los lanzamientos previos y un módulo funcional de "Reserva de Estudio". Las secciones que queden fuera del alcance de este MVP tendrán una experiencia cuidada mediante una página 404 personalizada de "en construcción".

### Target Users

1. **Usuarios Primarios (MVP):** Los 12 artistas del grupo y su círculo cercano (gente conocida). Ellos serán los principales usuarios del módulo de "Reserva de Estudio", requiriendo una interfaz rápida, intuitiva y funcional tanto en escritorio como en dispositivos móviles.
2. **Usuarios Secundarios:** Fans, promotores y público general interesado en la música del grupo, quienes explorarán el portfolio de artistas y los productos musicales lanzados.

### Key Design Challenges

- **Integración fluida del módulo de reservas:** Diseñar una experiencia de agendamiento de estudio que sea robusta pero lo suficientemente simple para los artistas, integrándose sin fricción en una web de perfil musical. Definimos usar Serverless (Server actions con Zod + ShadcnUI via Resend) para mantener lean la arquitectura.
- **Gestión visual de 12 perfiles:** Presentar a 12 artistas de forma atractiva y equitativa en la landing page sin sobrecargar visualmente al usuario ni comprometer el rendimiento en dispositivos móviles. Usaremos grillas asimétricas de CSS Grid y lazy-loading.
- **Manejo elegante de secciones incompletas:** Diseñar un estado "404/En Construcción" que se sienta como una parte integral y estilizada de la experiencia de marca, manteniendo el interés del usuario.
- **Diseño Responsivo Crítico:** Asegurar que toda la experiencia (especialmente la reserva de estudios y la visualización de portfolios) funcione impecablemente tanto en `mobile` como en `desktop`.

### Design Opportunities

- **Identidad de Marca Brutalista-Elegante:** Aprovechar la identidad visual potente y rompedora (como la estética actual basada en Niki Sadeki) para que el portfolio musical y los perfiles de los artistas destaquen y se sientan premium.
- **Navegación Clara e Intuitiva:** Implementar un *header* y *footer* limpios que estructuren el contenido (Landing, Portfolio, Reserva), guiando a cada tipo de usuario a su objetivo de forma directa.
- **Micro-interacciones en Reservas:** Hacer que el acto de reservar el estudio se sienta moderno y profesional a través de transiciones suaves y un buen diseño de formularios customizado por ShadcnUI.

## Core User Experience

### Defining Experience

La acción central y el corazón de este MVP es la **Reserva de Estudio**. Aunque el usuario podrá explorar los perfiles y el portfolio del grupo musical, el éxito del MVP se mide por lo intuitivo, rápido y libre de frustraciones que resulta anotar una sesión en el estudio.

### Platform Strategy

- **Mobile First Estricto:** La inmensa mayoría de las reservas y visualizaciones ocurrirán en dispositivos móviles (mientras los artistas o conocidos están en movimiento socializando o de gira).
- **Responsive hacia Desktop:** Aunque Mobile es la prioridad absoluta, el diseño en Desktop debe mantener la grandeza visual brutalista, aprovechando el espacio pero con las mismas interacciones (ej. el formulario ShadcnUI adaptándose con gracia a pantallas anchas).

### Effortless Interactions

- **Botón Flotante Permanente (Sticky CTA):** En mobile, el usuario siempre podrá acceder a 'Reservar' desde cualquier punto del scroll sin tener que pasar primero por los perfiles.
- **Flujo de Reserva Intuitivo:** Rellenar el formulario de reserva debe sentirse como enviar un mensaje rápido. Usando `Zod` validaremos campos instantáneamente y el estado optimista del server dará confirmación al momento, usando componentes nativos correctos (keyboards apropiados en mobile).
- **Jerarquía Visual Inmediata:** Navegación desde la exploración de la cuadrícula asimétrica de 12 artistas hacia el formulario de reservas directa y obvia.

### Critical Success Moments

- **La Carga Inicial (First Paint):** Cuando el usuario entra en móvil y la cuadrícula asimétrica de artistas carga al instante generando ese "wow" visual.
- **La Confirmación Optimista:** El momento en que el artista envía el formulario de reserva, recibe feedback visual positivo inmediato asumiendo que el mail (Resend) saldrá. El manejo de errores debe ser resiliente (ej. avisos si no hay internet) para evitar pérdidas de datos en mobile.

### Experience Principles

- **Funcionalidad sobre Fricción:** El diseño brutalista no debe interponerse en el camino del proceso de reserva (ej. teclados nativos correctos, accesibilidad en formulario).
- **Velocidad Percibida como Feature:** Tanto el despliegue de las fotos de los artistas como el procesamiento del formulario (Server Actions) deben retroalimentar al usuario inmediatamente, eliminando cualquier sensación de "espera" o carga.

## Desired Emotional Response

### Primary Emotional Goals

El diseño debe evocar una sensación inmediata de estar ante una **"movida underground premium"**. Buscamos que el usuario se sienta inspirado por la calidad visual, pero al mismo tiempo perciba un ambiente vanguardista y altamente profesional. No es solo diseño llamativo; es una declaración de intenciones artísticas y de estatus.

### Emotional Journey Mapping

- **Descubrimiento (Landing):** Sorpresa y fascinación inicial ante la carga instantánea de la estética brutalista-elegante. El usuario debe sentir "esto no es el típico grupo musical, esto es otra liga".
- **Interacción (Navegando Perfiles):** Curiosidad premiada. Al hacer hover o interactuar con los 12 artistas en las grillas, la UI debe sentirse viva, táctil y de bordes muy limpios y redondeados.
- **Transacción (Reservando el Estudio):** Empuje a la acción sin frustración. El paso de la fascinación visual a la acción concreta debe ser súper limpio, guiado por botones gigantes que dejan claro qué hacer.

### Micro-Emotions

- **Confianza Absoluta (Durante la reserva):** Validaciones sutiles y confirmación optimista (usando notificaciones Toast limpias y hermosas estilo Sileo) que generan la tranquilidad instantánea de "¡Listo, reservado, qué fácil!".
- **Profesionalismo (Post-uso promotor):** Respeto. Tras consumir el portfolio, el promotor debe irse con la sensación de que el grupo tiene bases sólidas y un estándar de calidad altísimo.
- **Frustración vs. Resiliencia:** Evitaremos a toda costa la ansiedad por pérdida de conexión en móvil logrando alivio ("menos mal que no perdí los datos").

### Design Implications

- **Emoción "Underground Premium" →** Uso de contraste alto: fondo azul medianoche rompiendo con naranjas vibrantes y tipografías grandes, cuidando excesivamente los espacios en blanco, el kerning y el uso de tarjetas tipo "bento" muy redondeadas (`rounded-3xl` o más) para la UI.
- **Notificaciones "Sileo" →** Implementación de Toasts / notificaciones de éxito y error en la reserva con la estética de transiciones ultra suaves y componentes *bento* del UI de Sileo (sileo.aaryan.design), elevando el estatus de las micro-interacciones.
- **Sensación de "Aburrimiento" (Lo que EVITAREMOS) →** Usar alertas del navegador estándar o layouts por defecto para los feedback form. Todo detalle deber sentise curado e intencional.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

- **Spotify:** El estándar oro en la industria musical. Su éxito UX radica en una navegación que nunca interrumpe el flujo principal (la música o la exploración), un reproductor inferior siempre accesible, y una excelente categorización visual (portadas cuadradas, playlists circulares, etc.).
- **Liteshop (liteshop.design):** Destaca por sus animaciones de "scroll-reveal" y cómo despliega la información. Las transiciones son extremadamente suaves y escalonadas; los elementos no solo aparecen, sino que flotan hacia su posición, dando una sensación de pulido premium y ligereza a pesar de contener mucha información.
- **Sileo (sileo.aaryan.design) & Niki Sadeki:** Referencias directas para el Brutalismo Elegante. De Niki tomamos la audacia tipográfica (titulares gigantes) y la extrema simpleza en el hero section (directo al punto). De Sileo tomamos el uso de "Bento-boxes" redondeadas para modular la información y los *micro-states* (hovers y notificaciones).

### Transferable UX Patterns

**Patrones de Navegación & Estructura:**
- **Bottom Navigation o CTA Pegajoso (Spotify):** En la versión móvil, elementos clave de reservar deben estar siempre al alcance del pulgar sin hacer scroll hacia arriba, imitando la barra de reproducción inferior.
- **Jerarquía Asimétrica Guiada (Niki Sadeki):** Uso de tamaños de fuente masivos para guiar los ojos del usuario primero a la propuesta de valor y luego a la acción, eliminando ruido visual.

**Patrones Visuales y de Interacción:**
- **Fade-up Reveal en Scroll (Liteshop):** Implementar la aparición secuencial y suave (escalonada) de la cuadrícula de los 12 artistas a medida que el usuario hace scroll hacia abajo. No cargar todo de golpe, sino revelar la calidad paso a paso.
- **Grillas Interactivas (Sileo):** Tarjetas grandes redondeadas (`rounded-3xl` o más) que reaccionan con suavidad extrema (animación spring/bouncy) al tocarlas o al hacer hover.

### Anti-Patterns to Avoid

- **Sobrecarga de Animaciones (Jankiness):** Si tratamos de hacer demasiados efectos estilo Liteshop a la vez en móvil y se tranca, destruiremos el pilar de "Velocidad Percibida". Debe ser sutil y renderizarse a 60fps constantes.
- **Texto Denso Innecesario:** A diferencia de ciertas webs corporativas, un MVP musical brutalista debe "mostrar, no contar". Textos largos frustrarán al usuario que quiere ver a los artistas y reservar el estudio.

### Design Inspiration Strategy

**Qué Adoptaremos:**
- La audacia tipográfica y minimalismo de la Hero Section de *Niki Sadeki*.
- La estructura de notificaciones y contenedores tipo Bento de *Sileo*.
- La disposición y jerarquía "siempre accesible en móvil" de *Spotify* para el CTA de reservas.

**Qué Adaptaremos:**
- Simplificaremos las complejas animaciones de scroll de *Liteshop* para asegurar que la cuadrícula de los 12 perfiles rinda perfecto en móvil sin comer batería.

**Qué Evitaremos:**
- Modales bloqueantes intrusivos. Las reservas y la exploración del portfolio deben sentirse fluidas y contextuales.

## Design System Foundation

### 1.1 Design System Choice

**Sistema Tematizable: ShadcnUI + Tailwind CSS + Framer Motion (para transiciones estilo Sileo).**

### Rationale for Selection

- **Velocidad de MVP:** ShadcnUI provee componentes robustos y accesibles de inmediato (Modales, Toasts, Forms, Sheets) eliminando en un 90% el tiempo de desarrollo de lógica UI.
- **Adaptabilidad "Brutalista":** Al no estar ligado a un *theme* corporativo fijo, podemos reescribir por completo el CSS de los componentes usando Tailwind para obtener tarjetas de gran radio (`rounded-[2rem]`), bordes pronunciados y paleta de colores extrema sin "luchar" contra la librería.
- **Sinergia con Next.js:** Es el ecosistema más maduro y natural para la pila actual del proyecto (Server Actions + Zod + React Hook Form), dándole todo servido al desarrollador.

### Implementation Approach

1. **Tokens Iniciales en Tailwind:** Configurar primero `tailwind.config.ts` o la nueva estructura v4 con nuestra paleta "Midnight Blue" y "Tron Orange", y los bordes redondeados globales.
2. **Exportar Primitivas ShadcnUI:** Inicializar únicamente los componentes necesarios (`Button`, `Form`, `Input`, `Toast`, `Sheet` para el Bottom Nav).
3. **Enhancement con Framer Motion:** Para ciertas piezas críticas (las grids interactivas o el scroll *fade-up*), inyectar `framer-motion` donde Tailwind puro se quede corto para lograr el rebote bento-box.

### Customization Strategy

- **Sobrecarga de Estilos (Overrides):** En vez de usar el look por defecto "minimal-border" de ShadcnUI, engrosaremos las tipografías (usando la Condensed Monospace actual), quitaremos bordes estándar e inyectaremos las sombras de bloque (solid shadows) típicas del brutalismo cuando interactúe, o por otro lado, abrazaremos el *glassmorphism* súper redondeado si nos decantamos más hacia el lado Sileo.

## Detailed Core Experience

### Defining Experience

La interacción central es el flujo de "Reserva de Estudio de 3 horas". Si logramos que este proceso complejo en el fondo (cruces de horarios, selecciones) sea percibido como mágico y fluido por los artistas, la adopción será inmediata y eliminará fricciones logísticas previas.

### User Mental Model

Actualmente, el proceso probablemente involucra muchos idas y vueltas por chat para coordinar horarios. El modelo mental deseado debe asemejarse a comprar tickets para un cine: ves claramente qué está disponible, eliges tu extra (el productor), pagas (en el sentido de llenar tus datos) y listo. Entienden que su solicitud debe ser filtrada y validada por el dueño del estudio, por lo que esperan confirmación antes de darlo por sentado al 100%.

### Success Criteria

- Visibilidad visual y sin fricción de los estados "disponible/ocupado" de los bloques de 3hs.
- Transiciones sin recarga de página al ir de seleccionar el horario a elegir modalidad (solo estudio vs productor).
- "Magia en backend": Auto-cancelación de solicitudes superpuestas y sincronización con Google Calendar invisibles para el frontend de quien reserva.
- Cero demoras en llenar el Form final (solo Nombre y Mail solicitados).

### Novel UX Patterns

Integraremos un "Wizard en un Sheet". En lugar de un formulario de 10 campos que abrume, el *Bottom Sheet/Modal* avanzará en pasos muy definidos como "Bento Cards" interactivos: 
1. El calendario visual para el bloque de 3 horas.
2. Dos grandes cards para la selección ("Estudio Solo" vs "Con Productor").
3. Vista simple de resumen para Name/Email.

### Experience Mechanics

**1. Iniciación & Selección de Calendario:**
El usuario toca 'Reservar' y ve un calendario minimalista con bloques indivisibles de 3 horas. Al seleccionar "Día X", ve (ej: 14:00-17:00 Disponible, 17:00-20:00 Ocupado).

**2. Selección de Modalidad:**
Al escoger un espacio disponible, transiciona lateralmente. Se presentan dos opciones como tarjetas tipo 'Bento':
- Solo reservar estudio y equipos.
- Reservar con productor.

**3. Datos y Resumen:**
Se muestra lo seleccionado y el usuario ingresa su *Nombre* y un *Email* válido. Toca el botón final de "Solicitar Reserva".

**4. Validación y Magia en Backend:**
- El sistema muestra un Toast de confirmación de envío.
- Llega un mail renderizado con `@react-email/components` a `nmd.wav@gmail.com` incluyendo botones interactivos "Confirmar" / "Rechazar" usando la integración de webhooks/acciones seguras.
- Al confirmar el admin:
    - Se cancelan y rechazan las demás peticiones concurrentes pendientes para ese slot de 3hs.
    - Se crea un evento de Google Calendar automáticamente.
    - Se notifica confirmación a la persona vía su email original.

## Visual Design Foundation

### Color System

Mantendremos estrictamente la paleta brutalista establecida:
- **Background Principal:** Midnight Blue (Azul noche profundo). Provee el contraste necesario para la sensación "Premium Underground".
- **Acentos y CTAs:** Tron Orange (Naranja vibrante). Utilizado exclusivamente para llamadas a la acción (como el botón de Reserva) y highlights clave para no saturar al usuario.
- **Texto:** Blanco primario para máxima legibilidad sobre el fondo oscuro, con grises azulados para texto secundario.

### Typography System

Adoptaremos el enfoque tipográfico agresivo observado en referencias como Niki Sadeki:
- **Títulos y Encabezados:** Fuentes gigantes, condensadas y monoespaciadas. Utilizadas para transmitir esa vibra audaz y llenar el espacio de forma brutalista.
- **Cuerpo y UI (Tarjetas, Formularios):** Fuente súper limpia y legible (tipo Inter o Helvetica) para no comprometer la usabilidad en componentes críticos (el flujo de reserva). 

### Spacing & Layout Foundation

- **Border Radius Intermedio (Sharp/Soft):** Utilizaremos un radio de bordes intermedio, alrededor de `12px` a `16px` (el equivalente a `rounded-xl` o `rounded-2xl` en Tailwind). Esto logra el efecto visual de "Bento box" amigable pero manteniendo una firmeza "sharp" que no llega a ser un botón hiper-redondeado (pill shape), alineándose perfectamente con la seriedad "Premium" sin perder el estilo táctil moderno.
- **Grillas Asimétricas:** Espaciados holgados (`gap-6` o `gap-8`) entre las tarjetas de los artistas y componentes, permitiendo que el Midnight Blue respire.

### Assets & Media Content

- **Assets Preexistentes:** Las fotografías, logos y materiales gráficos de los 12 artistas ya están definidos y listos para su uso. El diseño se adaptará al formato real de este contenido evitando el uso temporal de placeholders siempre que sea posible.

### Accessibility Considerations

El contraste del Tron Orange y Blanco sobre el Midnight Blue es inherentemente alto y accesible. La tipografía limpia (Inter) en la interfaz de reserva asegurará que, aunque la web sea brutalista, el núcleo transaccional sea tan fácil de leer como las apps bancarias más modernas.

## Design Direction Decision

### Design Directions Explored

Se exploraron 4 direcciones visuales clave mediante un prototipo HTML interactivo:
1.  **Elegancia Bento:** Combinación de estructura limpia de tarjetas (tipo Sileo) con tipografía gigante y fondo oscuro.
2.  **Brutalismo Puro:** Sin contenedores ni bordes, uso extremo de tipografía como estructura. Estilo Niki Sadeki directo.
3.  **Dark Glass (Vanguardia):** Mucha profundidad, fondo desenfocado y elementos superpuestos ("glassmorphism").
4.  **Wireframe Neón:** Estética arquitectónica, cruda, basada en bordes finos brillantes y cero fondos sólidos.

### Chosen Direction

**Dirección Seleccionada: 1. Elegancia Bento (con matices de Brutalismo)**

Al final, la "Elegancia Bento" fue seleccionada iterando sobre nuestro interés por los radios de bordes (`12px-16px`). Permite lograr la contundencia de las fuentes masivas (Brutalismo Puro) pero organiza la información crítica (como el booking module y los perfiles de 12 artistas) en cajas digeribles que evitan el caos o la fatiga visual, logrando el estatus de "Premium".

### Design Rationale

-   Estructurar a 12 artistas en "Brutalismo Puro" hubiese sido caótico o inmanejable en *Mobile*, requiriendo demasiado scroll. Las "Bento boxes" optimizan espacio manteniendo la estética radical en los titulares por fuera de las cajas.
-   Mantiene los *affordances* (pistas interactivas) visuales necesarios para el formulario de reservas (el usuario *entiende* que la caja del calendario se puede tocar) sin apelar al "Dark Glass" que requiere muchísimo procesamiento gráfico.

### Implementation Approach

1.  Definiremos utilidades en Tailwind CSS (como `@layer components`) dedicadas a contenedores Bento: `bg-surface border border-white/5 shadow-md rounded-xl md:rounded-2xl overflow-hidden`.
2.  Los títulos de página (`h1`, Hero Section) romperán las cajas para mantener el contraste brutalista, viviendo directamente sobre el "Midnight Blue" profundo.

## User Journey Flows

### 1. Booking the Studio (Primary Journey)

**Goal:** Un artista necesita encontrar disponibilidad, agendar una sesión de 3 horas (opcionalmente con productor) y confirmar en menos de 10 segundos desde su móvil.

```mermaid
graph TD
    A[Usuario entra a la Web (Móvil)] --> B{¿Explora Perfiles?}
    B -->|Sí| C[Visualiza 12 Artistas y Portfolio]
    B -->|No| D[Toca Botón 'Reservar' siempre visible]
    C --> D
    
    D --> E[Sube Bottom Sheet: Modalidad Bento]
    E --> F[Selecciona Día en Calendario Simple]
    F --> G[Elige Bloque de 3hs Disponible]
    
    G --> H{¿Precisa Productor?}
    H -->|Sí| I[Toca Bento Card 'Estudio + Productor']
    H -->|No| J[Toca Bento Card 'Solo Estudio']
    
    I --> K[Transición a 'Último Paso']
    J --> K
    
    K --> L[Ingresa 'Nombre' y 'Email Valido']
    L --> M[Toca 'Solicitar Reserva']
    
    M --> N[Toast Verde Optimista: 'Solicitud Enviada']
    N --> O[El Bottom Sheet se cierra y sigue explorando]
    
    %% Backend Process (Invisible para el frontend)
    O -.-> P((Serverless Action))
    P -.-> Q[Envía Mail Reactivo a nmd.wav@gmail.com]
    Q -.-> R{Dueño Confirma?}
    R -.->|Sí| S[Auto-cancela choques de horarios en base de datos]
    S -.-> T[Registra en Google Calendar automático]
    T -.-> U[Envía webhook/mail de reserva aprobada al cliente]
```

### Journey Patterns

-   **Navegación Contextual (Overlays):** El flujo transaccional entero ocurre dentro de un *Bottom Sheet* o Modal grande. Nunca redirigimos a una `/reserva` que saque al usuario de la inmersión brutalista principal.
-   **Divulgación Progresiva (Progressive Disclosure):** No abrumamos mostrando 10 campos a la vez. Primero elegís la fecha, luego tocás unas "Bento Cards" enormes para tu extra (el productor), y recién al final se te pide teclear datos.

### Flow Optimization Principles

-   **Acierto sobre Precisión (Móvil):** El uso de grillas gigantes "100% toucheables" (Bento UI) anula el problema clásico de intentar tocar opciones muy juntas en dropdowns del formato en móviles (Fitts's Law).
-   **Optimismo Tecnológico (Optimistic UI):** La respuesta es instantánea. Cuando tocan "Reservar", el Toast sale inmediatamente dando cierre cognitivo. El proceso de *Resend* enviando un mail al backend ocurre desasociado, evitando spinners de "Cargando..." infinitos en redes 3G lentas.
-   **Prevención Real de Errores:** Validadores en caliente de Zod prevendrán caracteres ilegales en el casillero de *Email*, evitando frustraciones de enviar solicitudes inválidas.

## Component Strategy

### Design System Components

Utilizaremos la base de **ShadcnUI** para la velocidad y accesibilidad estructural, adaptando su apariencia a nuestra paleta y formas:

- **Sheet:** Container principal del flujo de reservas (Bottom Sheet en móvil, Modal en desktop).
- **Form / Input / Label:** Para la captura final de datos de contacto, estilizados de forma ultra-minimalista.
- **Button:** CTA principal (Ej. Botón "Reservar" flotante).

### Specialized UI Libraries

- **Sileo (`npm install sileo`):** Biblioteca minimalista y ultra-fluida dedicada exclusivamente a notificaciones Toast. Escrita en React, utiliza morphing de SVG y físicas tipo "spring" nativamente. La usaremos en reemplazo del componente Toast estándar de ShadcnUI para proveer feedback inmediato con una fluidez "Premium" que eleva la percepción de calidad del sitio.

### Custom Components

Componentes específicos creados para la identidad "Elegancia Bento":

#### BentoCard

**Purpose:** Contenedor interactivo principal para perfiles de artistas y opciones de reserva.
**Usage:** En la grilla de la Landing Page (12 artistas) y en la selección de modalidad ("Solo Estudio", "Con Productor").
**Anatomy:** Tarjeta de gran radio (`rounded-2xl` a `rounded-[2rem]`), fondo semitransparente o sólido Midnight Blue, bordes finos sutiles.
**States:**
- **Default:** Reposo, jerarquía clara.
- **Hover/Active:** Elevación sutil (sombra o traslación en Y corta), brillo o cambio de color en el borde usando *Framer Motion*.
**Accessibility:** Navegable por teclado (esquema `focus-visible`), rol de botón o enlace según corresponda.

#### TimeSlotGrid

**Purpose:** Selector de disponibilidad horario altamente táctil e intuitivo.
**Usage:** Paso 1 del flujo de reserva en el Bottom Sheet.
**Anatomy:** Grilla de botones anchos, cada uno representando un bloque indivisible de 3 horas.
**States:**
- **Available:** Fuerte *affordance* de click, color claro o borde destacado.
- **Selected:** Estado de llenado sólido (Tron Orange), confirmando la elección.
- **Unavailable:** Grisado, tachado visualmente o de baja opacidad (`opacity-50`). No clickeable.
**Accessibility:** Etiquetas ARIA dinámicas indicando disponibilidad ("14:00, Disponible", "17:00, Ocupado").

### Component Implementation Strategy

- Implementación sin "Vendor Lock-in": Los componentes de ShadcnUI se instalan en el código fuente (`components/ui`), permitiendo una sobrescritura profunda de estilos vía `tailwind-merge` y utilidades personalizadas.
- Se crearán variantes en Tailwind (helpers) para las físicas de los contenedores Bento, asegurando reusabilidad.

### Implementation Roadmap

**Fase 1 - Core Flow (Reserva):**
1. Tokens de Color y Tipografía en Tailwind config.
2. Adaptación de `Sheet`, `Button` de ShadcnUI e instalación de `sileo`.
3. Creación de `TimeSlotGrid` y `BentoCard` básicos para reservas.

**Fase 2 - Landing & Perfiles:**
4. Implementación de CSS Grid asimétrico para los 12 artistas usando la `BentoCard` avanzada (con imágenes reales provistas y lazy loading).
5. **Logo Animation (GSAP):** Integración de la secuencia de animación del logo con GSAP (ScrollTrigger). Es mandatario ubicar este comportamiento de transición **inmediatamente después del Hero Section**, actuando como puente visual hacia la exhibición de los artistas.

**Fase 3 - Pulido & Animaciones:**
6. Integración de *Framer Motion* para las apariciones (fade-up scroll) y micro-interacciones (bouncy hover) en las tarjetas de componentes.

## UX Consistency Patterns

### Button Hierarchy

- **Primary Action (Tron Orange Sólido):** Exclusivo para finalizar una acción crítica del flujo principal. Literalmente será el botón de *"¡Solicitar Reserva!"* dentro del formulario. Cero distracciones.
- **Secondary Action (Ghost / Underlined):** Para cancelar o explorar. Usaremos el estilo Niki Sadeki (texto grueso + línea subrayada al hover o bordes transparentes) para todo lo demás.

### Feedback Patterns

- **Toasts Activos (Sileo):** Para notificaciones no bloqueantes. Transiciones suaves (spring physics) que no interrumpen la experiencia.
    - **Success (Éxito Optimista):** Se mostrará al enviar solicitud. Sutil y rápido ("Solicitud enviada ⚡").
    - **Error / Warning:** Rojo o vibrante superior indicando acción requerida.
- **Loading UI (States):** Evitaremos *spinners* gigantes que bloquean la pantalla central (causa fatiga). Implementaremos una Loading Bar fina superior o animaciones de carga internas (dentro de los botones) para mantener el dinamismo constante.

### Form Patterns

- **Inputs Minimalistas:** Alejados del paradigma clásico de caja bordeada pesada. El `Input` será solo una línea divisoria inferior (`border-b`) sobre fondo oscuro.
- **Tipografía Intensa:** El texto introducido (nombre, mail) usará escalas tipográficas masivas acordes a la estética Brutalista Elegante, para priorizar la legibilidad en el teléfono y dar sensación "Premium".
- **Validación Promocionada (Inline):** El CTA (botón de enviar solicitud) se comportará defensivamente: estado deshabilitado (`opacity-50`) hasta que un script Zod valide instantáneamente un input correcto (como el email). Reduciendo "Bounces" provocados por clics tempranos erróneos.

### Overlay Navigation Patterns

- **Wizard in Bottom Sheet:** El flujo de navegación móvil complejo de "La Reserva de Estudio" siempre sucederá a través de transiciones dentro de un `Overlay/Sheet` anclado a la base inferior para maximizar el área alcanzable usando un solo dedo (the "thumb zone"), logrando un acceso impecable. Un *swipe-down* cancelará el modal permitiendo retroceder velozmente a los perfiles.

## Responsive Design & Accessibility

### Responsive Strategy

Nuestra estrategia principal es **"Mobile First Estricto"**, ya que la mayoría de los usuarios objetivo interactuarán desde sus teléfonos inteligentes.
- **Móvil (320px - 767px):** Enfoque principal. Botón de "Reservar" flotante fijo (`sticky bottom`), CTA masivo para evitar "miss-clicks", y formularios contenidos en *Bottom Sheets* que simulan aplicaciones nativas (swipeables). Navegación colapsada en un menú hamburguesa grande y tipografía que llena la pantalla.
- **Tablet (768px - 1023px):** Transición fluida. La cuadrícula de 12 artistas pasa de 1 o 2 columnas en móvil a 3 columnas. Las *Bento Cards* se expanden cómodamente sin estirar los textos de manera incómoda.
- **Escritorio (1024px+):** Máxima expresión Brutalista. Las fuentes escalan drásticamente para dominar la pantalla (`text-7xl` o más en Hero). El *Bottom Sheet* móvil mutará a un Modal elegante centrado en la pantalla (usando el comportamiento responsive nativo del `Sheet/Dialog` de ShadcnUI). Navegación clara en la barra superior con efecto cristalizado al hacer scroll.

### Breakpoint Strategy

Utilizaremos los breakpoints estándar de Tailwind CSS, con un énfasis crítico en la transición `md` (Tablet) y `lg` (Escritorio):
- `sm` (640px+): Ajustes menores para teléfonos muy grandes o en landscape.
- `md` (768px+): Cambio críctico: Paso de Layout de Columna Única a Grillas (`grid-cols-2` o `grid-cols-3` para los artistas).
- `lg` (1024px+): Activación de Layout de Escritorio. Botón flotante móvil desaparece; barra de navegación (`sticky navbar`) entra en vigor. El `Sheet` se vuelve Modal clásico.
- `xl` (1280px+): Container `max-w-7xl` central para evitar que en monitores ultrawide se desparrame la interfaz brutalista.

### Accessibility Strategy

Aspiramos a cumplir, como mínimo, con **WCAG Nivel AA**, una obligación ética y técnica para un frontend de alta calidad, asegurando que todos puedan usar la web musical:
- **Contraste de Color Severo:** Nuestra paleta (Midnight Blue de fondo y texto Blanco/Tron Orange) casi garantiza el ratio requerido (4.5:1) por naturaleza.
- **Navegación por Teclado:** Todas las *Bento Cards*, botones e inputs (incluyendo el TimeSlotGrid) utilizarán los componentes semánticos `<button>` e `<input>` (ShadcnUI) con anillos de enfoque evidentes (`focus-visible:ring-2 focus-visible:ring-Tron-Orange`) para mantener el brutalismo incluso en la accesibilidad.
- **Tamaños de Área Interactiva:** Para cumplir la regla "Mobile First", los `BentoCards` para horas y modalidades superarán ampliamente los `44x44px` mínimos exigidos, minimizando frustración (Estrategia "Acierto sobre Precisión").

### Testing Strategy

- **Simuladores Nativos y Dispositivos Físicos:** Probar el *Bottom Sheet Wizard* en iPhones reales (Safari iOS) minimizando problemas con el *viewport height* (`dvh`) y los teclados virtuales que a menudo rompen las vistas móviles.
- **Throttle Network (3G Lenta):** Asegurar mediante Chrome DevTools que el "Optimistic UI Toast" de la reserva y las fotos *lazy-loaded* de los artistas no dejan al usuario dudando de si la acción funcionó cuando la red es precaria.
- **Keyboard Walkthrough:** El desarrollador deberá recorrer el flujo de "Reserva de Estudio" entero usando únicamente el tabulador y el botón "Enter" para confirmar la fluidez sin el ratón.

### Implementation Guidelines

- Usar las variables de CSS en `tailwind.config.ts` (o `app/globals.css` en v4) para centralizar colores y radios.
- Para el comportamiento `Sheet/Modal` híbrido, se sugiere emplear la directiva `useMediaQuery` (como propone la comunidad de Shadcn) para renderizar `<Drawer>` en móvil y `<Dialog>` en escritorio condicionalmente desde el mismo componente.
- Siempre encapsular textos dentro de primitivas accesibles y proveer `aria-labels` claros a las animaciones oscuras de `framer-motion` donde no haya texto visible explícito (ej: en íconos de redes sociales).

## Desired Emotional Response

### Primary Emotional Goals

El diseño debe evocar una sensación inmediata de estar ante una **"movida underground premium"**. Buscamos que el usuario se sienta inspirado por la calidad visual, pero al mismo tiempo perciba un ambiente vanguardista y altamente profesional. No es solo diseño llamativo; es una declaración de intenciones artísticas y de estatus.

### Emotional Journey Mapping

- **Descubrimiento (Landing):** Sorpresa y fascinación inicial ante la carga instantánea de la estética brutalista-elegante. El usuario debe sentir "esto no es el típico grupo musical, esto es otra liga".
- **Interacción (Navegando Perfiles):** Curiosidad premiada. Al hacer hover o interactuar con los 12 artistas en las grillas, la UI debe sentirse viva, táctil y de bordes muy limpios y redondeados.
- **Transacción (Reservando el Estudio):** Empuje a la acción sin frustración. El paso de la fascinación visual a la acción concreta debe ser súper limpio, guiado por botones gigantes que dejan claro qué hacer.

### Micro-Emotions

- **Confianza Absoluta (Durante la reserva):** Validaciones sutiles y confirmación optimista (usando notificaciones Toast limpias y hermosas estilo Sileo) que generan la tranquilidad instantánea de "¡Listo, reservado, qué fácil!".
- **Profesionalismo (Post-uso promotor):** Respeto. Tras consumir el portfolio, el promotor debe irse con la sensación de que el grupo tiene bases sólidas y un estándar de calidad altísimo.
- **Frustración vs. Resiliencia:** Evitaremos a toda costa la ansiedad por pérdida de conexión en móvil logrando alivio ("menos mal que no perdí los datos").

### Design Implications

- **Emoción "Underground Premium" →** Uso de contraste alto: fondo azul medianoche rompiendo con naranjas vibrantes y tipografías grandes, cuidando excesivamente los espacios en blanco, el kerning y el uso de tarjetas tipo "bento" muy redondeadas (`rounded-3xl` o más) para la UI.
- **Notificaciones "Sileo" →** Implementación de Toasts / notificaciones de éxito y error en la reserva con la estética de transiciones ultra suaves y componentes *bento* del UI de Sileo (sileo.aaryan.design), elevando el estatus de las micro-interacciones.
- **Sensación de "Aburrimiento" (Lo que EVITAREMOS) →** Usar alertas del navegador estándar o layouts por defecto para los feedback form. Todo detalle deber sentise curado e intencional.
