package ecobooks.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ecobooks.DTO.OrderDTO;
import ecobooks.models.BookModel;
import ecobooks.models.OrderItemModel;
import ecobooks.models.OrderModel;
import ecobooks.models.OrderStatus;
import ecobooks.models.UserModel;
import ecobooks.models.UserRole;
import ecobooks.repositories.BookRepository;
import ecobooks.repositories.OrderRepository;
import ecobooks.repositories.UserRepository;

@Service
public class OrderService {
    @Autowired
    private final OrderRepository orderRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final BookRepository bookRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, BookRepository bookRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Transactional
    public OrderModel createOrder(OrderModel order) {
        // Validate client
        UserModel client = userRepository.findById(order.getClient().getId())
                .orElseThrow(() -> new IllegalArgumentException("Client with ID " + order.getClient().getId() + " not found"));
        
        if (!client.getRole().equals(UserRole.CLIENT)) {
            throw new IllegalArgumentException("User is not a client");
        }

        order.setClient(client);

        // Initialize total price
        BigDecimal totalPrice = BigDecimal.ZERO;

        // Process each order item
        for (OrderItemModel item : order.getOrderItems()) {
            // Retrieve the book for each order item
            BookModel book = bookRepository.findById(item.getBook().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Book with ID " + item.getBook().getId() + " not found"));

            // Check stock availability
            if (book.getQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Not enough stock for book ID: " + item.getBook().getId());
            }
            // Update book stock
            book.setQuantity(book.getQuantity() - item.getQuantity());

            item.setBook(book);
            item.setOrder(order);

            totalPrice = totalPrice.add(book.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setTotalPrice(totalPrice);
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

    // Get order by seller
    public List<OrderModel> getOrdersBySeller(Long sellerId) {
        if (!userRepository.existsById(sellerId)) {
            throw new NoSuchElementException("Seller with ID " + sellerId + " not found");
        }
        return orderRepository.findOrdersBySellerId(sellerId);
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

    // TODO Check again
    public List<OrderModel> getFilteredOrders(Map<String, Object> filters) {
        // Here you can dynamically filter the orders based on the given filters
        List<OrderModel> orders = orderRepository.findAll();

        if (filters.get("clientId") != null) {
            orders = orders.stream()
                .filter(order -> order.getClient().getId().equals(filters.get("clientId")))
                .collect(Collectors.toList());
        }

        if (filters.get("status") != null) {
            orders = orders.stream()
                .filter(order -> order.getStatus().equals(filters.get("status")))
                .collect(Collectors.toList());
        }

        // Add more filters as needed, like `dateRange` or others
        return orders;
    }

    public OrderDTO convertToDTO(OrderModel order) {
        return new OrderDTO(
            order.getId(),
            order.getClient().getId(),
            order.getOrderItems(),
            order.getTotalPrice(),
            order.getStatus(),
            order.getDeliveryAddress(),
            order.getOrderDate(),
            order.getDeliveryDate()
        );
    }

    // Convert OrderDTO to OrderModel
    public OrderModel convertToModel(OrderDTO orderDTO) {
        OrderModel orderModel = new OrderModel();
        orderModel.setId(orderDTO.getId());
        orderModel.setClient(userRepository.findById(orderDTO.getClientId()).orElseThrow(() -> new IllegalArgumentException("Client not found")));
        orderModel.setOrderItems(orderDTO.getOrderItems());
        orderModel.setTotalPrice(orderDTO.getTotalPrice());
        orderModel.setStatus(orderDTO.getStatus());
        orderModel.setDeliveryAddress(orderDTO.getDeliveryAddress());
        orderModel.setOrderDate(orderDTO.getOrderDate());
        orderModel.setDeliveryDate(orderDTO.getDeliveryDate());
        
        return orderModel;
    }
}
