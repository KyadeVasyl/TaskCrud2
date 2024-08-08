import { ProductEntity } from "src/core/product/product.entity";
import { PhotoEntity } from "src/core/photo/photo.entity";
import { DataSource } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("config");

const DATABASE_CONFIG = config.get("DATABASE");

export const Entities = [ProductEntity, PhotoEntity];

export const AppDataSource = new DataSource({
  type: DATABASE_CONFIG.TYPE as "postgres",
  host: DATABASE_CONFIG.HOST,
  port: DATABASE_CONFIG.PORT,
  username: DATABASE_CONFIG.USERNAME,
  password: DATABASE_CONFIG.PASSWORD,
  database: DATABASE_CONFIG.NAME,
  entities: [ProductEntity, PhotoEntity],
  synchronize: DATABASE_CONFIG.SYNCHRONIZE,
});
