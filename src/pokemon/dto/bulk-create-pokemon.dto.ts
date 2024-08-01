import { Type } from 'class-transformer';
import { IsArray } from 'class-validator';
import { CreatePokemonDto } from './create-pokemon.dto';

export class BulkCreatePokemonDto {
  @IsArray()
  @Type(() => CreatePokemonDto)
  pokemons: CreatePokemonDto[];
}
