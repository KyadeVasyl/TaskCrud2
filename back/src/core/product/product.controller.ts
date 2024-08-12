import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductGuard } from "./guard/product.guard";
import { GetProduct } from "./decorator/get-product.decorator";
import { ProductEntity } from "./product.entity";
import { GetProductDataDto } from "./dto/get-product.dto";
import { GetProductListDto } from "./dto/get-product-list.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.createProduct(createProductDto);
  }

  @Get("list")
  findAll(): Promise<GetProductListDto> {
    return this.productService.getProductList();
  }

  @UseGuards(ProductGuard)
  @Get(":productId")
  findOne(@GetProduct() product: ProductEntity): Promise<GetProductDataDto> {
    return this.productService.getProduct(product);
  }

  @UseGuards(ProductGuard)
  @Patch(":productId")
  update(
    @GetProduct() product: ProductEntity,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productService.updateProduct(product, updateProductDto);
  }

  @UseGuards(ProductGuard)
  @Delete(":productId")
  remove(@GetProduct() product: ProductEntity): Promise<void> {
    return this.productService.deleteProduct(product);
  }
}
