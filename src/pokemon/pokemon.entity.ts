import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class PokemonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  type: string;

  @Column({ type: 'int' })
  hp: number;

  @Column({ type: 'int' })
  power: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  resistanceType?: string;

  @Column({ type: 'int', nullable: true })
  resistanceDecrement?: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  weaknessType?: string;

  @Column({ type: 'int', nullable: true })
  weaknessMultiplier?: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
}
