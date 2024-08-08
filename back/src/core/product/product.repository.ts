import { Repository } from "typeorm";
import { ProductEntity } from "./product.entity";
import { Injectable } from "@nestjs/common";
import { AppDataSource } from "src/config/data-source.config";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor() {
    super(ProductEntity, AppDataSource.manager);
  }

  async createProduct(
    createProductDto: CreateProductDto
  ): Promise<ProductEntity> {
    const product = this.create(createProductDto);
    return await this.save(product);
  }

  async findAllProducts(): Promise<ProductEntity[]> {
    return this.createQueryBuilder("product")
      .select([
        "product.id",
        "product.name",
        "product.price",
        "product.description",
        "product.numericId",
      ])
      .orderBy("product.createdAt", "DESC")
      .getMany();
  }

  async findOneProduct(id: string): Promise<ProductEntity> {
    const product = await this.createQueryBuilder("product")
      .select([
        "product.id",
        "product.name",
        "product.price",
        "product.description",
        "product.numericId",
      ])
      .where("product.id = :id", { id })
      .getOne();

    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: any
  ): Promise<ProductEntity> {
    const product = await this.findOneProduct(id);
    Object.assign(product, updateProductDto);
    return this.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    await this.delete(id);
  }
}
