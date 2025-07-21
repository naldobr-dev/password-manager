import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

// Chave secreta para JWT, pode ser definida no .env ou usar um valor padrão
const JWT_SECRET = process.env.JWT_SECRET || 'heavy69msenha-super-secreta';

// Usuário fixo para exemplo:
const storedUser = {
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'senha123', 10), // Salve o hash, não a senha pura
};

export function authenticate(username: string, password: string): string | null {
    if (username === storedUser.username && bcrypt.compareSync(password, storedUser.passwordHash)) {
        return jwt.sign({ username }, JWT_SECRET, { expiresIn: '2h' });
    }
    return null;
}

export function verifyToken(token: string): boolean {
    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}