import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import {
  Gender,
  Goal,
  HeightUnit,
  WeightTrainingExperience,
  WeightUnit,
  WorkoutPlace,
  WorkoutPreferredTime,
} from 'src/typeorm/entities/questioner.entity';

export class CreateQuestionerDto {
  @ApiProperty({ enum: Gender, default: Gender.OTHER })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty({ enum: Goal })
  @IsEnum(Goal)
  goal: Goal;

  @ApiProperty({ enum: HeightUnit, default: HeightUnit.CM })
  @IsEnum(HeightUnit)
  heightUnit: HeightUnit;

  @ApiProperty()
  @IsNumber()
  height: number;

  @ApiProperty({ enum: WeightUnit, default: WeightUnit.KG })
  @IsEnum(WeightUnit)
  weightUnit: WeightUnit;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty({ enum: WeightTrainingExperience })
  @IsEnum(WeightTrainingExperience)
  weightTrainingExperience: WeightTrainingExperience;

  @ApiProperty({ enum: WorkoutPlace })
  @IsEnum(WorkoutPlace)
  workoutPlace: WorkoutPlace;

  @ApiProperty({ enum: WorkoutPreferredTime })
  @IsEnum(WorkoutPreferredTime)
  workoutPreferredTime: WorkoutPreferredTime;
}

export class UpdateQuestionerDto {
  @ApiProperty({ enum: Gender, required: false })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({ enum: Goal, required: false })
  @IsOptional()
  @IsEnum(Goal)
  goal?: Goal;

  @ApiProperty({ enum: HeightUnit, required: false })
  @IsOptional()
  @IsEnum(HeightUnit)
  heightUnit?: HeightUnit;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ enum: WeightUnit, required: false })
  @IsOptional()
  @IsEnum(WeightUnit)
  weightUnit?: WeightUnit;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ enum: WeightTrainingExperience, required: false })
  @IsOptional()
  @IsEnum(WeightTrainingExperience)
  weightTrainingExperience?: WeightTrainingExperience;

  @ApiProperty({ enum: WorkoutPlace, required: false })
  @IsOptional()
  @IsEnum(WorkoutPlace)
  workoutPlace?: WorkoutPlace;

  @ApiProperty({ enum: WorkoutPreferredTime, required: false })
  @IsOptional()
  @IsEnum(WorkoutPreferredTime)
  workoutPreferredTime?: WorkoutPreferredTime;
}
