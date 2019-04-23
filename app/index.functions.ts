/**
 * @fileOverview firebase functionsのentry point
 *
 * region("asia-northeast1")を使用していないのは、hostingのrewriteルールから呼び出すため
 */
import { initializeApp } from "firebase-admin";
import { https } from "firebase-functions";

import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

import apiRoute from "./Api";

initializeApp();

const apiApp = express();
apiApp.use(morgan("dev"));
apiApp.use("/api", apiRoute);
apiApp.use(bodyParser.urlencoded({ extended: true }));
apiApp.use(bodyParser.json());

const api = https.onRequest(apiApp);
const env = https.onRequest((req, res) => {
  const { version } = process;

  res.json({
    version
  });
});

export { api, env };
