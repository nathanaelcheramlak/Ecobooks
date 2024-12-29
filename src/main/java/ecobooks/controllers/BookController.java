package ecobooks.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

import ecobooks.models.BookModel;
import ecobooks.services.BookService;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    @Autowired
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Add a book
    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody @Valid BookModel book) {
        BookModel newBook = bookService.addBook(book);
        return ResponseEntity.status(201).body(Map.of(
            "message", "Book uploaded successfully",
            "book", newBook
        ));
    }

    // Update a book by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody @Valid BookModel book) {
        BookModel updatedBook = bookService.updateBook(id, book);
        return ResponseEntity.ok(Map.of(
            "message", "Book updated successfully",
            "book", updatedBook
        ));
    }

    // Delete a book by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.status(204).body(Map.of(
            "message", "Book deleted successfully"
        ));
    }

    // Get all books
    @GetMapping
    public ResponseEntity<?> getAllBooks() {
        List<BookModel> books = bookService.getAllBooks();
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
            .map(book -> ResponseEntity.ok(Map.of(
                "message", "Book retrieved successfully",
                "book", book
            )))
            .orElse(ResponseEntity.status(404).body(Map.of(
                "error", "Book not found"
            )));
    }

    // Get books by title
    @GetMapping("/title/{title}")
    public ResponseEntity<?> getBookByTitle(@PathVariable String title) {
        List<BookModel> books = bookService.getBooksByTitle(title);
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }

    // Get books by author
    @GetMapping("/author/{author}")
    public ResponseEntity<?> getBookByAuthor(@PathVariable String author) {
        List<BookModel> books = bookService.getBooksByAuthor(author);
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }

    // Get books by genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<?> getBookByGenre(@PathVariable String genre) {
        List<BookModel> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }

    // Get books by seller
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<?> getBookBySeller(@PathVariable Long sellerId) {
        List<BookModel> books = bookService.getBooksBySeller(sellerId);
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }

    // Search books by keyword
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(@RequestParam String keyword) {
        List<BookModel> books = bookService.searchBook(keyword);
        return ResponseEntity.ok(Map.of(
            "message", "Books retrieved successfully",
            "books", books,
            "count", books.size()
        ));
    }
}
