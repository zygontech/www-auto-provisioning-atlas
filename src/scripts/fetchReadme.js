import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const GITHUB_README_URL =
  "https://raw.githubusercontent.com/zygontech/auto-provisioning-atlas/main/README.md";
const OUTPUT_FILE = path.resolve("src/data/readme.md");

// Ensure the data directory exists
const DATA_DIR = path.resolve("src/data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function fetchReadme() {
  try {
    console.log(`Fetching README.md from ${GITHUB_README_URL}...`);
    const response = await fetch(GITHUB_README_URL);
    if (!response.ok)
      throw new Error(`GitHub API error: ${response.statusText}`);

    const markdownContent = await response.text();
    fs.writeFileSync(OUTPUT_FILE, markdownContent);
    console.log("✅ Successfully saved README.md!");
  } catch (error) {
    console.error("❌ Error fetching README.md:", error);
  }
}

fetchReadme();
