package ecobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ecobooks.models.BookModel;
import ecobooks.models.UserModel;

@Repository
public interface BookRepository extends JpaRepository<BookModel, Long>{
    List<BookModel> findByTitle(String title);
    List<BookModel> findByAuthor(String author);
    List<BookModel> findByGenre(String genre);
    List<BookModel> findBySeller(UserModel seller);
}
