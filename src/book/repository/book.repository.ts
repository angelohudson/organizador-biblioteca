import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema, Types } from "mongoose";
import { BookDto } from "src/book/Dto/books.dto";
import { Book } from "../interface/book.interface";

@Injectable()
export class BookRepository {
    constructor(@InjectModel("books") private readonly bookModel: Model<Book>) { }

    async getBookById(bookId: string): Promise<Book> {
        return await this.bookModel.findById(bookId, { __v: false });
    }

    async deleteBookById(bookId: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(bookId);
    }

    async saveBook(newBook: BookDto): Promise<Book> {
        const savedBook = new this.bookModel(newBook);
        return await savedBook.save();
    }

    async getAllBooks(): Promise<Book[]> {
        return await this.bookModel.find({}, { __v: false });
    }

    async updateBookById(bookId: any, newBook: BookDto): Promise<Book> {
        return await this.bookModel.findOneAndReplace({ _id: bookId }, newBook, { __v: false });
    }

}