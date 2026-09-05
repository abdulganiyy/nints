import { Module } from '@nestjs/common';
import { PeyflexModule } from './provider/peyflex/peyflex.module';
import { PeyflexProvider } from './provider/peyflex/peyflex.provider';
import { VtuProvider } from './provider.interface';
import { VtuController } from './vtu.controller';
import { AirtimeService } from './airtime.service';
import { DataService } from './data.service';

@Module({
  imports: [PeyflexModule],
  controllers: [VtuController],
  providers: [
    { provide: VtuProvider, useClass: PeyflexProvider },
    AirtimeService,
    DataService,
  ],
  exports: [],
})
export class VtuModule {}
