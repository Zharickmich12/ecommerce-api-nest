import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

/**
 * Servicio `AuthService`
 * 
 * Este servicio contiene la lógica principal del proceso de autenticación.
 * Se encarga de registrar nuevos usuarios, validar credenciales durante el inicio de sesión,
 * encriptar contraseñas y generar tokens JWT.
 */
@Injectable()
export class AuthService {
    constructor(
        /**
         * Inyección del repositorio `User`
         * 
         * Permite interactuar con la base de datos para crear, buscar y validar usuarios.
         */
        @InjectRepository(User)
        private userRepo: Repository<User>,

        /**
         * Servicio `JwtService`
         * 
         * Proporciona métodos para generar y verificar tokens JWT.
         */
        private jwtService: JwtService,
    ) { }

    /**
     * Registro de usuarios
     * 
     * @param data - Objeto `CreateUserDTO` que contiene los datos del nuevo usuario.
     * @returns Mensaje de confirmación con información básica del usuario registrado.
     * 
     * Flujo:
     * 1. Encripta la contraseña usando `bcrypt`.
     * 2. Crea una nueva instancia del usuario con la contraseña encriptada.
     * 3. Guarda el nuevo usuario en la base de datos.
     */
    async register(data: CreateUserDTO) {
        // Encriptación de la contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Creación de la entidad usuario con la contraseña protegida
        const userCreated = this.userRepo.create({ ...data, password: hashedPassword });

        // Guardado del usuario en la base de datos
        await this.userRepo.save(userCreated);

        // Retorno de mensaje de éxito con datos relevantes (sin exponer la contraseña)
        return { 
            message: 'Usuario registrado con éxito', 
            user: { id: userCreated.id, email: userCreated.email } 
        };
    }

    /**
     * Inicio de sesión
     * 
     * @param data - Objeto `LoginDTO` con el correo y contraseña del usuario.
     * @returns Un objeto con el token JWT si las credenciales son válidas.
     * 
     * Flujo:
     * 1. Busca el usuario por correo electrónico.
     * 2. Valida que el usuario exista.
     * 3. Compara la contraseña ingresada con la almacenada (encriptada).
     * 4. Si es válida, genera un token JWT con información básica del usuario.
     */
    async login(data: LoginDTO) {
        // Buscar usuario por correo electrónico
        const user = await this.userRepo.findOne({ where: { email: data.email } });

        if (!user) {
            throw new UnauthorizedException("Credenciales inválidas - EMAIL");
        }

        // Comparar contraseñas (texto plano vs hash)
        const isPasswordValid = await bcrypt.compare(data.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Credenciales inválidas - PASSWORD");
        }

        // Crear payload del token con información del usuario
        const payloadToken = { 
            sub: user.id, 
            name: user.name, 
            email: user.email, 
            role: user.role 
        };

        // Generar token JWT
        const token = await this.jwtService.signAsync(payloadToken);

        // Retornar el token de acceso
        return { accessToken: token };
    }
}