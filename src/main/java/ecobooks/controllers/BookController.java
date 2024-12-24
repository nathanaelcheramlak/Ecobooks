package ecobooks.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecobooks.models.BookModel;
import ecobooks.models.UserModel;
import ecobooks.services.BookService;
import ecobooks.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    @Autowired
    private final BookService bookService;
    private final UserService userService;

    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    // Add a book
    @PostMapping
    public ResponseEntity<BookModel> addBook(@RequestBody @Valid BookModel book) {
        BookModel newBook = bookService.addBook(book);
        return ResponseEntity.status(201).body(newBook);
    }

    // Update a book
    @PutMapping("/{id}")
    public ResponseEntity<BookModel> updateBook(@PathVariable Long id, @RequestBody @Valid BookModel book) {
        BookModel updatedBook = bookService.updateBook(id, book);
        return ResponseEntity.status(200).body(updatedBook);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }


    // Get all books
    @GetMapping
    public ResponseEntity<List<BookModel>> getAllBooks() {
        List<BookModel> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // Get book by id
    @GetMapping("/{id}")
    public ResponseEntity<BookModel> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Get books by title
    @GetMapping("/title/{title}")
    public ResponseEntity<List<BookModel>> getBookByTitle(@PathVariable String title) {
        List<BookModel> books = bookService.getBooksByTitle(title);
        return ResponseEntity.ok(books);
    }

    // get books by author
    @GetMapping("/author/{author}")
    public ResponseEntity<List<BookModel>> getBookByAuthor(@PathVariable String author) {
        List<BookModel> books = bookService.getBooksByAuthor(author);
        return ResponseEntity.ok(books);
    }

    // Get books by genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<BookModel>> getBookbyGenre(@PathVariable String genre) {
        List<BookModel> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }

    // Get books by seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<BookModel>> getBookBySeller(@PathVariable Long sellerId) {
        UserModel seller = userService.getUserById(sellerId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));
        List<BookModel> books = bookService.getBooksBySeller(seller);
        return ResponseEntity.ok(books);
    }
    
}
