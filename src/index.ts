import env from "~/env";
import { app } from "@/server";
import ip from "ip";

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.APP_STAGE} mode on port ${env.PORT}`);
  console.log("Network : http://" + ip.address() + ":" + env.PORT);
  console.log("To check health : http://localhost:" + env.PORT + "/health");
});
