import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, "public")));

// Enrichment API route
app.get("/enrich", async (req, res) => {
  const { callerid } = req.query;

  // Hardcoded keys (you can change these if needed)
  const key1 = "campaign123";
  const key2 = "google_ads";

  if (!callerid) {
    return res.status(400).json({ error: "callerid is required" });
  }

  const url = `https://display.ringba.com/enrich/2752471307282023816?callerid=${encodeURIComponent(
    callerid
  )}&key1=${encodeURIComponent(key1)}&key2=${encodeURIComponent(key2)}`;

  try {
    const response = await fetch(url);

    // if response is not JSON, handle gracefully
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.json(data);
  } catch (err) {
    console.error("Fetch failed:", err.message);
    res.status(500).json({ error: "Failed to fetch from Ringba API" });
  }
});

// Catch-all: send frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Render provides PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
