import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
  providers: [CommonService],
  exports: [CommonService], // 다른 모듈에서 사용할 수 있도록 내보냄
})
export class CommonModule {}
