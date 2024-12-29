package ecobooks.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecobooks.models.BookModel;
import ecobooks.models.UserModel;
import ecobooks.models.UserRole;
import ecobooks.repositories.BookRepository;
import ecobooks.repositories.UserRepository;

@Service
public class BookService {
    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    private final UserRepository userRepository;

    public BookService(BookRepository bookRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    // Add a book
    public BookModel addBook(BookModel book) {
        Long sellerId = book.getSeller().getId();
        Optional<UserModel> seller = userRepository.findById(sellerId);

        if (seller.isEmpty()) {
            throw new NoSuchElementException("Seller not found");
        }

        if (!seller.get().getRole().equals(UserRole.SELLER)) {
            throw new IllegalArgumentException("Only sellers can add books");
        }

        book.setSeller(seller.get());

        return bookRepository.save(book);
    }

    // Update an existing book
    public BookModel updateBook(Long bookId, BookModel updatedBook) {
        BookModel existingBook = bookRepository.findById(bookId)
                .orElseThrow(() -> new NoSuchElementException("Book not found"));

        if (updatedBook.getTitle() != null) {
            existingBook.setTitle(updatedBook.getTitle());
        }
        if (updatedBook.getAuthor() != null) {
            existingBook.setAuthor(updatedBook.getAuthor());
        }
        if (updatedBook.getDescription() != null) {
            existingBook.setDescription(updatedBook.getDescription());
        }
        if (updatedBook.getPrice() != null) {
            existingBook.setPrice(updatedBook.getPrice());
        }
        if (updatedBook.getQuantity() != null) {
            existingBook.setQuantity(updatedBook.getQuantity());
        }
        if (updatedBook.getGenre() != null) {
            existingBook.setGenre(updatedBook.getGenre());
        }
        if (updatedBook.getImageUrl() != null) {
            existingBook.setImageUrl(updatedBook.getImageUrl());
        }

        return bookRepository.save(existingBook);
    }

    // Delete a book by ID
    public void deleteBook(Long bookId) {
        if (!bookRepository.existsById(bookId)) {
            throw new NoSuchElementException("Book not found");
        }
        bookRepository.deleteById(bookId);
    }

    // Get all books
    public List<BookModel> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get books by title
    public List<BookModel> getBooksByTitle(String title) {
        return bookRepository.findByTitle(title);
    }

    // Get books by author
    public List<BookModel> getBooksByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }

    // Get books by genre
    public List<BookModel> getBooksByGenre(String genre) {
        return bookRepository.findByGenre(genre);
    }

    // Get books by seller
    public List<BookModel> getBooksBySeller(Long sellerId) {
        UserModel seller = userRepository.findById(sellerId)
            .orElseThrow(() -> new RuntimeException("Seller not found"));
        
        if (!seller.getRole().equals(UserRole.SELLER)) {
            throw new IllegalArgumentException("User is not a seller");
        }
        
        return bookRepository.findBySeller(seller);
    }

    // Get book by ID
    public Optional<BookModel> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Search a book by keyword
    public List<BookModel> searchBook(String keyword) {
        return bookRepository.searchBooks(keyword);
    }
}
