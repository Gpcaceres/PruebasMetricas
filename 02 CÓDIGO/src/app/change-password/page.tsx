'use client'

import { Form } from '@/components/Form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { AxiosRequestConfig } from 'axios'
import { useSearchParams } from 'next/navigation'

export default function LoginPage () {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const changePassword = async (formData: any) => {
    startLoading()

    const token = searchParams.get('token')

    const options: AxiosRequestConfig<any> = {
      headers: {
        token
      }
    }

    await authFetch({
      endpoint: 'change-password',
      redirectRoute: '/',
      formData,
      options
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
        title='Cambiat tu contraseña'
        description='Formulario para cambiar tu contraseña'
        onSubmit={changePassword}
      >
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input
            placeholder='Ingresa tu nueva contraseña...'
            label='Contraseña'
            name='newPassword'
            type='password'
          />
          <Form.Input
            placeholder='Repite tu contraseña...'
            label='Confirmar contraseña'
            name='confirmPassword'
            type='password'
          />
        </div>
        <Form.SubmitButton
          buttonText='Cambiar Contraseña'
          isLoading={isLoading}
        />
      </Form>
    </main>
  )
}
