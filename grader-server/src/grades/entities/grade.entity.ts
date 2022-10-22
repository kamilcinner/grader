import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() minPercentage: number;
  @Column() symbolicGrade: string;
  @Column({ nullable: true }) descriptiveGrade?: string;
}
