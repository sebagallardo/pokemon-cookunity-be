import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePokemonDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  hp?: number;

  @IsOptional()
  @IsNumber()
  power?: number;

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
