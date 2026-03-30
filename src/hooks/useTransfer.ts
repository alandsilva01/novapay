import { useState } from 'react'
import { useTransactionStore } from '@/store/transactionStore'
import { TransferFormData } from '@/schemas/transferSchema'

export function useTransfer() {
  const { balance, transfer } = useTransactionStore()
  const [insufficientFunds, setInsufficientFunds] = useState(false)

  const execute = (data: TransferFormData): boolean => {
    if (data.amount > balance) {
      setInsufficientFunds(true)
      return false
    }
    setInsufficientFunds(false)
    transfer(data.amount, 'Transferencia para ' + data.recipient + ': ' + data.description)
    return true
  }

  return { execute, insufficientFunds, balance }
}
