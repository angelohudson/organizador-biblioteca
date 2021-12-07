import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/shared/jwt-auth.guard';
import { BookDto } from 'src/book/Dto/books.dto';
import { Book } from 'src/book/interface/book.interface';
import { BooksService } from './service/books.service';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllBooks(): Promise<Book[]> {
        return await this.booksService.getAllBooks();
    }

    @Get(':bookId')
    @UseGuards(JwtAuthGuard)
    async getBookById(@Param("bookId") bookId: string): Promise<Book> {
        return await this.booksService.getBookById(bookId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async saveBook(@Body() newBook: BookDto): Promise<Book> {
        return await this.booksService.saveBook(newBook);
    }

    @Put(":bookId")
    @UseGuards(JwtAuthGuard)
    async updateBookById(@Param("bookId") bookId: string, @Body() newBook: BookDto): Promise<Book> {
        return await this.booksService.updateBookById(bookId, newBook);
    }

    @Delete(":bookId")
    @UseGuards(JwtAuthGuard)
    async deleteBookById(@Param("bookId") bookId: string) {
        return this.booksService.deleteBookById(bookId);
    }

}
