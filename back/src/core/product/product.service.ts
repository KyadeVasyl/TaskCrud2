import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductRepository } from "./product.repository";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./product.entity";
import { GetProductDataDto } from "./dto/get-product.dto";
import { GetProductListDto } from "./dto/get-product-list.dto";
import { PhotoService } from "../photo/photo.service";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly photoService: PhotoService
  ) {}

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    return await this.productRepository.createProduct(createProductDto);
  }

  async getProductList(): Promise<GetProductListDto> {
    return {
      list: await this.productRepository
        .createQueryBuilder("product")
        .leftJoinAndSelect("product.photos", "photo")
        .orderBy("product.createdAt", "DESC")
        .getMany(),
    };
  }

  async getProduct(product: ProductEntity): Promise<GetProductDataDto> {
    return {
      id: product.id,
      numericId: product.numericId,
      name: product.name,
      description: product.description,
      price: product.price,
      photos: product.photos,
    };
  }

  async updateProduct(
    product: ProductEntity,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    return await this.productRepository.updateProduct(
      product,
      updateProductDto
    );
  }

  async deleteProduct(product: ProductEntity): Promise<void> {
    if (product.photos && product.photos.length > 0) {
      await this.photoService.deletePhotosByProduct(product.id);
    }

    await this.productRepository.deleteProduct(product.id);
  }
}
