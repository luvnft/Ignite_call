import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  // Log de todas as queries executadas no banco
  log: ['query'],
})
