import { BookDto } from "src/book/dto/books.dto"

export default class TestUtils {
    static createValidBook(): BookDto {
        return {
            name: "Teste",
            language: "portugues",
            releaseYear: 2000,
            publisher: "teste",
            pages: 200,
            author: [{
                name: "Teste",
                surname: "Teste",
            }],
        }
    }
    static createNewBookToReplace(): BookDto {
        return {
            name: "Teste replace",
            language: "portugues",
            releaseYear: 2000,
            publisher: "teste",
            pages: 200,
            author: [{
                name: "Teste",
                surname: "Teste",
            }],
        }
    }
}