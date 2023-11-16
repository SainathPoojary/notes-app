import prisma from "../config/prisma";
import { Request, Response } from "express";

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content, user_id } = req.body;

    if (!title || !content)
      return res.status(400).json({
        status: 400,
        error: "bad-request",
        message: "Title and content are required",
      });

    const note = await prisma.note.create({
      data: {
        title,
        content,
        user_id,
      },
    });

    res.status(200).json(note);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      error: "server-error",
      message: "Something went wrong!",
    });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const { note_id } = req.params;

    if (!note_id)
      return res.status(400).json({
        status: 400,
        error: "bad-request",
        message: "Note not found",
      });

    const note = await prisma.note.findUnique({
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      error: "server-error",
      message: "Something went wrong!",
    });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { note_id } = req.params;

    if (!note_id)
      return res.status(400).json({
        status: 400,
        error: "bad-request",
        message: "Note not found",
      });

    const note = await prisma.note.delete({
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      error: "server-error",
      message: "Something went wrong!",
    });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const { note_id } = req.params;
    const { title, content } = req.body;

    if (!title || !content || !note_id)
      return res.status(400).json({
        status: 400,
        error: "bad-request",
        message: "missing fields",
      });

    const noteExists = await prisma.note.findUnique({
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

    const note = await prisma.note.update({
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      error: "server-error",
      message: "Something went wrong!",
    });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.body;

    if (!user_id)
      return res.status(400).json({
        status: 400,
        error: "bad-request",
        message: "User not found",
      });

    const notes = await prisma.note.findMany({
      where: {
        user_id,
      },
    });

    res.status(200).json(notes);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: 500,
      error: "server-error",
      message: "Something went wrong!",
    });
  }
};
