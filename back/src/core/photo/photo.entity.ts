import { IsUrl } from "class-validator";
import { ProductEntity } from "src/core/product/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("photo")
export class PhotoEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    length: 15,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  description: string;

  @Column()
  @IsUrl({}, { message: "Invalid URL" })
  url: string;

  @Column({
    type: "boolean",
    default: false,
  })
  isPublished: boolean;

  @ManyToOne(() => ProductEntity, (product) => product.photos)
  @JoinColumn({ name: "product_id" })
  product?: ProductEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
