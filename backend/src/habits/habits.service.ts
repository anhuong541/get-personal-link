import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Habit } from './interfaces/habit.interface';

@Injectable()
export class HabitsService {
  constructor(private firebaseService: FirebaseService) {}

  private toKebabCase(str: string): string {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  async findAll(userId: string): Promise<Habit[]> {
    const firestore = this.firebaseService.getFirestore();
    const habitsRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits');
    const snapshot = await habitsRef.orderBy('order', 'asc').get();

    return snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Habit,
    );
  }

  async findOne(userId: string, habitId: string): Promise<Habit> {
    const firestore = this.firebaseService.getFirestore();
    const habitRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits')
      .doc(habitId);
    const doc = await habitRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }

    return { id: doc.id, ...doc.data() } as Habit;
  }

  async create(userId: string, createHabitDto: CreateHabitDto): Promise<Habit> {
    const firestore = this.firebaseService.getFirestore();
    const habitId = this.toKebabCase(createHabitDto.label);

    console.log(createHabitDto);

    // Check if habit with this ID already exists
    const existingHabit = firestore
      .collection('users')
      .doc(userId)
      .collection('habits')
      .doc(habitId);
    const existingDoc = await existingHabit.get();

    if (existingDoc.exists) {
      throw new BadRequestException(
        `Habit with name "${createHabitDto.label}" already exists`,
      );
    }

    // Get current habits count for order
    const habitsRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits');
    const snapshot = await habitsRef.get();
    const order = snapshot.size + 1;

    const habitData: Omit<Habit, 'id'> = {
      ...createHabitDto,
      goal: Number(createHabitDto.goal),
      order,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const habitRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits')
      .doc(habitId);
    await habitRef.set(habitData);

    return { id: habitId, ...habitData };
  }

  async update(
    userId: string,
    habitId: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<Habit> {
    const firestore = this.firebaseService.getFirestore();
    const habitRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits')
      .doc(habitId);

    // Check if habit exists
    const doc = await habitRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }

    const updateData: Record<string, any> = {
      ...updateHabitDto,
      updated_at: new Date().toISOString(),
    };

    if ('goal' in updateHabitDto && updateHabitDto.goal !== undefined) {
      updateData.goal = Number(updateHabitDto.goal);
    }

    await habitRef.update(updateData);

    const updatedDoc = await habitRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() } as Habit;
  }

  async remove(userId: string, habitId: string): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    const habitRef = firestore
      .collection('users')
      .doc(userId)
      .collection('habits')
      .doc(habitId);

    // Check if habit exists
    const doc = await habitRef.get();
    if (!doc.exists) {
      throw new NotFoundException(`Habit with ID ${habitId} not found`);
    }

    await habitRef.delete();
  }

  async updateOrder(userId: string, habitIds: string[]): Promise<void> {
    const firestore = this.firebaseService.getFirestore();
    const batch = firestore.batch();

    habitIds.forEach((habitId, index) => {
      const habitRef = firestore
        .collection('users')
        .doc(userId)
        .collection('habits')
        .doc(habitId);
      batch.update(habitRef, {
        order: index + 1,
        updated_at: new Date().toISOString(),
      });
    });

    await batch.commit();
  }
}
