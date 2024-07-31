import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  @Put()
  create(@Body() body: CreatePokemonDto) {
    console.log(body);
    return 'This action adds a new pokemon';
  }

  @Get()
  all() {
    return 'This action returns all pokemons';
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    console.log(id);
    return 'This action returns a pokemon';
  }
}
