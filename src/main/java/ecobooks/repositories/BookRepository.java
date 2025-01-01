package ecobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ecobooks.models.BookModel;
import ecobooks.models.UserModel;

@Repository
public interface BookRepository extends JpaRepository<BookModel, Long>{
    @Query("SELECT b FROM BookModel b WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<BookModel> findByTitle(String title);

    @Query("SELECT b FROM BookModel b WHERE LOWER(b.author) LIKE LOWER(CONCAT('%', :author, '%'))")
    List<BookModel> findByAuthor(String author);

    @Query("SELECT b FROM BookModel b WHERE LOWER(b.genre) LIKE LOWER(CONCAT('%', :genre, '%'))")
    List<BookModel> findByGenre(String genre);
    
    List<BookModel> findBySeller(UserModel seller);

    @Query("SELECT b FROM BookModel b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(b.genre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<BookModel> searchBooks(String keyword);
}
