import { dateTransform } from '@/utils/dateTransform'
import TareaTarjeta from "@/components/TareaTarjeta";
import { Button } from "@/components/ui/button";
import { getTareas } from "@/lib/actions.tarea";
import Link from "next/link";

async function getData() {
  const res = await fetch('http://localhost:3000/api/users')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function HomePage() {
  const { users } = await getData()
  const tareas = await getTareas() as TareaInterface[];

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

      <div className="flex justify-end w-full mb-6">
        <Link href='/tareas/crear'>
          <Button variant="default">
            Crear Tarea
          </Button>
        </Link>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full max-w-[1024px] place-items-center">
        {tareas.map((tarea, index) => (
          <TareaTarjeta
            key={index}
            _id={tarea?._id}
            titulo={tarea.titulo}
            desc={tarea.descripcion}
            date={tarea.fechaACompletar as string}
            isCompleted={tarea.isCompleted}
          />
        ))}
      </section>

      <table className='text-left border m-[1rem] text-sm font-light'>
        <thead className='border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600'>
          <tr className='border-b text-center'>
            <th scope='col' className='px-6 py-4'>
              Tabla de Usuarios
            </th>
          </tr>
          <tr>
            <th scope='col' className='px-6 py-4'>#</th>
            <th scope='col' className='px-6 py-4'>Id</th>
            <th scope='col' className='px-6 py-4'>Email</th>
            <th scope='col' className='px-6 py-4'>Creado</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, index: number) => {
            const isEven = index % 2 === 0
            const bg = isEven ? 'bg-white dark:bg-neutral-600' : 'bg-neutral-100 dark:bg-neutral-700'

            return (
              <tr
                key={user._id}
                className={`${bg} border-b font-medium dark:border-neutral-500`}
              >
                <td className='whitespace-nowrap px-6 py-4 font-medium'>
                  {index + 1}
                </td>
                <td className='whitespace-nowrap px-6 py-4'>{user._id}</td>
                <td className='whitespace-nowrap px-6 py-4'>{user.email}</td>
                <td className='whitespace-nowrap px-6 py-4'>
                  {dateTransform(user.createdAt)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
