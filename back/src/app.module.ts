import { Module } from "@nestjs/common";
import { ProductModule } from "./core/product/product.module";
import { PhotoModule } from "./core/photo/photo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./config/data-source.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    ProductModule,
    PhotoModule,
  ],
})
export class AppModule {}
