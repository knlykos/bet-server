import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicModule } from './public/public.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PublicModule,
    TypeOrmModule.forRoot({
      username: 'postgres',
      password: 'bets123',
      type: 'postgres',
      host: '172.17.0.4',
      port: 5432,
      database: 'bets',
      synchronize: true,
      entities: [User],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
