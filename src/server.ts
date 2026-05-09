import express, { type Request, type Response } from "express";
import cors from "cors";
import apiRouter from "@/routes/api/routes";
import morgan from "morgan";

const app = express();

// Regular Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// API Routes
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api", apiRouter);

// Error Handlers

export { app };
export default app;
