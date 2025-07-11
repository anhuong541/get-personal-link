import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { HabitsModule } from './habits/habits.module';
import { HabitTrackingModule } from './habit-tracking/habit-tracking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirebaseModule,
    HabitsModule,
    HabitTrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
