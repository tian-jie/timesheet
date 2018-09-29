import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';


@Entity()
export class Timesheet {
    @PrimaryGeneratedColumn()
    _id: string;

    @Column({ length: 100 })
    userId: string;

    @Column({ length: 20 })
    date: string;

    @Column('int')
    project: number;

    @Column({ length: 10})
    cycle: string;

    @Column('int')
    unit: number;

    @Column('long')
    lastUpdated: number;

    
}