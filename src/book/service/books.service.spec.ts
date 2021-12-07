import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import TestUtils from '../common/test/TestUtils';
import { BookRepository } from '../repository/book.repository';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  const mockRepository = {
    getAllBooks: jest.fn(),
    getBookById: jest.fn(),
    updateBookById: jest.fn(),
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, {
        provide: BookRepository,
        useValue: mockRepository,
      }],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  beforeEach(async () => {
    mockRepository.getAllBooks.mockReset();
    mockRepository.getBookById.mockReset();
    mockRepository.updateBookById.mockReset();

  });

  describe('getAllBooks', () => {
    it('should list all books', async () => {
      const book = TestUtils.createValidBook();
      mockRepository.getAllBooks.mockReturnValue([book, book]);

      const books = await service.getAllBooks();

      expect(books).toHaveLength(2);
      expect(mockRepository.getAllBooks).toBeCalledTimes(1);
    });

    it('should throw BadRequestException when are no results', async () => {
      mockRepository.getAllBooks.mockReturnValue([]);
      expect(service.getAllBooks()).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('getBookById', () => {
    it('should find a existing user', async () => {
      const book = TestUtils.createValidBook();
      mockRepository.getBookById.mockReturnValue(book);

      const books = await service.getBookById("1");

      expect(books).toMatchObject({ name: book.name });
      expect(mockRepository.getBookById).toBeCalledTimes(1);
    });

    it('should throw BadRequestException when are no results', async () => {
      mockRepository.getBookById.mockReturnValue(null);
      expect(service.getBookById("1")).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('updateBookById', () => {
    it('should find and replace existing user', async () => {
      const book = TestUtils.createValidBook();
      const replacedBookPrevist = TestUtils.createNewBookToReplace();
      mockRepository.getBookById.mockReturnValue(book);
      mockRepository.updateBookById.mockReturnValue(replacedBookPrevist);

      const replacedBook = await service.updateBookById("1", replacedBookPrevist);

      expect(replacedBook).toMatchObject({ name: replacedBookPrevist.name });
      expect(mockRepository.updateBookById).toBeCalledTimes(1);
    });

    it('should throw BadRequestException when are no results', async () => {
      mockRepository.getBookById.mockReturnValue(null);
      expect(service.updateBookById("1", TestUtils.createNewBookToReplace())).rejects.toBeInstanceOf(BadRequestException);
    });
  });

});
