import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatModule } from './cat/cat.module';
import { CatService } from './cat/cat.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [CatModule, UserModule],
  controllers: [AppController, CatController],
  providers: [AppService, CatService],
})
export class AppModule {}
