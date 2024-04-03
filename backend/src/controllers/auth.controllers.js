import Player from '../models/player.model.js'
import Team from '../models/team.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

let isPlayer = false
let isTeam = false

//Registro de jugadores
export const registerPlayer = async(req, res) => {
    const {name, lastname, age, email, password} = req.body

    const ageParse = parseInt(age)
    console.log(ageParse)

    const userExist = await Player.findOne({email}) || await Team.findOne({email})
    if(userExist) return res.status(400).json(['The email already exist'])

    try {

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new Player({
            name,
            lastname,
            age: ageParse,
            email,
            password: passwordHash
        })
    
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})

        isPlayer = true

        res.cookie('token', token)

        res.status(200).json({
            success: true,
            isPlayer: isPlayer,
            message: "user created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error creating user"
        })
        
    }

    
}

//Registro de equipos
export const registerTeam = async(req, res) => {
    const {name, lastname, teamName, email, password} = req.body

    const userExist = await Team.findOne({email}) || await Player.findOne({email})
    if(userExist) return res.status(400).json(['The email already exist'])

    try {

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new Team({
            name,
            lastname,
            teamName,
            email,
            password: passwordHash
        })
    
        const userSaved = await newUser.save()
        const token = await createAccessToken({id: userSaved._id})

        isTeam = true

        res.cookie('token', token)

        res.status(200).json({
            success: true,
            isTeam: isTeam,
            message: "user created successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error creating user"
        })
    }

    
}

//Inicio de sesion de usuarios
export const login = async(req, res) => {
    const {email, password} = req.body

    try {
        
        // const userFound = await Player.findOne({email}) || await Team.findOne({email})

        // if(!userFound) return res.status(400).json(["user not found"])

        // const isMatch = await bcrypt.compare(password, userFound.password)

        // if(!isMatch) return res.status(400).json(["Incorrect password"])

        // const token = await createAccessToken({id: userFound._id})

        // res.cookie('token', token)
        const playerFound = await Player.findOne({email})
        const teamFound = await Team.findOne({email})

        if(playerFound){
            const playerMatch = await bcrypt.compare(password, playerFound.password)
            if(playerMatch){
                const token = await createAccessToken({id: playerFound._id})
                isPlayer = true
                res.cookie('token', token)
                return res.status(200).json({
                        isPlayer: isPlayer
                })
            }
            else{
                return res.status(400).json(["Incorrect password"])
            }
        }else{
            if(teamFound){
                const teamMatch = await bcrypt.compare(password, teamFound.password)
                if(teamMatch){
                    const token = await createAccessToken({id: teamFound._id})
                    isTeam = true
                    res.cookie('token', token)
                    res.status(200).res.json({
                        isTeam: isTeam
                    })
                }
                else{
                    return res.status(400).json(["Incorrect password"])
                }
            }else{
                return res.status(400).json(["user not found"])
            }
        }

        res.json({
            message: "login successfully"
        })
    } catch (error) {
        console.log(error)
    }

    
}

//Cerrar sesión
export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })

    isPlayer = false
    isTeam = false

    return res.sendStatus(200)
}

export const verifyToken = async (req, res) =>{
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: 'Unauthorized'})

    jwt.verify(token, TOKEN_SECRET, async (err, user) =>{
        if(err) return res.status(401).json({message: 'Unauthorized'})

        const playerFound = await Player.findById(user.id)
        const teamFound = await Team.findById(user.id)

        if(playerFound){
            isPlayer = true
            res.json({
                id: playerFound._id,
                name: playerFound.name,
                lastname: playerFound.lastname,
                age: playerFound.age,
                team: playerFound.team,
                isPlayer: isPlayer
            })
        }else if(teamFound){
            isTeam = true
            res.json({
                id: teamFound._id,
                name: teamFound.name,
                lastname: teamFound.lastname,
                teamName: teamFound.teamName,
                jugadores: teamFound.jugadores.map(jugador => ({
                    name: jugador.name,
                    lastname: jugador.lastname,
                    age: jugador.age
                })),
                isTeam: isTeam
            })
        }else{
            return res.status(401).json({message: 'Unauthorized'})
        }

    })
}

export const profile = async (req, res) =>{
    const userFound = await Player.findById(req.user.id) || await Team.findById(req.user.id)

    if(!userFound) return res.status(400).json({message: 'User not found'})

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        team: userFound.team,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

}
