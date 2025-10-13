import { SetMetadata } from "@nestjs/common";

/**
 * Constante utilizada como clave para almacenar los roles en los metadatos
 * del decorador `@Roles()`.
 * 
 * Esta clave se utiliza posteriormente en los guards para validar si el usuario
 * tiene permisos para acceder a una ruta protegida según su rol.
 */
export const ROLES_KEY = 'roles';

/**
 * Decorador personalizado para asignar roles a rutas o controladores.
 * 
 * Este decorador utiliza la función `SetMetadata` de NestJS para guardar
 * los roles requeridos dentro de los metadatos del manejador (handler).
 * 
 * Ejemplo de uso:
 * ```typescript
 * @Roles('admin')
 * @Get('all')
 * findAll() { ... }
 * ```
 * 
 * En este caso, solo los usuarios con rol `'admin'` podrán acceder a la ruta.
 * 
 * @param roles - Lista de roles permitidos (por ejemplo: `'admin'`, `'user'`, etc.)
 * @returns Decorador que añade la metadata `roles` al handler o controlador.
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);