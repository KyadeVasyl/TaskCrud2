import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoEntity } from "./photo.entity";
import { ValidNumIdGuard } from "./guard/valid-id.guard";
import { ValidUUIdGuard } from "../product/guard/valid-id.guard";

@Controller("photo")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post("create")
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Get("list")
  findAll() {
    return this.photoService.findAll();
  }

  @UseGuards(ValidNumIdGuard)
  @Get(":photoId")
  findOne(@Param("photoId") id: string) {
    return this.photoService.findOnePhoto(+id);
  }

  @UseGuards(ValidNumIdGuard)
  @Patch(":photoId")
  update(@Param("photoId") id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @UseGuards(ValidNumIdGuard, ValidUUIdGuard)
  @Post(":photoId/product/:productId")
  async addPhotoToProduct(
    @Param("photoId", ParseIntPipe) photoId: number,
    @Param("productId") productId: string
  ): Promise<PhotoEntity> {
    return await this.photoService.addPhotoToProduct(productId, photoId);
  }

  @UseGuards(ValidNumIdGuard)
  @Delete(":photoId")
  remove(@Param("photoId") id: string) {
    return this.photoService.delete(+id);
  }
}
