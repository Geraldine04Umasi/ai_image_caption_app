import { Module } from '@nestjs/common';
import { UploadModule } from './modules/upload/upload.module';
import { StorageModule } from './modules/storage/storage.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [UploadModule, StorageModule, AiModule],
})
export class AppModule {}