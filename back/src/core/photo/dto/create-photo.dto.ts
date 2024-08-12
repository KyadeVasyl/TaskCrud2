import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator";
import { ProductEntity } from "src/core/product/product.entity";

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl({}, { message: "Invalid URL" })
  url: string;

  @IsOptional()
  @IsObject()
  product?: ProductEntity;
}
