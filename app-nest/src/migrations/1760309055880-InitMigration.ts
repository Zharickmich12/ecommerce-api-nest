import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1760309055880 implements MigrationInterface {
    name = 'InitMigration1760309055880'

    /**
     * Método up: Se ejecuta al aplicar la migración
     * Crea la tabla `user` con los siguientes campos:
     * - id: identificador único autoincremental
     * - name: nombre del usuario (obligatorio)
     * - email: correo electrónico único del usuario (obligatorio)
     * - password: contraseña del usuario (obligatorio)
     * - age: edad del usuario (opcional)
     * - role: rol del usuario (por defecto 'user')
     * Además se crea un índice único en el campo email.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`name\` varchar(255) NOT NULL,
            \`email\` varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            \`age\` int NULL,
            \`role\` varchar(255) NOT NULL DEFAULT 'user',
            UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB`);
    }

    /**
     * Método down: Se ejecuta al revertir la migración
     * Elimina el índice único del campo email y luego la tabla `user`
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}