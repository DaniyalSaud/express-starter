import type { Request } from "express";
import multer from "multer";
import { v7 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "/uploads/");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = uuid();
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage });
