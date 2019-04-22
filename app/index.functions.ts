import { region } from "firebase-functions";

const api = region("asia-northeast1").https.onRequest((request, response) => {
  response.json({ api: true });
});

export { api };
