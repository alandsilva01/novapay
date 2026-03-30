import { create } from 'zustand'

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  description: string
  amount: number
  date: string
}

interface TransactionState {
  balance: number
  transactions: Transaction[]
  transfer: (amount: number, description: string) => void
}

export const useTransactionStore = create<TransactionState>()((set) => ({
  balance: 15750.00,
  transactions: [
    { id: '1', type: 'credit', description: 'Salário', amount: 8000, date: '2025-03-01' },
    { id: '2', type: 'debit', description: 'Aluguel', amount: 1500, date: '2025-03-05' },
    { id: '3', type: 'credit', description: 'Freelance', amount: 2500, date: '2025-03-10' },
    { id: '4', type: 'debit', description: 'Supermercado', amount: 350, date: '2025-03-15' },
    { id: '5', type: 'debit', description: 'Streaming', amount: 55, date: '2025-03-18' },
  ],
  transfer: (amount, description) =>
    set((state) => ({
      balance: state.balance - amount,
      transactions: [
        {
          id: crypto.randomUUID(),
          type: 'debit',
          description,
          amount,
          date: new Date().toISOString().split('T')[0],
        },
        ...state.transactions,
      ],
    })),
}))