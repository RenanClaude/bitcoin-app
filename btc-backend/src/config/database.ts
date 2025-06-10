import prisma from '../infrastructure/database/prisma/prisma-client';

export async function initializeDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
}

export async function closeDatabase(): Promise<void> {
  await prisma.$disconnect();
}