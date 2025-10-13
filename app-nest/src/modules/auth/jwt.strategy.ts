import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt'

/**
 * Estrategia JWT para la autenticación
 * 
 * Esta clase define la lógica para validar y extraer la información del token JWT
 * en cada solicitud protegida.
 * 
 * Extiende la clase `PassportStrategy` con la estrategia `'jwt'`, utilizando
 * el paquete `passport-jwt` para manejar tokens.
 * 
 * Configuración:
 * - `jwtFromRequest`: Especifica que el token se obtiene desde el encabezado HTTP `Authorization`
 *   en formato `Bearer <token>`.
 * - `ignoreExpiration`: Si es `false`, los tokens expirados serán rechazados.
 * - `secretOrKey`: Clave secreta utilizada para verificar la firma del token, 
 *   obtenida desde las variables de entorno (`JWT_SECRET_KEY`).
 * 
 * Método principal:
 * @method validate(payload)
 * - Se ejecuta automáticamente después de verificar la firma del token.
 * - Recibe el `payload` (datos codificados dentro del token).
 * - Retorna un objeto con los datos relevantes del usuario (`userId`, `email`, `role`)
 *   que será anexado al objeto `Request` (req.user).
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET_KEY')
        })
    }

    /**
     * Valida y devuelve la información del usuario contenida en el token JWT
     * @param payload - Información codificada dentro del token (sub, email, role)
     * @returns Un objeto con los datos del usuario autenticado
     */
    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email, role: payload.role }
    }

}