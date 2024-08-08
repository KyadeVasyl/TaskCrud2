import { Module } from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { PhotoController } from "./photo.controller";
import { PhotoRepository } from "./photo.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoEntity } from "./photo.entity";
import { ProductEntity } from "src/core/product/product.entity";
import { ProductRepository } from "src/core/product/product.repository";

@Module({
  imports: [TypeOrmModule.forFeature([PhotoEntity, ProductEntity])],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepository, ProductRepository],
  exports: [PhotoService],
})
export class PhotoModule {}
