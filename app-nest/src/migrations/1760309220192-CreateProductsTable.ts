import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1760309220192 implements MigrationInterface {
    name = 'CreateProductsTable1760309220192'

    /**
     * Método up: Se ejecuta al aplicar la migración
     * Crea la tabla `product` con las siguientes columnas:
     * - id: identificador único, auto-incremental
     * - name: nombre del producto, único y obligatorio
     * - description: descripción del producto, opcional
     * - price: precio del producto, obligatorio
     * - category: categoría del producto, opcional
     * - status: estado activo/inactivo del producto, por defecto true
     * - createdAt: fecha de creación, por defecto la fecha actual
     * - updatedAt: fecha de actualización, se actualiza automáticamente al modificar el registro
     * También crea un índice único en la columna `name`.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`product\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(100) NOT NULL,
                \`description\` text NULL,
                \`price\` decimal(10,2) NOT NULL,
                \`category\` varchar(100) NULL,
                \`status\` boolean NOT NULL DEFAULT true,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE INDEX \`IDX_product_name\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    /**
     * Método down: Se ejecuta al revertir la migración
     * Elimina la tabla `product` y el índice único creado en `name`.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_product_name\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }
}