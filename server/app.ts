import "dotenv/config";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { register, login, logout } from "./controllers/auth";
import { getUser } from "./controllers/user";
import { auth } from "./middlewares/auth";
import {
  createNote,
  getNote,
  deleteNote,
  updateNote,
  getNotes,
} from "./controllers/note";

const app: Express = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/v1/register", register);
app.post("/api/v1/login", login);
app.get("/api/v1/logout", logout);

app.get("/api/v1/user", auth, getUser);

app.post("/api/v1/note", auth, createNote);
app.get("/api/v1/note/:note_id", auth, getNote);
app.delete("/api/v1/note/:note_id", auth, deleteNote);
app.put("/api/v1/note/:note_id", auth, updateNote);
app.get("/api/v1/notes", auth, getNotes);

export default app;
