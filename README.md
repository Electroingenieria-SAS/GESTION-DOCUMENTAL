# Gestión Documental · TRD

Primera demo funcional derivada del Sistema Maestro TRD de Electroingeniería S.A.S.

## Alcance de la primera demo

- árbol real de clasificación extraído y normalizado desde el Excel;
- 385 registros TRD;
- 18 oficinas, 39 series, 56 subseries y 266 tipos documentales;
- captura guiada de un expediente con campos dependientes;
- validación de combinación TRD, fechas, foliación y posibles duplicados;
- inventario derivado desde una única fuente de datos;
- explorador jerárquico de la TRD;
- consulta de retención y disposición;
- auditoría de migración;
- interfaz responsive para escritorio y móvil;
- base Supabase con perfiles, RLS y auditoría;
- pipeline de GitHub Actions para validar el build;
- configuración compatible con Vercel.

## Arquitectura

- src/domain: entidades y reglas de negocio.
- src/application: servicios y casos de uso.
- src/infrastructure: persistencia local y adaptadores Supabase.
- src/features: módulos funcionales.
- src/components: componentes compartidos.
- src/styles: tokens, estilos globales y animaciones.
- src/data: TRD normalizada por oficinas.
- supabase: migraciones SQL y base de seguridad.
- docs: decisiones de arquitectura.

Node se usa exclusivamente para desarrollo y compilación. La aplicación final es una SPA estática y puede hospedarse en Vercel o en un hosting estático compatible.

## Desarrollo local

    npm install
    npm run dev

## Build de producción

    npm run build

## Supabase

Copie .env.example a .env.local y configure:

    VITE_SUPABASE_URL=
    VITE_SUPABASE_ANON_KEY=

La demo usa LocalStorage mientras Supabase no esté configurado. La capa de persistencia está desacoplada para conectar el backend sin reescribir las reglas de negocio.

## CI

Cada push o pull request a main ejecuta instalación de dependencias, typecheck, build de producción y publica el directorio dist como artefacto del workflow.

## Vercel

El repositorio incluye vercel.json y una base relativa de Vite, por lo que puede importarse directamente como proyecto Vite. Las variables de Supabase se configuran como variables de entorno del proyecto.
