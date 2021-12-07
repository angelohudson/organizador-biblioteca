import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDto } from '../Dto/books.dto';
import { Book } from '../interface/book.interface';
import { BookRepository } from '../repository/book.repository';

@Injectable()
export class BooksService {
    constructor(
        private readonly bookRepository: BookRepository
    ) { }

    async updateBookById(bookId: string, newBook: BookDto): Promise<Book> {
        const existsBook = await this.bookRepository.getBookById(bookId);
        if (!existsBook) throw new BadRequestException('There are no results with this ID');
        return await this.bookRepository.updateBookById(bookId, newBook);
    }

    async getBookById(bookId: string): Promise<Book> {
        try {
            const foundBook = await this.bookRepository.getBookById(bookId);
            if (!foundBook) throw new BadRequestException("There are no results");
            return foundBook;
        } catch (error) {
            throw new BadRequestException("There are no results");
        }
    }

    async deleteBookById(bookId: string): Promise<Book> {
        try {
            return this.bookRepository.deleteBookById(bookId);
        } catch (error) {
            throw new BadRequestException("This book does not exists");
        }
    }

    async getAllBooks(): Promise<Book[]> {
        const allBoocks = await this.bookRepository.getAllBooks();
        if (!allBoocks.length) throw new BadRequestException("There are no books registered yet");
        return allBoocks;
    }

    async saveBook(newBook: BookDto): Promise<Book> {
        return await this.bookRepository.saveBook(newBook);
    }
}
