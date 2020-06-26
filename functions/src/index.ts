import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

console.log("NODE_ENV", process.env.NODE_ENV);

const app = express();
app.use(cors());
app.get("/upload", (req, res) => {
  res.send(`${Date.now()} + test`);
});

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.app = functions.https.onRequest(app);
