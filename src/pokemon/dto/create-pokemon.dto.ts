import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  hp: number;

  @IsNumber()
  power: number;

  @IsOptional()
  @IsString()
  resistanceType?: string;

  @IsOptional()
  @IsNumber()
  resistanceDecrement?: number;

  @IsOptional()
  @IsString()
  weaknessType?: string;

  @IsOptional()
  @IsNumber()
  weaknessMultiplier?: number;
}
