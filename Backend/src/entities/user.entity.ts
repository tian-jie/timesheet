import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    _id: string;

    @Column({ length: 100 })
    userId: string;

    @Column({ length: 100 })
    usreName: string;

    @Column({ length: 100 })
    passwordmd5: string;

    @Column({ length: 20 })
    salt: number;

    @Column('long')
    lastUpdated: number;

    
}