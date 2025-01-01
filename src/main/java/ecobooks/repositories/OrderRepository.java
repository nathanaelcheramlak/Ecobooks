package ecobooks.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ecobooks.models.UserModel;
import ecobooks.models.OrderModel;
import ecobooks.models.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, Long>{
    List<OrderModel> findByClient(UserModel client);

    // @Query("SELECT o FROM OrderModel o WHERE o.client = :client AND o.status = :status")
    List<OrderModel> findByClientAndStatus(UserModel client, OrderStatus status);
}