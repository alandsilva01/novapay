import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { loginSchema, LoginFormData } from '@/schemas/authSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormData) => {
    if (
      data.email === 'user@novapay.com' &&
      data.password === 'novapay123'
    ) {
      login({ name: 'Alan Silva', email: data.email })
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      <Card className="w-full max-w-md border border-neon-cyan/20 bg-dark-800 shadow-[0_0_30px_rgba(0,245,255,0.1)]">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-3xl font-mono font-bold text-neon-cyan tracking-widest">
            NOVAPAY
          </CardTitle>
          <p className="text-sm text-slate-400 font-mono">acesso ao sistema</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="user@novapay.com"
              className="bg-dark-700 border-neon-cyan/20 text-slate-100 font-mono focus:border-neon-cyan focus:ring-neon-cyan/20"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-red-400 font-mono">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-slate-300 font-mono text-xs uppercase tracking-wider">
              Senha
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="bg-dark-700 border-neon-cyan/20 text-slate-100 font-mono focus:border-neon-cyan focus:ring-neon-cyan/20"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-red-400 font-mono">{errors.password.message}</p>
            )}
          </div>

          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full font-mono uppercase tracking-widest bg-neon-cyan text-dark-900 hover:bg-neon-cyan/80 font-bold"
          >
            Entrar
          </Button>

          <p className="text-center text-xs text-slate-500 font-mono">
            user@novapay.com / novapay123
          </p>
        </CardContent>
      </Card>
    </div>
  )
}