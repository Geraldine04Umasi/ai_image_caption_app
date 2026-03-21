import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { StorageModule } from '../storage/storage.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [StorageModule, AiModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}