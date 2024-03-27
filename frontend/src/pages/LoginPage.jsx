import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"

function LoginPage() {

  const {register, handleSubmit, formState: {errors},} = useForm()

  const {signIn, isAuthenticated, errors: LoginErrors} = useAuth()
  
  const navigate = useNavigate()

  // useEffect(() =>{
  //   if(isAuthenticated) navigate('/dashboard')
  // }, [isAuthenticated])

  const onSubmit = handleSubmit((data) =>{
    signIn(data)
  })

  return (
    <div className='items-center justify-center flex h-[calc(100vh-100px)]'>
      <div className="bg-zinc-800 max-w-md p-10 rounded-md flex flex-col items-center space-y-1">
        {
            LoginErrors.map((error, i) =>(
                <div className='bg-red-500 p-2 text-white rounded-md' key={i}>
                    {error}
                </div>
            ))
        }
        <div className="w-2/3 items-center justify-center flex rounded-md p-5">
          <img src="../../public/logoMedio.png"/>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full space-y-1"
        >
          <div className="w-full">
            <input type='email'
            {...register('email', {
              required: true
            })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700' placeholder='Email'/>
            {errors.email && (<p className='text-red-500'>Email is required</p>)}
          </div>
          <div className="w-full">
            <input type='password'
            {...register('password', {
              required: true
            })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 border-2 border-zinc-700 focus:border-green-600 focus:outline-none transition-colors duration-700' placeholder='Password'/>
            {errors.password && (<p className='text-red-500'>Password is required</p>)}
          </div>
          <div className="w-full flex justify-center">
            <button type='submit'
              className="bg-green-600 w-full rounded-md px-5 py-2">
              Iniciar sesión
            </button>
          </div>
        </form>
        <div className="w-full py-3">
          <p className='flex gap-x-5'>
            ¿No tiene una cuenta? <Link to="/register" className='text-green-600'>Rigistrarse</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage