import {sign, verify} from 'jsonwebtoken';
// CORRECCIÓN 5: Eliminamos 'Usuario' porque no se usa en este archivo.
// Solo necesitamos 'IUsuario' para tipar los parámetros.
import {IUsuario} from '../models/usuario'; 
import type {Response} from 'express';

const JWT_SECRET = process.env.JWT_SECRET   || 'defaultsecret';
const JWT_refreshSECRET = process.env.JWT_refreshSECRET || 'defaultrefreshsecret';

// CORRECCIÓN 4: Cambiamos 'res' por '_res' para indicar que no se usa.
const generateToken = (usuario: IUsuario, _res: Response): string =>{ 
    const payload = { id: usuario._id.toString(), rol: usuario.rol };
    // Aumentamos el tiempo de expiración a 1 hora para mejor experiencia de usuario
    const token : string = sign({payload}, JWT_SECRET, {expiresIn: "1h"});

    return token;
};

// CORRECCIÓN 3: Cambiamos 'res' por '_res' para indicar que no se usa.
const generateRefreshToken = (usuario: IUsuario, _res: Response): string =>{ 
    const payload = { id: usuario._id.toString(), rol : usuario.rol }; 
    const refreshToken : string = sign({payload}, JWT_refreshSECRET, {expiresIn: "7d"});

    return refreshToken;
}  

const verifyToken = (token : string) =>{
try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
// CORRECCIÓN 2: Cambiamos 'error' por '_error' para indicar que no se usa.
    } catch (_error) { 
        return null;
    }
};

const verifyRefreshToken = (refreshToken : string) =>{
try {
    const decoded = verify(refreshToken, JWT_refreshSECRET);
    return decoded;
// CORRECCIÓN 1: Cambiamos 'error' por '_error' para indicar que no se usa.
} catch (_error) { 
    return null;
}
} 

export{generateToken, verifyToken, generateRefreshToken, verifyRefreshToken};