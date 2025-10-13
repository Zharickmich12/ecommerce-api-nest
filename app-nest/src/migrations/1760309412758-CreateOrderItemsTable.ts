import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderItemsTable1760309412758 implements MigrationInterface {
    name = 'CreateOrderItemsTable1760309412758'

    /**
     * Método up: Se ejecuta al aplicar la migración
     * Crea la tabla `order_item` con las siguientes columnas:
     * - id: identificador único del item de la orden, auto-incremental
     * - orderId: id de la orden a la que pertenece el item, obligatorio, clave foránea hacia la tabla `order`
     * - productId: id del producto del item, obligatorio, clave foránea hacia la tabla `product`
     * - quantity: cantidad de productos en el item, por defecto 1
     * - price: precio del producto en el momento de la orden
     * Se crean restricciones de clave foránea:
     * - `FK_order_item_order` hacia `order(id)` con eliminación en cascada
     * - `FK_order_item_product` hacia `product(id)` con eliminación en cascada
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`order_item\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`orderId\` int NOT NULL,
                \`productId\` int NOT NULL,
                \`quantity\` int NOT NULL DEFAULT 1,
                \`price\` decimal(10,2) NOT NULL,
                PRIMARY KEY (\`id\`),
                CONSTRAINT \`FK_order_item_order\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE,
                CONSTRAINT \`FK_order_item_product\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE
            ) ENGINE=InnoDB
        `);
    }

    /**
     * Método down: Se ejecuta al revertir la migración
     * Elimina la tabla `order_item` y las restricciones de clave foránea asociadas.
     * @param queryRunner - Objeto que permite ejecutar queries en la base de datos
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_order_item_order\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_order_item_product\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
    }
}