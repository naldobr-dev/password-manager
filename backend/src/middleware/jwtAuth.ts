import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/authService';

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token || !verifyToken(token)) {
        return res.status(401).json({ message: 'Token inválido ou ausente.' });
    }

    // Se o token for válido, continue para o próximo middleware ou rota
    next();
}