import { Repository } from "typeorm";
import { PhotoEntity } from "./photo.entity";
import { BadRequestException, Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source.config";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { PHOTO_ERROR } from "./enum/photo-error.enum";
import { Logger } from "@nestjs/common";
@Injectable()
export class PhotoRepository extends Repository<PhotoEntity> {
  constructor() {
    super(PhotoEntity, AppDataSource.manager);
  }

  async createPhoto(createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    const photo = new PhotoEntity();

    if (createPhotoDto.name) {
      photo.name = createPhotoDto.name;
    }

    if (createPhotoDto.description) {
      photo.description = createPhotoDto.description;
    }

    if (createPhotoDto.url) {
      photo.url = createPhotoDto.url;
    }

    if (createPhotoDto.product) {
      photo.product = createPhotoDto.product;
    }

    try {
      return await this.save(photo);
    } catch (err) {
      Logger.debug(err.message);
      throw new BadRequestException(PHOTO_ERROR.CREATE_PHOTO_ITEM);
    }
  }

  async updatePhoto(
    photo: PhotoEntity,
    updatePhotoDto: UpdatePhotoDto
  ): Promise<PhotoEntity> {
    try {
      const { name, description, url, product } = updatePhotoDto;

      if (name && name !== photo.name) {
        photo.name = name;
      }

      if (description && description !== photo.description) {
        photo.description = description;
      }

      if (url && url !== photo.url) {
        photo.url = url;
      }

      if (product && product !== photo.product) {
        photo.product = product;
      }

      return await this.save(photo);
    } catch (err) {
      Logger.error(err.message);
      throw new BadRequestException(PHOTO_ERROR.UPDATE_PHOTO_ITEM);
    }
  }

  async deletePhoto(photoId: number): Promise<void> {
    await this.delete(photoId);
  }
}
