import { z } from 'zod'

export const transferSchema = z.object({
  recipient: z.string().min(3, 'Nome deve ter no minimo 3 caracteres'),
  amount: z.coerce.number().positive('Valor deve ser positivo').min(1, 'Valor minimo e R$ 1,00'),
  description: z.string().min(3, 'Descricao deve ter no minimo 3 caracteres'),
})

export type TransferFormData = z.infer<typeof transferSchema>
