import { Module } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";
import { PhotoRepository } from "./photo.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoEntity } from "./photo.entity";
import { ProductEntity } from "src/core/product/product.entity";

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity, ProductEntity])],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepository],
  exports: [PhotoService],
})
export class PhotoModule {}
