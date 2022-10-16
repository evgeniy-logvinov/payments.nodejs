import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthStrategy } from './auth/auth.strategy';
import { FirebaseStrategy } from './auth/firebase.strategy';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PassportModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService, AuthStrategy, FirebaseStrategy],
})
export class AppModule {}
