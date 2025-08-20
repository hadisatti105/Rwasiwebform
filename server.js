import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// API route for Ringba enrichment
app.get("/enrich", async (req, res) => {
  const { callerid } = req.query;

  // Hardcoded keys
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
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Use Render’s PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
