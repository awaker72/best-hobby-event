import fs from "node:fs/promises";
import path from "node:path";

const promptFile = process.argv[2];

if (!promptFile) {
  console.error("Usage: node scripts/generate-image.mjs <prompt-json>");
  process.exit(1);
}

const root = process.cwd();
const promptPath = path.resolve(root, promptFile);
const raw = await fs.readFile(promptPath, "utf8");
const config = JSON.parse(raw);

const outputPath = path.resolve(root, config.output);
await fs.mkdir(path.dirname(outputPath), { recursive: true });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.log("[dry-run] GEMINI_API_KEY is not set.");
  console.log("Prompt loaded successfully.");
  console.log(`Name: ${config.name}`);
  console.log(`Model: ${config.model}`);
  console.log(`Aspect ratio: ${config.aspectRatio}`);
  console.log(`Output: ${config.output}`);
  console.log("\nPrompt:\n");
  console.log(config.prompt);
  console.log("\nOverlay text:\n");
  console.log(JSON.stringify(config.overlayText, null, 2));
  console.log("\nSet GEMINI_API_KEY to enable real image generation.");
  process.exit(0);
}

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${config.prompt}\n\nOverlay text guidance:\nTitle: ${config.overlayText?.title ?? ""}\nHeadline: ${config.overlayText?.headline ?? ""}\nSubline: ${config.overlayText?.subline ?? ""}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    }),
  }
);

if (!response.ok) {
  const text = await response.text();
  console.error(`Generation failed: ${response.status}`);
  console.error(text);
  process.exit(1);
}

const json = await response.json();
const candidates = json.candidates ?? [];
let base64Data = null;

for (const candidate of candidates) {
  for (const part of candidate.content?.parts ?? []) {
    if (part.inlineData?.data) {
      base64Data = part.inlineData.data;
      break;
    }
  }
  if (base64Data) break;
}

if (!base64Data) {
  console.error("No image data returned by Gemini.");
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}

await fs.writeFile(outputPath, Buffer.from(base64Data, "base64"));
console.log(`Image generated: ${config.output}`);
