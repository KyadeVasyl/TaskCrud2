import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = {
      name: createProductDto.name,
      price: +createProductDto.price,
      description: createProductDto.description,
    };

    if (!newProduct)
      throw new BadRequestException("something went wrong with the request");
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    const products = await this.productRepository.find({
      order: {
        createdAt: "DESC",
      },
    });

    if (!products) throw new NotFoundException("No Products");
    return products;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException("no product with such id");

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException("no product with such id");

    return await this.productRepository.update(id, updateProductDto);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) throw new NotFoundException("no product with such id");

    return await this.productRepository.delete(id);
  }
}
