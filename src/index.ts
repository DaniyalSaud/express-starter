import { app } from "@/server";
import env from "~/env";
import ip from "ip";
import type { Request, Response } from "express";

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.APP_STAGE} mode on port ${env.PORT}`);
  console.log("Network : http://" + ip.address() + ":" + env.PORT);
  console.log("To check health : http://localhost:" + env.PORT + "/health");
});
