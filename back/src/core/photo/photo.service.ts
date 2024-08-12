import { Injectable } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoEntity } from "./photo.entity";
import { PhotoRepository } from "./photo.repository";
import { GetPhotoListDto } from "./dto/get-photo-list.dto";
import { GetPhotoDataDto } from "./dto/get-photo-data.dto";

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    return await this.photoRepository.createPhoto(createPhotoDto);
  }

  async getList(): Promise<GetPhotoListDto> {
    return {
      list: await this.photoRepository
        .createQueryBuilder("photo")
        .select(["photo.id", "photo.name", "photo.url", "photo.description"])
        .orderBy("photo.createdAt", "DESC")
        .getMany(),
    };
  }

  async getOne(photo: PhotoEntity): Promise<GetPhotoDataDto> {
    return {
      name: photo.name,
      description: photo.description,
      url: photo.url,
      product: photo.product,
    };
  }

  async update(
    photo: PhotoEntity,
    updatePhotoDto: UpdatePhotoDto
  ): Promise<PhotoEntity> {
    return await this.photoRepository.updatePhoto(photo, updatePhotoDto);
  }

  async delete(photo: PhotoEntity): Promise<void> {
    await this.photoRepository.deletePhoto(photo.id);
  }

  async deletePhotosByProduct(productId: string): Promise<void> {
    await this.photoRepository.delete({ product: { id: productId } });
  }
}
