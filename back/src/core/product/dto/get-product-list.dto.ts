import { IsNotEmpty, IsObject } from "class-validator";
import { ProductEntity } from "../product.entity";

export class GetProductListDto {
  @IsObject({ each: true })
  @IsNotEmpty()
  list: ProductEntity[];
}
