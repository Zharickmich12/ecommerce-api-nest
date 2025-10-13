import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Entidad `Product`
 * 
 * Representa un producto dentro del sistema.
 * Cada producto contiene información como nombre, descripción, precio,
 * estado y categoría. 
 * 
 * Esta entidad se mapea directamente a la tabla `product` en la base de datos
 * mediante TypeORM.
 */
@Entity()
export class Product {
  /**
   * Identificador único del producto.
   * 
   * @type {number}
   * @generated Valor autoincremental generado automáticamente por la base de datos.
   * @example 1
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre único del producto.
   * 
   * Se utiliza para identificar y evitar duplicados en la base de datos.
   * 
   * @type {string}
   * @unique Sí
   * @example "Aceite de coco"
   */
  @Column({ unique: true })
  name: string;

  /**
   * Descripción detallada del producto.
   * 
   * Puede incluir características, ingredientes o cualquier información relevante.
   * 
   * @type {string}
   * @example "Aceite, 100% natural y sin aditivos."
   */
  @Column()
  description: string;

  /**
   * Precio del producto.
   * 
   * Se almacena como un valor decimal con precisión de dos dígitos.
   * 
   * @type {number}
   * @precision 10
   * @scale 2
   * @example 15000.00
   */
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  /**
   * Estado del producto.
   * 
   * Indica si el producto está disponible (activo) o no (inactivo).
   * 
   * @type {boolean}
   * @default true
   * @example true // Producto activo
   */
  @Column({ default: true })
  status: boolean;

  /**
   * Categoría a la que pertenece el producto.
   * 
   * Es opcional y permite clasificar los productos según su tipo o uso.
   * 
   * @type {string}
   * @nullable Sí
   * @example "Alimentos naturales"
   */
  @Column({ nullable: true })
  category: string;
}