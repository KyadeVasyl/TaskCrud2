import { createParamDecorator } from "@nestjs/common";
import { PhotoEntity } from "../photo.entity";

export const GetPhoto = createParamDecorator((data: string, context) => {
  const photo: PhotoEntity = context.switchToHttp().getRequest().photo;

  return data ? photo && photo[data] : photo;
});
