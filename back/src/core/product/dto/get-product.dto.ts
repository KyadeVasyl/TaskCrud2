import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetProductDataDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  numericId: number;
}
