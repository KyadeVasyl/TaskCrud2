import { createParamDecorator } from "@nestjs/common";
import { ProductEntity } from "../product.entity";

export const GetProduct = createParamDecorator((data: string, context) => {
  const product: ProductEntity = context.switchToHttp().getRequest().product;

  return data ? product && product[data] : product;
});
