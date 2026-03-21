import { Injectable } from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { AiService } from '../ai/ai.service';

@Injectable()
export class UploadService {
  constructor(
    private readonly storageService: StorageService,
    private readonly aiService: AiService,
  ) {}

  async processImage(file: Express.Multer.File) {
    // 1. Subir a S3
    const { url, fileName } = await this.storageService.uploadFile(file);

    // 2. Analizar con IA
    const aiResult = await this.aiService.analyzeImage(url);

    // 3. Devolver todo junto
    return {
      fileName,
      imageUrl: url,
      caption: aiResult.caption,
      tags: aiResult.tags,
      confidence: aiResult.confidence,
    };
  }
}