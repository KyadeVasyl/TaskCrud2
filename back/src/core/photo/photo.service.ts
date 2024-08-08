import { Injectable } from "@nestjs/common";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoEntity } from "./photo.entity";
import { PhotoRepository } from "./photo.repository";
import { ProductRepository } from "src/core/product/product.repository";
import {
  findEntityById,
  handleDatabaseOperation,
} from "src/util/service-helpers";

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly productRepository: ProductRepository
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    const photo = Object.assign(new PhotoEntity(), createPhotoDto);

    if (createPhotoDto.product) {
      photo.product = await findEntityById(
        this.productRepository,
        createPhotoDto.product.id,
        "Product"
      );
    }

    return handleDatabaseOperation(
      () => this.photoRepository.savePhoto(photo),
      "Error creating photo"
    );
  }

  async findAll(): Promise<PhotoEntity[]> {
    return handleDatabaseOperation(
      () => this.photoRepository.findAllPhotos(),
      "Error finding all photos"
    );
  }

  async findOnePhoto(id: number): Promise<PhotoEntity> {
    return findEntityById(this.photoRepository, id, "Photo");
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto
  ): Promise<PhotoEntity> {
    const photo = await this.findOnePhoto(id);
    Object.assign(photo, updatePhotoDto);

    return handleDatabaseOperation(
      () => this.photoRepository.savePhoto(photo),
      "Error updating photo"
    );
  }

  async delete(id: number): Promise<{ deleted: boolean }> {
    await this.findOnePhoto(id);

    return handleDatabaseOperation(async () => {
      await this.photoRepository.deletePhoto(id);
      return { deleted: true };
    }, "Error deleting photo");
  }

  async addPhotoToProduct(
    productId: string,
    photoId: number
  ): Promise<PhotoEntity> {
    const photo = await this.findOnePhoto(photoId);
    photo.product = await findEntityById(
      this.productRepository,
      productId,
      "Product"
    );

    return handleDatabaseOperation(
      () => this.photoRepository.savePhoto(photo),
      "Error adding photo to product"
    );
  }

  async deletePhotosByProductId(productId: string): Promise<void> {
    const photos = await this.photoRepository.find({
      where: { product: { id: productId } },
    });

    for (const photo of photos) {
      await this.photoRepository.delete(photo.id);
    }
  }
}
