import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/dto/login.dto';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { JwtAuthGuard } from './jwt.guard';

/**
 * Controlador `AuthController`
 * 
 * Gestiona todas las operaciones relacionadas con la autenticación de usuarios,
 * incluyendo el registro, inicio de sesión y obtención del perfil autenticado.
 * 
 * Prefijo de ruta: `/auth`
 */
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Endpoint para registrar un nuevo usuario.
     * 
     * Método HTTP: `POST`
     * Ruta: `/auth/register`
     * 
     * @param {CreateUserDTO} data - Objeto que contiene los datos del nuevo usuario (nombre, email, contraseña, edad).
     * @returns {Promise<Object>} Objeto con la información del usuario registrado o mensaje de confirmación.
     * 
     * @example
     * POST /auth/register
     * {
     *   "name": "Ana López",
     *   "email": "ana@example.com",
     *   "password": "123456",
     *   "age": 25
     * }
     */
    @Post('register')
    register(@Body() data: CreateUserDTO) {
        return this.authService.register(data);
    }

    /**
     * Endpoint para iniciar sesión (login).
     * 
     * Método HTTP: `POST`
     * Ruta: `/auth/login`
     * 
     * Valida las credenciales del usuario y devuelve un token JWT si son correctas.
     * 
     * @param {LoginDTO} data - Credenciales del usuario (email y contraseña).
     * @returns {Promise<{ access_token: string }>} Token JWT para acceder a rutas protegidas.
     * 
     * @example
     * POST /auth/login
     * {
     *   "email": "ana@example.com",
     *   "password": "123456"
     * }
     */
    @Post('login')
    login(@Body() data: LoginDTO) {
        return this.authService.login(data);
    }

    /**
     * Endpoint para obtener la información del usuario autenticado.
     * 
     * Método HTTP: `GET`
     * Ruta: `/auth/profile`
     * 
     * Protegido con `JwtAuthGuard`, por lo tanto, requiere un token válido en los headers.
     * 
     * @param {Request} req - Objeto de solicitud que contiene los datos del usuario autenticado.
     * @returns {Object} Información del usuario autenticado extraída del token.
     * 
     * @example
     * GET /auth/profile
     * Headers: Authorization: Bearer <TOKEN_JWT>
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}