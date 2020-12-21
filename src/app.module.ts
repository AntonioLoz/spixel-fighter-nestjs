import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimationModule } from './modules/animations.module';
import { AuthModule } from './modules/auth.module';
import { FighterModule } from './modules/fighters.module';
import { SocketModule } from './modules/sockets.module';
import { UserModule } from './modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    AnimationModule,
    FighterModule,
<<<<<<< HEAD
    SocketModule
    ],
=======
  ],
>>>>>>> e145aa9db8ef39f7c64687264af20b756e9fc0ea
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
