import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductEntity } from "../product.entity";
import { PRODUCT_ERROR } from "../enum/product-error.enum";

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { params } = request;

    if (!params.productId) {
      throw new BadRequestException(PRODUCT_ERROR.GUARD);
    }

    const product = await this.productRepository.findOne({
      where: { id: params.productId },
      relations: ["photos"],
    });

    if (!product) {
      throw new BadRequestException(
        PRODUCT_ERROR.PRODUCT_WITH_THIS_ID_NOT_FOUND
      );
    }

    request.product = product;
    return true;
  }
}
