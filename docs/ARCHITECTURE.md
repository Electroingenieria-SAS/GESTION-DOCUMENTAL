# Arquitectura técnica

## Principio central

El Excel deja de ser la base operativa y pasa a ser la fuente de reglas inicial. La aplicación conserva una única fuente de verdad para cada expediente y genera vistas derivadas: inventario, hoja de control, rótulos y auditoría.

## Capas

1. Dominio: entidades TRD, expediente y reglas puras.
2. Aplicación: validación, creación y consultas.
3. Infraestructura: persistencia local y adaptador Supabase.
4. Presentación: módulos React por funcionalidad.
5. Datos: TRD normalizada por oficinas a partir del libro maestro.

## Árbol documental

Oficina productora → Serie → Subserie → Tipo documental → Expediente.

La interfaz aplica selección dependiente para evitar combinaciones inexistentes y hereda tiempos de retención y disposición desde la TRD.

## Reglas migradas desde el Excel

- descripción obligatoria;
- fecha final no anterior a fecha inicial;
- folio final no inferior al folio inicial;
- cálculo de cantidad de folios;
- archivo/fase obligatorio;
- código de fase Gestión=000, Central=001, Histórico=002;
- validación de combinación TRD;
- detección preventiva de posibles duplicados.

## Patrones visuales

La demo adopta patrones propios de gestores documentales empresariales: navegación persistente, árbol jerárquico, panel de metadatos, vistas de trabajo, ciclo de vida, búsqueda y auditoría. La identidad visual es propia de la solución, con superficies blancas y azules institucionales.

## Rendimiento

- SPA compilada: Node se usa en desarrollo y build, no como servidor obligatorio de producción.
- TRD precargada como datos estáticos en la primera demo.
- animaciones CSS basadas principalmente en transform y opacity;
- componentes sin framework visual pesado;
- persistencia desacoplada mediante una interfaz de repositorio;
- bundle compatible con Vercel y hosting estático.

## Evolución prevista

La siguiente capa debe incorporar autenticación Supabase, repositorio Supabase activo, documentos en Storage, trazabilidad completa, generación de rótulos/FUID, transferencias, búsqueda avanzada y administración de la TRD versionada.
