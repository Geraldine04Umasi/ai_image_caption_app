import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CaptionResult } from '../../interfaces/caption-result.interface';

@Injectable()
export class AiService {
  private client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  async analyzeImage(imageUrl: string): Promise<CaptionResult> {
    const completion = await this.client.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: imageUrl },
            },
            {
              type: 'text',
              text: `Analyze this image and respond ONLY with a valid JSON object, no markdown, no explanation, just the JSON.

Format:
{
  "caption": "A detailed description of the image in one or two sentences.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "confidence": 0.95
}

Rules:
- caption: natural English description
- tags: 4 to 6 relevant keywords  
- confidence: float between 0.0 and 1.0`,
            },
          ],
        },
      ],
      max_tokens: 300,
      temperature: 0.2,
    });

    const content = completion.choices[0]?.message?.content ?? '';

    try {
      return JSON.parse(content) as CaptionResult;
    } catch {
      // Por si el modelo agrega markdown igual
      const match = content.match(/\{[\s\S]*\}/);
      if (match) return JSON.parse(match[0]) as CaptionResult;
      throw new Error('AI response could not be parsed as JSON');
    }
  }
}