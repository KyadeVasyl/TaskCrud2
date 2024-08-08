import {
  Injectable,
  CanActivate,
  BadRequestException,
  ExecutionContext,
} from "@nestjs/common";

@Injectable()
export class ValidUUIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { productId } = request.params;

    if (!productId || !this.isValidUUID(productId)) {
      throw new BadRequestException("Invalid or missing photoId");
    }
    return true;
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
