import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProducts1760309489709 implements MigrationInterface {
    name = 'SeedProducts1760309489709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO product (name, description, price, category)
            VALUES 
            ('Shampoo hidratante', 'Ideal para cabello seco, con aloe vera y vitaminas', 12000, 'Cuidado personal'),
            ('Crema corporal', 'Hidratante diaria con aroma suave', 10000, 'Cuidado personal'),
            ('Cepillo dental', 'Cerdas suaves, mango ergonómico', 5000, 'Higiene'),
            ('Arroz blanco 1kg', 'Grano largo, ideal para acompañar comidas', 4500, 'Alimentos'),
            ('Aceite vegetal 1L', 'Aceite de cocina de girasol, 100% natural', 11000, 'Alimentos')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM product 
            WHERE name IN (
                'Shampoo hidratante',
                'Crema corporal',
                'Cepillo dental',
                'Arroz blanco 1kg',
                'Aceite vegetal 1L'
            )
        `);
    }
}