
import { GoogleGenAI } from "@google/genai";

export async function generateComicImages(prompts: string[]): Promise<string[]> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const imageGenerationPromises = prompts.map(prompt =>
    ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    })
  );

  const responses = await Promise.all(imageGenerationPromises);

  const imageUrls = responses.map(response => {
    const base64ImageBytes = response.generatedImages[0]?.image.imageBytes;
    if (!base64ImageBytes) {
      throw new Error("Image generation failed for one of the panels.");
    }
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  });

  return imageUrls;
}
