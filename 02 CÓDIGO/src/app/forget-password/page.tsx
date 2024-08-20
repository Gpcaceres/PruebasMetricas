'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'forget-password',
      formData
    })
    finishLoading()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-[url('/assets/images/grid.png')] ">
      <div className="flex flex-col gap-4 items-center max-w-screen-sm mb-16">
        <h1 className="text-5xl font-semibold text-gray-900 drop-shadow-xl">
          PROWESS Agrícola
        </h1>

        <p className="text-xl text-gray-600 text-center">
          ¡La Mejor Tienda de productos agrícolas del Ecuador!
        </p>
      </div>
      <Form
        title='Recuperar Contraseña'
        description='Formulario para recuperar tu contraseña'
        onSubmit={forgetPassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            label='Correo'
            name='email'
            placeholder='Ingresa tu correo...'
          />
        </div>
        <Form.SubmitButton
          buttonText='Recuperar Contraseña'
          isLoading={isLoading}
        />
        <Form.Footer
          description='Volver al inicio'
          textLink='Inicio'
          link='/'
        />
      </Form>
    </main>
  )
}
