import http from "https"; // or 'https' for https:// URLs
import fs from "fs";

// todo: get it from environment

//const DOCS_URL = "https://api.dev.erp2.exonn.de/docs/api.json"; // stage
const DOCS_URL = "https://api.app.loc/docs/api.json"; // local

const file = fs.createWriteStream("src/openapi.json");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
http.get(DOCS_URL, function (response) {
  response.pipe(file);

  // after download completed close filestream
  file.on("finish", () => {
    file.close();
    console.log("Download Completed");
  });
});
