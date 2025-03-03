import { onRequest } from "firebase-functions/https";
import express, { Express, Request, Response } from "express";
import cors from "cors";

// import { port } from "./config";
import debug from "./debug";
import main from "./main";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
   res.send("Welcome to the alloan.ai");
});

app.use("/api", main);
app.use("/debug", debug);

// app.listen(port, () => {
//    console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// export the Express app as a firebase cloud function
export const api = onRequest(
   {
      region: "asia-south1",
      cors: true,
      invoker: "public",
   },
   app
);
