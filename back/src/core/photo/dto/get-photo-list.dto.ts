import { IsNotEmpty, IsObject } from "class-validator";
import { PhotoEntity } from "../photo.entity";

export class GetPhotoListDto {
  @IsObject({ each: true })
  @IsNotEmpty()
  list: PhotoEntity[];
}
