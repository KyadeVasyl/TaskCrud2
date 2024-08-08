import { Repository } from "typeorm";
import { PhotoEntity } from "./photo.entity";
import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source.config";

@Injectable()
export class PhotoRepository extends Repository<PhotoEntity> {
  constructor() {
    super(PhotoEntity, AppDataSource.manager);
  }

  async createPhoto(photo: PhotoEntity): Promise<PhotoEntity> {
    return this.save(photo);
  }

  async findAllPhotos(): Promise<PhotoEntity[]> {
    return this.createQueryBuilder("photo")
      .leftJoinAndSelect("photo.product", "product")
      .select(["photo.id", "photo.name", "photo.url", "product.id"])
      .orderBy("photo.createdAt", "DESC")
      .getMany();
  }

  async findOnePhoto(id: number): Promise<PhotoEntity> {
    return this.createQueryBuilder("photo")
      .leftJoinAndSelect("photo.product", "product")
      .select(["photo.id", "photo.name", "photo.url", "product.id"])
      .where("photo.id = :id", { id })
      .getOne();
  }

  async savePhoto(photo: PhotoEntity): Promise<PhotoEntity> {
    return this.save(photo);
  }

  async deletePhoto(id: number): Promise<void> {
    await this.delete(id);
  }
}
