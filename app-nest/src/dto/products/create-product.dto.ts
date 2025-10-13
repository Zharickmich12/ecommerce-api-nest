import { IsInt, IsNotEmpty } from "class-validator";

/**
 * DTO (Data Transfer Object) para la creación de un nuevo producto.
 * 
 * Este objeto define los campos requeridos y las validaciones necesarias
 * para registrar correctamente un producto en el sistema.
 */
export class CreateProductDTO {

    /**
     * Nombre del producto.
     * 
     * @example "Aceite de coco"
     * @type {string}
     * @required Sí
     * @validation No puede estar vacío.
     */
    @IsNotEmpty()
    name: string;

    /**
     * Descripción breve del producto.
     * 
     * @example "Aceite 100% natural prensado en frío, ideal para cocinar o uso cosmético."
     * @type {string}
     * @required Sí
     * @validation No puede estar vacío.
     */
    @IsNotEmpty()
    description: string;

    /**
     * Precio del producto.
     * 
     * @example 15000
     * @type {number}
     * @required Sí
     * @validation Debe ser un número entero. No puede estar vacío.
     */
    @IsNotEmpty()
    @IsInt()
    price: number;
    
    /**
     * Cantidad disponible del producto en inventario.
     * 
     * @example 30
     * @type {number}
     * @required Sí
     * @validation Debe ser un número entero. No puede estar vacío.
     */
    @IsNotEmpty()
    @IsInt()
    stock: number;
}
