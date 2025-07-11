import { Module } from '@nestjs/common';
import { HabitTrackingService } from './habit-tracking.service';
import { HabitTrackingController } from './habit-tracking.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [HabitTrackingController],
  providers: [HabitTrackingService],
  exports: [HabitTrackingService],
})
export class HabitTrackingModule {}
