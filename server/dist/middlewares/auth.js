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
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const { SECRET } = process.env;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.cookies.access_token;
    if (!token)
        return res.status(403).json({
            status: 403,
            error: "access-denied",
            message: "No token found",
        });
    try {
        if (!SECRET)
            throw new Error("Secret is not defined");
        const decode = (0, jsonwebtoken_1.verify)(token, SECRET);
        req.body.user_id = decode.user_id;
        req.body.email = decode.email;
    }
    catch (error) {
        return res.status(401).json({
            status: 401,
            error: "unauthorized",
            message: "Invalid token",
        });
    }
    next();
});
exports.auth = auth;
