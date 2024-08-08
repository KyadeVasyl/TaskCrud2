import {
  IsBoolean,
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
  @IsUrl()
  url: string;

  @IsBoolean()
  isPublished: boolean;
  @IsOptional()
  @IsObject()
  product?: ProductEntity;
}
