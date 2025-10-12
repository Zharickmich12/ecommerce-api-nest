import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderItemsTable1760309412758 implements MigrationInterface {
    name = 'CreateOrderItemsTable1760309412758'

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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_order_item_order\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_order_item_product\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
    }
}