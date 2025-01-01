package ecobooks.controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ecobooks.models.BookModel;
import ecobooks.services.BookService;
import ecobooks.services.UserService;
import ecobooks.utils.CloudinaryService;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    @Autowired
    private final BookService bookService;

    @Autowired
    private final CloudinaryService cloudinaryService;

    @Autowired
    private final UserService userService;

    public BookController(BookService bookService, CloudinaryService cloudinaryService, UserService userService) {
        this.bookService = bookService;
        this.cloudinaryService = cloudinaryService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> addBook(
        @RequestParam("title") String title,
        @RequestParam(value = "description", required = false) String description,
        @RequestParam("author") String author,
        @RequestParam("price") BigDecimal price,
        @RequestParam("quantity") Integer quantity,
        @RequestParam(value = "genre", required = false) String genre,
        @RequestParam("sellerId") Long sellerId,
        @RequestParam(value = "image", required = false) MultipartFile image) {
    
        // Default Values
        if (description == null) description = "No description available";
        if (genre == null) genre = "General";
    
        // Handle the image file if it exists
        String imageUrl = null;
        if (image != null) {
            imageUrl = cloudinaryService.uploadFile(image);  // Upload image and get the URL
        }
    
        // Create the book object with the provided data
        BookModel book = new BookModel(userService.getUserById(sellerId).get(), title, description, author, price, quantity, genre, imageUrl);
    
        // Add the book to the database
        BookModel newBook = bookService.addBook(book);
        return ResponseEntity.status(201).body(Map.of(
            "message", "Book uploaded successfully",
            "book", newBook
        ));
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id,
                                        @RequestParam(value = "title", required = false) String title,
                                        @RequestParam(value = "description", required = false) String description,
                                        @RequestParam(value = "author", required = false) String author,
                                        @RequestParam(value = "price", required = false) BigDecimal price,
                                        @RequestParam(value = "quantity", required = false) Integer quantity,
                                        @RequestParam(value = "genre", required = false) String genre,
                                        @RequestParam(value = "image", required = false) MultipartFile image) {
        
        // Find the existing book by id
        BookModel existingBook = bookService.getBookById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // Update only the provided fields
        if (title != null) existingBook.setTitle(title);
        if (description != null) existingBook.setDescription(description);
        if (author != null) existingBook.setAuthor(author);
        if (price != null) existingBook.setPrice(price);
        if (quantity != null) existingBook.setQuantity(quantity);
        if (genre != null) existingBook.setGenre(genre);
        if (image != null) {
            String imageUrl = cloudinaryService.uploadFile(image);  // Upload image and get the URL
            existingBook.setImageUrl(imageUrl);
        }

        // Save the updated book
        BookModel updatedBook = bookService.updateBook(id, existingBook);

        // Return the updated book details in the response
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
