import { Request, Response } from "express";
import Password from "../models/Password";
import { encrypt, decrypt } from "../services/cryptoService";

export async function getAll(req: Request, res: Response) {
    const records = await Password.find();
    const decryptedRecords = records.map(r => ({
        _id: r._id,
        title: r.title,
        username: r.username,
        password: decrypt(r.password), // Decrypt the password
        url: r.url,
        notes: r.notes
    }));
    //console.log("Decrypted Records:", decryptedRecords); // Log the decrypted records
    res.json(decryptedRecords);
}

export async function create(req: Request, res: Response) {
    const { title, username, password, url, notes } = req.body;
    const encryptedPassword = encrypt(password); // Encrypt the password

    const newRecord = await Password.create({
        title,
        username,
        password: encryptedPassword, // Store the encrypted password
        url,
        notes,
    });

    res.status(201).json(newRecord);
}

export async function update(req: Request, res: Response) {
    const { id } = req.params;
    const { title, username, password, url, notes } = req.body;
    const encryptedPassword = encrypt(password); // Encrypt the password

    await Password.findByIdAndUpdate(id, {
        title,
        username,
        password: encryptedPassword, // Store the encrypted password
        url,
        notes,
    });

    res.json({ message: "Registro atualizado com sucesso" });
}

export async function remove(req: Request, res: Response) {
    const { id } = req.params;
    await Password.findByIdAndDelete(id);
    res.json({ message: "Registro removido com sucesso" });
}