import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTransactionStore } from '@/store/transactionStore'
import { transferSchema, TransferFormData } from '@/schemas/transferSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Transfer() {
  const navigate = useNavigate()
  const { balance, transfer } = useTransactionStore()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
  })

  const onSubmit = (data: TransferFormData) => {
    if (data.amount > balance) {
      setError('amount', { message: 'Saldo insuficiente' })
      return
    }
    transfer(data.amount, 'Transferencia para ' + data.recipient + ': ' + data.description)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 p-6 font-mono">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="text-neon-cyan text-xs uppercase tracking-wider hover:underline">
            &larr; Voltar
          </button>
          <h1 className="text-xl font-bold text-neon-cyan tracking-widest">TRANSFERENCIA</h1>
        </div>
        <Card className="border border-neon-cyan/20 bg-dark-800 shadow-[0_0_30px_rgba(0,245,255,0.08)]">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">
              Saldo disponivel: <span className="text-neon-cyan">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Destinatario</Label>
              <Input placeholder="Nome do destinatario" className="bg-dark-700 border-neon-cyan/20 text-slate-100 font-mono focus:border-neon-cyan" {...register('recipient')} />
              {errors.recipient && <p className="text-xs text-red-400">{errors.recipient.message}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Valor (R$)</Label>
              <Input type="number" placeholder="0.00" className="bg-dark-700 border-neon-cyan/20 text-slate-100 font-mono focus:border-neon-cyan" {...register('amount')} />
              {errors.amount && <p className="text-xs text-red-400">{errors.amount.message}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-slate-300 text-xs uppercase tracking-wider">Descricao</Label>
              <Input placeholder="Ex: Pagamento aluguel" className="bg-dark-700 border-neon-cyan/20 text-slate-100 font-mono focus:border-neon-cyan" {...register('description')} />
              {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
            </div>
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-neon-cyan text-dark-900 font-bold uppercase tracking-widest hover:bg-neon-cyan/80">
              Confirmar Transferencia
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
