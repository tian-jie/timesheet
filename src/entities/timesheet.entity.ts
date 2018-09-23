import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Timesheet {
    @PrimaryGeneratedColumn()
    _id: string;

    @Column({ length: 100 })
    userId: string;

    @Column()
    date: Date;

    @Column()
    unit: number;

    @Column()
    lastUpdatedTime: Date;

    
}