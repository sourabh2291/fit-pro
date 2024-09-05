import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { User } from './user.entities';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Goal {
  BE_HEALTHIER = 'be_healthier',
  LOSE_WEIGHT = 'lose_weight',
  BUILD_MUSCLE = 'build_muscle',
}

export enum HeightUnit {
  FT = 'ft',
  CM = 'cm',
}

export enum WeightUnit {
  KG = 'kg',
  LB = 'lb',
}

export enum WeightTrainingExperience {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum WorkoutPlace {
  HOME = 'home',
  GYM = 'gym',
  OUTDOOR = 'outdoor',
}

export enum WorkoutPreferredTime {
  THREE_DAYS = '3 days week',
  FOUR_DAYS = '4 days week',
  FIVE_DAYS = '5 days week',
  SIX_DAYS = '6 days week',
}

@Entity()
export class Questioner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.OTHER,
  })
  gender: Gender;

  @Column()
  age: number;

  @Column({
    type: 'enum',
    enum: Goal,
  })
  goal: Goal;

  @Column({
    type: 'enum',
    enum: HeightUnit,
    default: HeightUnit.CM,
  })
  heightUnit: HeightUnit;

  @Column()
  height: number;

  @Column({
    type: 'enum',
    enum: WeightUnit,
    default: WeightUnit.KG,
  })
  weightUnit: WeightUnit;

  @Column()
  weight: number;

  @Column({
    type: 'enum',
    enum: WeightTrainingExperience,
  })
  weightTrainingExperience: WeightTrainingExperience;

  @Column({
    type: 'enum',
    enum: WorkoutPlace,
  })
  workoutPlace: WorkoutPlace;

  @Column({
    type: 'enum',
    enum: WorkoutPreferredTime,
  })
  workoutPreferredTime: WorkoutPreferredTime;

  @OneToOne(() => User, (user) => user.questioner)
  user: User;
}
