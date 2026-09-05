import { Module } from '@nestjs/common';
import { PeyflexClient } from './peyflex.client';
import { PeyflexProvider } from './peyflex.provider';

@Module({
  imports: [],
  providers: [PeyflexClient, PeyflexProvider],
  exports: [PeyflexProvider, PeyflexClient],
})
export class PeyflexModule {}
