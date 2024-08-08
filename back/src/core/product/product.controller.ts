import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ValidUUIdGuard } from "./guard/valid-id.guard";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("create")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get("list")
  findAll() {
    return this.productService.findAllProducts();
  }

  @UseGuards(ValidUUIdGuard)
  @Get(":productId")
  findOne(@Param("productId") id: string) {
    return this.productService.findOneProduct(id);
  }

  @UseGuards(ValidUUIdGuard)
  @Patch(":productId")
  update(
    @Param("productId") id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @UseGuards(ValidUUIdGuard)
  @Delete(":productId")
  remove(@Param("productId") id: string) {
    return this.productService.deleteProduct(id);
  }
}
