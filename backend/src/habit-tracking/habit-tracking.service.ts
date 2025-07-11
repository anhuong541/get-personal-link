import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { MarkHabitDto } from './dto/mark-habit.dto';
import { HabitTracking } from './interfaces/habit-tracking.interface';

@Injectable()
export class HabitTrackingService {
  constructor(private firebaseService: FirebaseService) {}

  async getHabitTracking(
    userId: string,
    timeKey: string,
  ): Promise<HabitTracking> {
    const firestore = this.firebaseService.getFirestore();
    const trackingRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits-tracker')
      .doc(timeKey);

    const doc = await trackingRef.get();

    if (!doc.exists) {
      return {};
    }

    return doc.data() as HabitTracking;
  }

  async markHabit(userId: string, markHabitDto: MarkHabitDto): Promise<void> {
    const { day, habitKey, value, timeKey } = markHabitDto;
    const firestore = this.firebaseService.getFirestore();

    const trackingRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits-tracker')
      .doc(timeKey);

    const doc = await trackingRef.get();
    const fieldPath = `${day}.${habitKey}`;

    if (doc.exists) {
      // Update existing document
      await trackingRef.update({
        [fieldPath]: value,
      });
    } else {
      // Create new document
      await trackingRef.set({
        [day]: {
          [habitKey]: value,
        },
      });
    }
  }

  async getHabitTrackingForMonth(
    userId: string,
    year: number,
    month: number,
  ): Promise<HabitTracking> {
    const timeKey = `${year}-${month.toString().padStart(2, '0')}`;
    return this.getHabitTracking(userId, timeKey);
  }

  async markHabitForToday(
    userId: string,
    habitKey: string,
    value: boolean,
  ): Promise<void> {
    const now = new Date();
    const timeKey = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    const day = now.getDate();

    await this.markHabit(userId, {
      day,
      habitKey,
      value,
      timeKey,
    });
  }
}
