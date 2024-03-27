import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function ProtectedRoute() {

    const {loading, isAuthenticated, userType} = useAuth()
    if(loading) return (<h1>Cargando...</h1>)
    console.log(userType)
    if(!loading && !isAuthenticated) return <Navigate to="/login" replace />

    return (
        <>
            <Navbar />
            <main className='container mx-auto py-5'>
                <Outlet />
            </main>
        </>
    )
}

export default ProtectedRoute;
