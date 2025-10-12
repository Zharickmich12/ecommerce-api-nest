import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1760309220192 implements MigrationInterface {
    name = 'CreateProductsTable1760309220192'

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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_product_name\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }
}