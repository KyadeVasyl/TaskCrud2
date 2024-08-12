import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PhotoService } from "./photo.service";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { PhotoEntity } from "./photo.entity";
import { PhotoGuard } from "./guard/photo.guard";
import { GetPhoto } from "./decorator/get-photo.decorator";
import { GetPhotoListDto } from "./dto/get-photo-list.dto";
import { GetPhotoDataDto } from "./dto/get-photo-data.dto";

@Controller("photo")
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post("create")
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<PhotoEntity> {
    return this.photoService.create(createPhotoDto);
  }

  @Get("list")
  findAll(): Promise<GetPhotoListDto> {
    return this.photoService.getList();
  }

  @UseGuards(PhotoGuard)
  @Get(":photoId")
  findOne(@GetPhoto() photo: PhotoEntity): Promise<GetPhotoDataDto> {
    return this.photoService.getOne(photo);
  }

  @UseGuards(PhotoGuard)
  @Patch(":photoId")
  update(
    @GetPhoto() photo: PhotoEntity,
    @Body() updatePhotoDto: UpdatePhotoDto
  ): Promise<PhotoEntity> {
    return this.photoService.update(photo, updatePhotoDto);
  }

  @UseGuards(PhotoGuard)
  @Delete(":photoId")
  remove(@GetPhoto() photo: PhotoEntity): Promise<void> {
    return this.photoService.delete(photo);
  }
}
