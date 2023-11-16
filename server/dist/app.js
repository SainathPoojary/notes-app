"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = require("./controllers/auth");
const user_1 = require("./controllers/user");
const auth_2 = require("./middlewares/auth");
const note_1 = require("./controllers/note");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Express + TypeScript Server");
}));
app.post("/api/v1/register", auth_1.register);
app.post("/api/v1/login", auth_1.login);
app.get("/api/v1/logout", auth_1.logout);
app.get("/api/v1/user", auth_2.auth, user_1.getUser);
app.post("/api/v1/note", auth_2.auth, note_1.createNote);
app.get("/api/v1/note/:note_id", auth_2.auth, note_1.getNote);
app.delete("/api/v1/note/:note_id", auth_2.auth, note_1.deleteNote);
app.put("/api/v1/note/:note_id", auth_2.auth, note_1.updateNote);
app.get("/api/v1/notes", auth_2.auth, note_1.getNotes);
exports.default = app;
