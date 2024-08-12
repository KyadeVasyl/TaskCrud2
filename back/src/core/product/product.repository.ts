import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source.config";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PhotoEntity } from "../photo/photo.entity";
import { PRODUCT_ERROR } from "./enum/product-error.enum";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor() {
    super(ProductEntity, AppDataSource.manager);
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const product = new ProductEntity();

    if (createProductDto.name) {
      product.name = createProductDto.name;
    }

    if (createProductDto.price) {
      product.price = createProductDto.price;
    }

    if (createProductDto.description) {
      product.description = createProductDto.description;
    }

    if (createProductDto.photos) {
      product.photos = createProductDto.photos.map((photoDto) => {
        const photo = new PhotoEntity();
        photo.name = photoDto.name;
        photo.description = photoDto.description;
        photo.url = photoDto.url;
        return photo;
      });
    }

    try {
      return await this.save(product);
    } catch (err) {
      Logger.debug(err.message);
      throw new BadRequestException(PRODUCT_ERROR.CREATE_PRODUCT_ITEM);
    }
  }

  async updateProduct(
    product: ProductEntity,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    try {
      const { name, price, description, photos } = updateProductDto;

      if (name && name !== product.name) {
        product.name = name;
      }

      if (price && price !== product.price) {
        product.price = price;
      }

      if (description && description !== product.description) {
        product.description = description;
      }

      if (photos !== undefined) {
        if (photos.length === 0) {
          product.photos = [];
        } else {
          product.photos = await Promise.all(
            photos.map(async (photoDto, index) => {
              if (product.photos[index]) {
                const existingPhoto = product.photos[index];
                return Object.assign(existingPhoto, photoDto);
              } else {
                const newPhoto = new PhotoEntity();
                newPhoto.name = photoDto.name;
                newPhoto.description = photoDto.description;
                newPhoto.url = photoDto.url;
                return newPhoto;
              }
            })
          );
        }
      }

      return await this.save(product);
    } catch (err) {
      Logger.debug(err.message);
      throw new BadRequestException(PRODUCT_ERROR.UPDATE_PRODUCT_ITEM);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.delete(productId);
  }
}
