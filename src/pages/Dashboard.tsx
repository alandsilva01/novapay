import { useAuthStore } from '@/store/authStore'
import { useTransactionStore } from '@/store/transactionStore'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  const { balance, transactions } = useTransactionStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 p-6 font-mono">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neon-cyan tracking-widest">NOVAPAY</h1>
            <p className="text-xs text-slate-400">Ola, {user?.name}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 text-xs uppercase tracking-wider">
            Sair
          </Button>
        </div>
        <Card className="border border-neon-cyan/20 bg-dark-800 shadow-[0_0_30px_rgba(0,245,255,0.08)]">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Saldo disponivel</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-neon-cyan">
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </CardContent>
        </Card>
        <Button onClick={() => navigate('/transfer')} className="w-full bg-neon-cyan text-dark-900 font-bold uppercase tracking-widest hover:bg-neon-cyan/80">
          Nova Transferencia
        </Button>
        <Card className="border border-neon-cyan/20 bg-dark-800">
          <CardHeader>
            <CardTitle className="text-xs uppercase tracking-widest text-slate-400">Extrato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b border-dark-600 pb-2">
                <div>
                  <p className="text-sm text-slate-200">{tx.description}</p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
                <p className={tx.type === 'credit' ? 'text-sm font-bold text-neon-green' : 'text-sm font-bold text-red-400'}>
                  {tx.type === 'credit' ? '+' : '-'}
                  {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
