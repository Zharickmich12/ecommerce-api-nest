import { IsBoolean, IsNotEmpty } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";

/**
 * DTO (Data Transfer Object) para la actualización de un producto existente.
 * 
 * Hereda las propiedades y validaciones del `CreateProductDTO`,
 * agregando el campo `status` que permite activar o desactivar el producto.
 */
export class UpdateProductDTO extends CreateProductDTO {
    /**
     * Estado del producto.
     * 
     * Determina si el producto está activo o inactivo dentro del sistema.
     * 
     * @example true // Producto activo
     * @example false // Producto inactivo
     * @type {boolean}
     * @required Sí
     * @validation Debe ser un valor booleano (true o false) y no puede estar vacío.
     */
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}