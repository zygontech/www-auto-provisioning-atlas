import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import fetch from "node-fetch";

const GITHUB_REPO = "zygontech/apps-provisioning-encyclopedia";
const GITHUB_FOLDER = "_apps";
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FOLDER}`;
const OUTPUT_FILE = path.resolve("/public/data/apps.json");

// Ensure the data directory exists
const DATA_DIR = path.resolve("src/data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

async function fetchYamlFiles() {
  try {
    console.log(`Fetching file list from GitHub: ${GITHUB_API_URL}`);
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok)
      throw new Error(`GitHub API error: ${response.statusText}`);

    const files = await response.json();
    let apps = [];

    for (const file of files) {
      if (file.name.endsWith(".yml")) {
        console.log(`Downloading: ${file.name}`);
        const fileResponse = await fetch(file.download_url);
        if (!fileResponse.ok) continue;

        const content = await fileResponse.text();
        const data = yaml.load(content);
        apps.push(data);
      }
    }

    if (apps.length === 0) {
      console.error("No YAML files found or parsed.");
      process.exit(1);
    }

    // Save JSON file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(apps, null, 2));
    console.log(
      `✅ Successfully generated apps.json with ${apps.length} entries.`
    );
  } catch (error) {
    console.error("❌ Error fetching YAML files:", error);
    process.exit(1);
  }
}

fetchYamlFiles();
