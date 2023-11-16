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
exports.getNotes = exports.updateNote = exports.deleteNote = exports.getNote = exports.createNote = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, user_id } = req.body;
        if (!title || !content)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Title and content are required",
            });
        const note = yield prisma_1.default.note.create({
            data: {
                title,
                content,
                user_id,
            },
        });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            error: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.createNote = createNote;
const getNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { note_id } = req.params;
        if (!note_id)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        const note = yield prisma_1.default.note.findUnique({
            where: {
                note_id,
            },
        });
        if (!note)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            error: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.getNote = getNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { note_id } = req.params;
        if (!note_id)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        const note = yield prisma_1.default.note.delete({
            where: {
                note_id,
            },
        });
        if (!note)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            error: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.deleteNote = deleteNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { note_id } = req.params;
        const { title, content } = req.body;
        if (!title || !content || !note_id)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "missing fields",
            });
        const noteExists = yield prisma_1.default.note.findUnique({
            where: {
                note_id,
            },
        });
        if (!noteExists) {
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        }
        const note = yield prisma_1.default.note.update({
            where: {
                note_id,
            },
            data: {
                title,
                content,
            },
        });
        if (!note)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "Note not found",
            });
        res.status(200).json(note);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            error: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.updateNote = updateNote;
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        if (!user_id)
            return res.status(400).json({
                status: 400,
                error: "bad-request",
                message: "User not found",
            });
        const notes = yield prisma_1.default.note.findMany({
            where: {
                user_id,
            },
        });
        res.status(200).json(notes);
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            status: 500,
            error: "server-error",
            message: "Something went wrong!",
        });
    }
});
exports.getNotes = getNotes;
