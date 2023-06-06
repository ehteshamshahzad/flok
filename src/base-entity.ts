import { Field } from '@nestjs/graphql';
import { isUUID } from 'class-validator';
import { CreateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BaseEntity {

    @PrimaryColumn({ name: 'id', length: 36 })
    @Field({ name: 'id', nullable: false, description: 'Primary ID' })
    private _id: string;

    @CreateDateColumn({ nullable: true })
    @Field({ nullable: false, description: 'Created at Date' })
    createdAt: Date;

    @CreateDateColumn({ nullable: true })
    @Field({ nullable: false, description: 'Updated at Date' })
    updatedAt: Date;

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        if (isUUID(id)) {
            this._id = id;
        }
        this._id = uuidv4();
    }

}