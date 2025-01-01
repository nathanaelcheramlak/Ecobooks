package ecobooks.repositories;

import ecobooks.models.UserModel;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{
    Optional<UserModel> findByPhoneNumber(String phoneNumber);
    Optional<UserModel> findByEmail(String email);
}
