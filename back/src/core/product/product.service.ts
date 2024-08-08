import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductRepository } from "./product.repository";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./product.entity";
import { PhotoService } from "src/core/photo/photo.service";
import {
  findEntityById,
  handleDatabaseOperation,
} from "src/util/service-helpers";

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly photoService: PhotoService
  ) {}

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    return handleDatabaseOperation(async () => {
      const product =
        await this.productRepository.createProduct(createProductDto);

      if (createProductDto.photos) {
        for (const photo of createProductDto.photos) {
          await this.photoService.create({ ...photo, product });
        }
      }

      return product;
    }, "Error creating product");
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return handleDatabaseOperation(
      () => this.productRepository.findAllProducts(),
      "Error finding all products"
    );
  }

  async findOneProduct(id: string): Promise<ProductEntity> {
    return findEntityById(this.productRepository, id, "Product");
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    const product = await this.findOneProduct(id);
    Object.assign(product, updateProductDto);

    return handleDatabaseOperation(
      () => this.productRepository.updateProduct(id, updateProductDto),
      "Error updating product"
    );
  }

  async deleteProduct(id: string): Promise<{ deleted: boolean }> {
    await this.findOneProduct(id);

    return handleDatabaseOperation(async () => {
      await this.photoService.deletePhotosByProductId(id);
      await this.productRepository.deleteProduct(id);
      return { deleted: true };
    }, "Error deleting product");
  }
}
