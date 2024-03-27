import axios from './axios'

export const registerPlayerRequest = user => axios.post(`/register-player`, user)

export const registerTeamRequest = user => axios.post(`/register-team`, user)

export const loginRequest =  user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

export const logoutRequest = () => axios.post('/logout')