import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const html = `
<!DOCTYPE html>
<html>
<body>
  <script src="http://delta.com/HlbL2_3nU7/rVq6S4xs/y5/i75Ob05ph71fpw/MhAfDQE/fg/NGZHkqKBU"></script>
</body>
</html>
`;

async function main(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--disable-features=HttpsFirstBalancedModeAutoEnable"]
  });

  const page = await browser.newPage();
  const client = await page.target().createCDPSession();

  await client.send("Network.enable");

  let stop = false;

  client.on("Network.requestWillBeSent", e => {
    if (!stop && e.request.method === "POST") {
      const body = e.request.postData;
      if (body) {
        const json = JSON.parse(body);
        console.log(json["sensor_data"]);
      }
      stop = true;
      browser.close();
    }
  });

  await client.send("Fetch.enable", {
    patterns: [{ urlPattern: "*", requestStage: "Request" }]
  });

  client.on("Fetch.requestPaused", async e => {
    if (stop) {
      await client.send("Fetch.failRequest", {
        requestId: e.requestId,
        errorReason: "Aborted"
      });
      return;
    }

    if (e.request.url === "http://delta.com/") {
      await client.send("Fetch.fulfillRequest", {
        requestId: e.requestId,
        responseCode: 200,
        responseHeaders: [{ name: "Content-Type", value: "text/html" }],
        body: Buffer.from(html).toString("base64")
      });
      return;
    }

    if (e.request.url.startsWith("http://delta.com/HlbL2_3nU7/")) {
      const localPath = path.join(
        process.cwd(),
        e.request.url.replace("http://delta.com/", "")
      );
      const data = fs.readFileSync(localPath);

      await client.send("Fetch.fulfillRequest", {
        requestId: e.requestId,
        responseCode: 200,
        responseHeaders: [{ name: "Content-Type", value: "text/javascript" }],
        body: data.toString("base64")
      });
      return;
    }

    await client.send("Fetch.continueRequest", { requestId: e.requestId });
  });

  await page.goto("http://delta.com");
}

main();
