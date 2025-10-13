import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

/**
 * Módulo `AuthModule`
 * 
 * Este módulo gestiona la autenticación de usuarios utilizando JWT (JSON Web Token)
 * y la estrategia de Passport. Configura los servicios, controladores y dependencias
 * necesarias para el manejo del registro, inicio de sesión y validación de tokens.
 */
@Module({
  imports: [
    /**
     * ConfigModule
     * 
     * Carga las variables de entorno desde el archivo `.env` y las hace
     * accesibles globalmente en toda la aplicación mediante `ConfigService`.
     */
    ConfigModule.forRoot({ isGlobal: true }),

    /**
     * TypeOrmModule
     * 
     * Registra la entidad `User` para permitir operaciones de base de datos
     * relacionadas con los usuarios dentro del contexto de este módulo.
     */
    TypeOrmModule.forFeature([User]),

    /**
     * PassportModule
     * 
     * Configura el sistema de autenticación basado en estrategias,
     * definiendo por defecto la estrategia `jwt`.
     */
    PassportModule.register({ defaultStrategy: 'jwt' }),

    /**
     * JwtModule
     * 
     * Configura la generación y validación de tokens JWT de forma asíncrona,
     * utilizando las variables de entorno gestionadas por `ConfigService`.
     * 
     * - `secret`: Clave secreta usada para firmar los tokens.
     * - `signOptions.expiresIn`: Tiempo de expiración del token (en segundos).
     */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: 60 * 60 * 24 }, // 24 horas
      }),
    }),
  ],

  /**
   * Proveedores del módulo:
   * - `AuthService`: Contiene la lógica de autenticación (registro, login, validación de credenciales).
   * - `JwtStrategy`: Define la estrategia de validación de tokens JWT.
   */
  providers: [AuthService, JwtStrategy],

  /**
   * Controladores:
   * - `AuthController`: Expone las rutas HTTP relacionadas con la autenticación (`/auth/register`, `/auth/login`, etc.).
   */
  controllers: [AuthController],

  /**
   * Exportaciones:
   * - Se exportan `JwtStrategy` y `PassportModule` para ser utilizados en otros módulos.
   */
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}