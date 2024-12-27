package ecobooks.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecobooks.models.OrderModel;
import ecobooks.models.OrderStatus;
import ecobooks.models.UserModel;
import ecobooks.repositories.OrderRepository;
import ecobooks.repositories.UserRepository;

@Service
public class OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public OrderModel createOrder(OrderModel order) {
        if (order.getClient() == null || order.getOrderItems() == null || order.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have a client and at least one item");
        }

        if (order.getTotalPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Order price cannot be negative");
        }
        return orderRepository.save(order);
    }
    

    // Update an order
    public OrderModel updateOrder(Long orderId, OrderModel updatedOrder) {
        OrderModel existingOrder = orderRepository.findById(orderId).orElseThrow(() -> new NoSuchElementException("Order not found"));

        // Checks negative order price
        if (updatedOrder.getTotalPrice() != null && updatedOrder.getTotalPrice().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Total price cannot be negative");
        }

        // Checks if order is completed
        if (existingOrder.getStatus().equals(OrderStatus.COMPLETED)) {
            throw new IllegalArgumentException("Order cannot be canceled after completion");
        }

        if (updatedOrder.getStatus() != null) {
            existingOrder.setStatus(updatedOrder.getStatus());
        }
        
        if (updatedOrder.getTotalPrice() != null) {
            existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
        } 

        if (updatedOrder.getDeliveryAddress() != null) {
            existingOrder.setDeliveryAddress(updatedOrder.getDeliveryAddress());
        }

        if (updatedOrder.getDeliveryDate() != null) {
            existingOrder.setDeliveryDate(updatedOrder.getDeliveryDate());
        }

        return orderRepository.save(existingOrder);
    }   
    
    // Delete an order
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new NoSuchElementException("Order not found");
        }
        orderRepository.deleteById(orderId);
    }

    // Get all orders
    public List<OrderModel> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by id
    public Optional<OrderModel> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    // Get order by client
    public List<OrderModel> getOrderByClient(Long clientId) {
        Optional<UserModel> client = userRepository.findById(clientId);
        if (!client.isPresent()) {
            throw new NoSuchElementException("User not found");
        }

        return orderRepository.findByClient(client.get());
    }

    // Get order by client and status
    public List<OrderModel> getOrderByClientAndStatus(Long clientId, String status) {
        if (!userRepository.existsById(clientId)) {
            throw new NoSuchElementException("User not found");
        }

        OrderStatus orderStatus;
        try {
            orderStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status");
        }

        Optional<UserModel> client = userRepository.findById(clientId);
        return orderRepository.findByClientAndStatus(client.get(), orderStatus);
    }
}
