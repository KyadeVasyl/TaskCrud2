import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppDataSource } from "./config/data-source.config";

async function bootstrap() {
  try {
    await AppDataSource.initialize();

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    app.enableCors();
    await app.listen(4000);
    console.log("App runs on: http://localhost:4000/api");
  } catch (error) {
    console.error("Error Data Source :", error);
  }
}
bootstrap();
