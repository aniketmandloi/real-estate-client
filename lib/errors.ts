import { Prisma } from "@prisma/client";

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors
    switch (error.code) {
      case "P2002":
        throw new DatabaseError("Duplicate entry found");
      case "P2025":
        throw new DatabaseError("Record not found");
      default:
        throw new DatabaseError(`Database error: ${error.message}`);
    }
  }

  throw new DatabaseError(
    error instanceof Error ? error.message : "Database operation failed"
  );
}
