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
exports.getUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.body;
        const user = yield prisma_1.default.user.findUnique({
            where: {
                user_id,
            },
            include: {
                notes: true,
            },
        });
        if (!user)
            return res.status(400).send("User not found");
        res.status(200).json({
            name: user.name,
            email: user.email,
            notes: user.notes,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send("Something went wrong!");
    }
});
exports.getUser = getUser;
