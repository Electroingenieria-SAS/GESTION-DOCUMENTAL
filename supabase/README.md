# Base Supabase

Esta carpeta contiene la base inicial para activar el backend sin mezclar lógica de persistencia con la interfaz.

## Incluido

- perfiles y roles;
- expedientes;
- auditoría;
- Row Level Security;
- restricciones de fechas, folios y fase de archivo;
- punto de extensión para MFA AAL2 y Edge Functions.

## Pendiente al conectar un proyecto real

1. ejecutar las migraciones;
2. configurar proveedores de autenticación;
3. definir política MFA para operaciones críticas;
4. crear bucket privado de documentos;
5. implementar políticas de Storage;
6. crear Edge Functions para administración privilegiada;
7. activar el adaptador Supabase en la composición de la aplicación.
