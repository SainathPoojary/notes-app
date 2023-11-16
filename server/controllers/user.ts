import prisma from "../config/prisma";
import { Request, Response } from "express";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        user_id,
      },
      include: {
        notes: true,
      },
    });

    if (!user) return res.status(400).send("User not found");

    res.status(200).json({
      name: user.name,
      email: user.email,
      notes: user.notes,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong!");
  }
};
