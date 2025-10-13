import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

/**
 * RolesGuard: Guard que controla el acceso a rutas protegidas según los roles
 * definidos mediante el decorador @Roles().
 * 
 * Este guard verifica:
 * 1. Si la ruta tiene roles requeridos.
 * 2. Si el usuario está autenticado.
 * 3. Si el rol del usuario coincide con alguno de los roles permitidos.
 * 
 * Si alguna de estas condiciones falla, lanza una excepción de tipo ForbiddenException.
 */
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    /**
     * canActivate: Método que determina si un usuario puede acceder a la ruta.
     * 
     * @param context - Contexto de ejecución de la petición HTTP
     * @returns boolean - true si el usuario tiene permisos, false en caso contrario
     * @throws ForbiddenException - Si el usuario no está autenticado o no tiene rol permitido
     */
    canActivate(context: ExecutionContext): boolean {
        // Obtiene los roles requeridos de los metadatos del decorador @Roles
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Si no hay roles definidos, permite el acceso
        if (!requiredRoles) return true;

        // Obtiene el usuario de la petición
        const { user } = context.switchToHttp().getRequest();

        // Si no hay usuario autenticado, lanza excepción
        if (!user) throw new ForbiddenException('Usuario no autenticado');

        // Si el rol del usuario no está entre los permitidos, lanza excepción
        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Su rol no tiene permisos para acceder a esta ruta');
        }

        // Usuario tiene rol permitido, permite acceso
        return true;
    }
}