import { PartialType } from "@nestjs/mapped-types";
import { CreatePhotoDto } from "./create-photo.dto";
import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsString()
  name?: string;

  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsString()
  description?: string;

  @Transform(({ value }) => (value === undefined ? undefined : value))
  @IsString()
  url?: string;
}
