import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1760309290844 implements MigrationInterface {
    name = 'CreateOrdersTable1760309290844'

    /**
     * Método up: Se ejecuta al aplicar la migración
     * Crea la tabla `order` con las siguientes columnas:
     * - id: identificador único de la orden, auto-incremental
     * - userId: id del usuario que realizó la orden, obligatorio, clave foránea hacia la tabla `user`
     * - total: total de la orden, obligatorio
     * - status: estado de la orden, puede ser 'pending', 'paid' o 'cancelled', por defecto 'pending'
     * - createdAt: fecha de creación de la orden, por defecto la fecha actual
     * También se establece una restricción de clave foránea `FK_order_user` que referencia a `user(id)` y se elimina en cascada al borrar el usuario.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`order\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`userId\` int NOT NULL,
                \`total\` decimal(10,2) NOT NULL,
                \`status\` enum('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_order_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
    }

    /**
     * Método down: Se ejecuta al revertir la migración
     * Elimina la tabla `order` y la restricción de clave foránea asociada.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_order_user\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }
}