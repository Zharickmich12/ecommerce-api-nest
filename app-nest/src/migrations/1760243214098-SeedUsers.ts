import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1759368651000 implements MigrationInterface {
    name = 'SeedUsers1759368651000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO user (name, email, password, age) VALUES
      ('Juan Jimenez', 'juan@example.com', '12345', 25),
      ('Joel Ruiz', 'joel@example.com', '12345', 30)
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                  DELETE FROM user WHERE email IN ('juan@example.com', 'joel@example.com')
            `)
    }
}