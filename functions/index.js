const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();
process.env.GOOGLE_APPLICATION_CREDENTIALS = "./service-account.json";
const vision = require("@google-cloud/vision");
const { Storage } = require("@google-cloud/storage");
const bucket = "gs://pwa-document-reader-images";
let bucketFile = "";
const client = new vision.ImageAnnotatorClient();
const Busboy = require("busboy");
const storage = new Storage();

app.post("/", (req, res) => {
  const date = new Date();
  const busboy = new Busboy({ headers: req.headers });

  busboy.on("file", async (fieldname, file, filename) => {
    console.log(`Processed file ${filename}`);
    bucketFile = filename;
    const storageFile = storage.bucket(bucket).file(bucketFile);

    file.on("data", async (chunk) => {
      await storageFile.save(chunk);
    });
  });
  busboy.on("finish", async () => {
    try {
      const [result] = await client.textDetection(`${bucket}/${bucketFile}`);
      const detections = result.textAnnotations;
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      let rtn_text = "";
      detections.forEach((text) => (rtn_text = rtn_text + text.description));
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      console.log("++++++++++++++++");
      res.send(rtn_text);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  busboy.end(req.body);
});

exports.upload = functions.https.onRequest(app);
