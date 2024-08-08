import { PhotoEntity } from "src/core/photo/photo.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "int",
    generated: "increment",
    unique: true,
  })
  numericId: number;

  @Column({
    type: "varchar",
    length: 20,
  })
  name: string;

  @Column({ type: "decimal" })
  price: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  description: string;

  @OneToMany(() => PhotoEntity, (photo) => photo.product, {
    cascade: true,
    onDelete: "CASCADE",
  })
  photos: PhotoEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
