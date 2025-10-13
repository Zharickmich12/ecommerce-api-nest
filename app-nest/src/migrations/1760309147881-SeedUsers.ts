import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1760309147881 implements MigrationInterface {
    name = 'SeedUsers1760309147881'

    /**
     * Método up: Se ejecuta al aplicar la migración
     * Inserta registros iniciales en la tabla `user` con los siguientes datos:
     * - Ana López: correo ana@example.com, contraseña 12345, edad 25
     * - Luis Gómez: correo luis@example.com, contraseña 12345, edad 30
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO user (name, email, password, age) VALUES
            ('Ana López', 'ana@example.com', '12345', 25),
            ('Luis Gómez', 'luis@example.com', '12345', 30)
        `);
    }

    /**
     * Método down: Se ejecuta al revertir la migración
     * Elimina los registros insertados en el método up según sus correos electrónicos
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM user WHERE email IN ('ana@example.com', 'luis@example.com')
        `);
    }
}