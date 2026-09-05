import { Injectable } from '@nestjs/common';
import { VtuProvider } from './provider.interface';
import { VtuProviderName } from './provider.enum';
import { PeyflexProvider } from './provider/peyflex/peyflex.provider';

@Injectable()
export class VtuProviderFactory {
  constructor(private readonly peyflex: PeyflexProvider) {}

  getProvider(provider: VtuProviderName): VtuProvider {
    switch (provider) {
      case VtuProviderName.PEYFLEX:
        return this.peyflex;

      default:
        throw new Error(`Unsupported VTU provider: ${provider}`);
    }
  }
}
