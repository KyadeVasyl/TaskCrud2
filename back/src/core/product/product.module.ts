import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { ProductRepository } from "./product.repository";
import { PhotoEntity } from "src/core/photo/photo.entity";
import { PhotoModule } from "src/core/photo/photo.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, PhotoEntity]),

    PhotoModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
