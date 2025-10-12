import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1760309290844 implements MigrationInterface {
    name = 'CreateOrdersTable1760309290844'

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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_order_user\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }
}