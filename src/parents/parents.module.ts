import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from './entities/child.entity';
import { Contact } from './entities/contact.entity';
import { ParentsResolver } from './parents.resolver';
import { ParentsService } from './parents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Child, Contact])],
  providers: [ParentsResolver, ParentsService]
})
export class ParentsModule { }
