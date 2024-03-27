import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'


function RegisterPage() {

    const {register, handleSubmit, formState:{errors}} = useForm()
    const { signUpTeam, isAuthenticated, errors: RegisterErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigate('/dashboard')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signUpTeam(values)
    })
    
  return (
    <div className='items-center justify-center flex h-[calc(100vh-100px)] p-5'>
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                RegisterErrors.map((error, i) =>(
                    <div className='bg-red-500 p-2 text-white rounded-md' key={i}>
                        {error}
                    </div>
                ))
            }
            <form 
                onSubmit={onSubmit}
            >
                <div className='flex flex-col'>
                    <input
                    type='text'
                    {...register('name', {
                        required: true
                    })}
                    className = 'w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700'
                    placeholder='Nombre'
                />
                {errors.name && (<p className='text-red-500'>Debe ingresar un nombre</p>)}
                <input
                    type='text'
                    {...register('lastname', {
                        required: true
                    })}
                    className = 'w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700'
                    placeholder='Apellido'
                />
                {errors.lastname && (<p className='text-red-500'>Name is required</p>)}
                </div>
                
                <input
                    type='text'
                    {...register('teamName', {
                        required: true,
                    })}
                    className = 'w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700'
                    placeholder='Nombre del club'
                />
                {errors.teamName && (<p className='text-red-500'>Team Name is required</p>)}
                <input
                    type='email'
                    {...register('email', {
                        required: true
                    })}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700'
                    placeholder='Correo electronico'
                />
                {errors.email && (<p className='text-red-500'>Email is required</p>)}
                <input type='password'
                {...register('password', {
                    required: true
                })}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700'
                placeholder='Contraseña'
                />
                {errors.password && (<p className='text-red-500'>Password is required</p>)}
                <button type='submit'
                    className='bg-green-600 rounded-md px-7 py-2'
                >
                    Registrase
                </button>
            </form>
            <p className='flex gap-x-2 space-x-10 top-2'>
                ¿Ya tiene una cuenta? <Link to="/login" className='text-green-600'>Iniciar sesión</Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage