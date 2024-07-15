import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './app.service';
import {Book} from './FakeDatabase'

@Controller('Books')
export class BooksController{
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): Book[] { 
    return this.booksService.getAllBooks(); 
   
  }
    @Get('getById/:id')
    getBookById(@Param('id') id:string):Book {
      const bookID=+id
      return this.booksService.findById(bookID)
    }

    @Post()
    addBook(@Body() book:Partial<Book>):Book | undefined{
      const bookData=book;
      if(!book.author || !book.title || !book.publicationYear) return undefined; 
      return this.booksService.create(bookData);

    }
}
