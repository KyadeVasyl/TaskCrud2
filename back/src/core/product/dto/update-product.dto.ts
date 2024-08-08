import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CreatePhotoDto } from "src/core/photo/dto/create-photo.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsString()
  name?: string;

  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsNumber()
  price?: number;

  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsString()
  description?: string;

  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsOptional()
  photos?: CreatePhotoDto[];
}
