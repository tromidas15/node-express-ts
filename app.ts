import { string } from "@hapi/joi";
import express, { Application } from "express";
import { connect } from "mongoose";
declare var process: {
  env: {
    APP_SECRET: string;
  };
};

const app: Application = express();
connect(
  "mongodb+srv://serviceDev:serviceDev@cluster0.drdyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => console.log("conected")
);

const authRoutes = require("./router/auth.ts");
const roles = require("./router/roles.ts");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/roles", roles);

app.listen(8080);
