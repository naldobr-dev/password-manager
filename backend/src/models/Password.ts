//import { info } from "console";
import mongoose from "mongoose";

/*
const passwordSchema = new mongoose.Schema({
    username: { type :String, required: true },
    password: { type: String, required: true }, // Senha criptografada
    url: { type: String, required: false },
    info: { type: String, required: false },
});
*/

const passwordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  url: { type: String, required: false },
  notes: { type: String, required: false },
});

// Exporta o modelo Password
export default mongoose.model("Password", passwordSchema, "passwords");