import { createContext, useState, useContext, useEffect } from "react";
import { registerPlayerRequest, registerTeamRequest, loginRequest, verifyTokenRequest} from '../api/auth';
import Cookies from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userType, setUserType] = useState('')
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const signUpPlayer = async (user) =>{
        try {
            const res = await registerPlayerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            setUserType('player')
        } catch (error) {

            setErrors(error.response.data)
        }
    }

    const signUpTeam = async (user) =>{
        try {
            const res = await registerTeamRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
            setUserType('team')
        } catch (error) {

            setErrors(error.response.data)
        }
    }

    const signIn = async (user) =>{
        try {
            const res = await loginRequest(user)
            setIsAuthenticated(true)
            
            if (res.data.isPlayer) {
                setUserType('player');
            }
            if (res.data.isTeam) {
                setUserType('team');
            }
            
            setUser(res.data)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null);
        setIsAuthenticated(false);
        setUserType(null)
        setLoading(true)
        window.location.replace('/')
    }
    
    useEffect(() =>{
        if(errors.length > 0){
            const timer = setTimeout(() =>{
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[errors])


    useEffect(() =>{
        async function checkLogin(){
            const cookies = Cookies.get()
        
            if(!cookies.token){
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }

                if(res.data.isPlayer){
                    setUserType('player')
                }

                if(res.data.isTeam){
                    setUserType('team')
                }

                setIsAuthenticated(true)
                console.log(`Autenticación está en: ${isAuthenticated}`)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
            }
        }
        checkLogin()
    }, [isAuthenticated])

    // const uploadPhoto = async (playerId, imageData) =>{
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', imageData);
    //         formData.append('playerId', playerId); // Agrega el ID del jugador al formulario
        
    //         const response = await axios.post('/api/upload-image', formData, {
    //           headers: {
    //             'Content-Type': 'multipart/form-data'
    //           }
    //         });
        
    //         return response.data;
    //       } catch (error) {
    //         console.error(error);
    //         throw error;
    //       }
    // }

    return(
        <AuthContext.Provider value={{
            signUpPlayer,
            signUpTeam,
            signIn,
            logout,
            loading,
            user,
            isAuthenticated,
            userType,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}