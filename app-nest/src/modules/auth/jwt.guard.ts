import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Guardia de autenticación JWT
 * 
 * Esta clase extiende la funcionalidad de `AuthGuard` proporcionada por `@nestjs/passport`,
 * utilizando la estrategia `'jwt'` definida previamente en el archivo `jwt.strategy.ts`.
 * 
 * Su objetivo es proteger las rutas que requieran autenticación mediante un token JWT.
 * 
 * Cuando un endpoint usa el decorador `@UseGuards(JwtAuthGuard)`, 
 * NestJS automáticamente verifica que la solicitud contenga un token JWT válido
 * en los encabezados de autorización (`Authorization: Bearer <token>`).
 * 
 * Si el token es válido, el usuario autenticado se adjunta al objeto `Request` (`req.user`).
 * Si el token es inválido o no existe, la solicitud es rechazada con un error `401 Unauthorized`.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}