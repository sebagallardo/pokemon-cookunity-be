import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

export enum PokemonRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
}

@Entity()
export class PokemonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  picture?: string;

  @Column({ type: 'varchar', length: 300 })
  type: string;

  @Column({ type: 'int' })
  hp: number;

  @Column({ type: 'int' })
  power: number;

  @Column({ type: 'enum', enum: PokemonRarity, default: PokemonRarity.COMMON })
  rarity: PokemonRarity;

  @Column({ type: 'varchar', length: 300, nullable: true })
  resistanceType?: string;

  @Column({ type: 'int', nullable: true })
  resistanceDecrement?: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  weaknessType?: string;

  @Column({ type: 'decimal', scale: 2, nullable: true })
  weaknessMultiplier?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
