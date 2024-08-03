import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

export interface AnalysisResult {
  weakAgainst: string[];
  resistantTo: string[];
}

export interface SimulationResult {
  attacker: string;
  defender: string;
  originalAttack: number;
  attackModified: number;
  succeed: boolean;
}

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async create(dto: CreatePokemonDto): Promise<PokemonEntity> {
    const pokemon = this.pokemonRepository.create(dto);
    pokemon.picture = await this.getPokemonPicture(dto.name);
    await this.pokemonRepository.insert(pokemon);
    return pokemon;
  }

  async bulk(dto: CreatePokemonDto[]): Promise<PokemonEntity[]> {
    const entities = this.pokemonRepository.create(dto);
    const pokemons = await Promise.all(
      entities.map(async (p) => {
        const picture = await this.getPokemonPicture(p.name);
        return { ...p, picture };
      }),
    );
    await this.pokemonRepository.insert(pokemons);
    return pokemons;
  }

  async update(
    pokemon: PokemonEntity,
    changes: UpdatePokemonDto,
  ): Promise<PokemonEntity> {
    const p = this.pokemonRepository.merge(pokemon, changes);
    return this.pokemonRepository.save(p);
  }

  async findOneByName(name: string): Promise<PokemonEntity> {
    const pokemon = this.pokemonRepository.findOneBy({ name });
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }
    return pokemon;
  }

  async findOneById(id: string): Promise<PokemonEntity> {
    const pokemon = await this.pokemonRepository.findOneBy({ id });
    if (!pokemon) {
      throw new Error('Pokemon not found');
    }
    return pokemon;
  }

  findAll(): Promise<PokemonEntity[]> {
    return this.pokemonRepository.find();
  }

  findAllByType(type: string): Promise<PokemonEntity[]> {
    return this.pokemonRepository.find({ where: { type } });
  }

  async remove(id: string): Promise<void> {
    await this.pokemonRepository.delete(id);
  }

  private async getPokemonPicture(name: string): Promise<string> {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}/`,
      );
      const data = await response.json();
      return data.sprites.other.dream_world.front_default;
    } catch (error) {
      console.error('Error fetching pokemon picture', error);
      return null;
    }
  }

  async simulate(
    attackerId: string,
    defenderId: string,
  ): Promise<SimulationResult> {
    const attacker = await this.findOneById(attackerId);
    const defender = await this.findOneById(defenderId);

    if (!attacker || !defender) {
      throw new Error('Pokemon not found');
    }

    let attackPower = attacker.power;

    if (attacker.type === defender.weaknessType) {
      attackPower *= defender.weaknessMultiplier;
    } else if (attacker.type === defender.resistanceType) {
      attackPower -= defender.resistanceDecrement;
    }

    return {
      attacker: attacker.name,
      defender: defender.name,
      originalAttack: attacker.power,
      attackModified: attackPower,
      succeed: attackPower >= defender.hp,
    };
  }

  async analyze(id: string): Promise<AnalysisResult> {
    const pokemon = await this.findOneById(id);
    const weakAgainst = await this.findAllByType(pokemon.weaknessType);
    const resistantTo = await this.findAllByType(pokemon.resistanceType);

    return {
      weakAgainst: weakAgainst.map((p) => p.name),
      resistantTo: resistantTo.map((p) => p.name),
    };
  }
}
