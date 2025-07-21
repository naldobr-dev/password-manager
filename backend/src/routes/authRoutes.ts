import express from "express";
import { authenticate } from "../services/authService";

const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const token = authenticate(username, password);

    if (token) {
        res.json({ token });
    } else {
        res.status(401).json({ message: "Credenciais inválidas" });
    }
});

export default router;