import {
  Injectable,
  CanActivate,
  BadRequestException,
  ExecutionContext,
} from "@nestjs/common";

@Injectable()
export class ValidNumIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const { photoId } = request.params;

    if (!photoId || !this.isValidNumeric(photoId)) {
      throw new BadRequestException("Invalid or missing photoId");
    }
    return true;
  }

  private isValidNumeric(id: string): boolean {
    return !isNaN(Number(id)) && Number(id) > 0;
  }
}
