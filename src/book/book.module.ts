import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BookRepository } from './repository/book.repository';
import { BookSchema } from './schema/book.schema';
import { BooksService } from './service/books.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'books', schema: BookSchema }])
    ],
    controllers: [BooksController],
    providers: [BooksService, BookRepository],
})
export class BookModule { }
