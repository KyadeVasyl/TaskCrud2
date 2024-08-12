import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhotoRepository } from "../photo.repository";
import { Repository } from "typeorm";
import { PhotoEntity } from "../photo.entity";
import { PHOTO_ERROR } from "../enum/photo-error.enum";

@Injectable()
export class PhotoGuard implements CanActivate {
  constructor(
    @InjectRepository(PhotoRepository)
    private photoRepository: Repository<PhotoEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { params } = request;

    if (!params.photoId) {
      throw new BadRequestException(PHOTO_ERROR.GUARD);
    }

    const photo = await this.photoRepository.findOne({
      where: { id: params.photoId },
      relations: ["product"],
    });

    if (!photo) {
      throw new NotFoundException(PHOTO_ERROR.PHOTO_WITH_THIS_ID_NOT_FOUND);
    }

    request.photo = photo;

    return true;
  }
}
