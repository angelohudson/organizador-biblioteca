import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BookModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot("mongodb://localhost:27017/biblioteca", { useNewUrlParser: true, useUnifiedTopology: true }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
