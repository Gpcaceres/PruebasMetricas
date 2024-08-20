'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData,
    })
    finishLoading()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')]">
      <div className="flex flex-col gap-4 items-center max-w-screen-sm mb-16">
        <h1 className="text-5xl font-semibold text-gray-900 drop-shadow-xl">
          PROWESS Agrícola
        </h1>

        <p className="text-xl text-gray-600 text-center">
          ¡La Mejor Tienda de productos agrícolas del Ecuador!
        </p>
      </div>
      <Form title='Registrate' onSubmit={register}>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo Electrónico'
            name='email'
            placeholder='Ingresa tu correo...'
          />
          <Form.Input
            placeholder='Ingresa tu contraseña...'
            label='Contraseña'
            name='password'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Repetir Contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton buttonText='Crear cuenta' isLoading={isLoading} />
        <Form.Footer
          description='Ya tienes cuenta?'
          textLink='Inicia Sesión'
          link='/'
        />
      </Form>
    </main>
  )
}
