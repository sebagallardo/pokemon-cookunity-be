import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonService } from './pokemon.service';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { BulkCreatePokemonDto } from './dto/bulk-create-pokemon.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('pokemon')
@ApiTags('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  /**
   * Create a new Pokemon
   */
  @Put()
  async create(@Body() body: CreatePokemonDto) {
    const pokemon = await this.pokemonService.create(body);
    return { id: pokemon.id, name: pokemon.name };
  }

  /**
   * Create multiple Pokemons
   */
  @Put('bulk')
  async bulk(@Body() body: BulkCreatePokemonDto) {
    const pokemons = await this.pokemonService.bulk(body.pokemons);
    return pokemons.map((pokemon) => ({ id: pokemon.id, name: pokemon.name }));
  }

  /**
   * Update a Pokemon
   */
  @Post()
  async update(@Body() body: UpdatePokemonDto) {
    const pokemon = await this.pokemonService.findOneById(body.id);
    const result = await this.pokemonService.update(pokemon, body);
    return { id: result.id, name: result.name };
  }

  /**
   * Get a Pokemon by id
   */
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.pokemonService.findOneById(id);
  }

  /**
   * Get all Pokemons
   */
  @Get()
  all() {
    return this.pokemonService.findAll();
  }

  /**
   * Delete a Pokemon by id
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(id);
  }

  /**
   * Simulate a battle between two Pokemons
   */
  @Get('simulation/:attackerId/:defenderId')
  simulate(
    @Param('attackerId') attackerId: string,
    @Param('defenderId') defenderId: string,
  ) {
    return this.pokemonService.simulate(attackerId, defenderId);
  }

  /**
   * Get a Pokemon weaknesses and resistances
   */
  @Get('analyze/:id')
  analyze(@Param('id') id: string) {
    return this.pokemonService.analyze(id);
  }
}
