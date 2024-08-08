import { NotFoundException, BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";

export async function findEntityById<T>(
  repository: Repository<any>,
  id: string | number,
  entityName: string
): Promise<T> {
  const entity = await repository.findOne({ where: { id } });
  if (!entity) {
    throw new NotFoundException(`${entityName} not found`);
  }
  return entity;
}

export async function handleDatabaseOperation<T>(
  operation: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await operation();
  } catch (err) {
    throw new BadRequestException(errorMessage, err.message);
  }
}
