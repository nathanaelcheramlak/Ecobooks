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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ecobooks.models.OrderModel;
import ecobooks.services.OrderService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {
    @Autowired
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Create an order
    @PostMapping
    public ResponseEntity<OrderModel> createOrder(@RequestBody @Valid OrderModel order) {
        OrderModel newOrder = orderService.createOrder(order);
        return ResponseEntity.status(201).body(newOrder);
    }

    // Update an order
    @PutMapping("/{id}")
    public ResponseEntity<OrderModel> updateOrder(@PathVariable Long id, @RequestBody @Valid OrderModel order) {
        OrderModel updatedBook = orderService.updateOrder(id, order);
        return ResponseEntity.status(200).body(updatedBook);
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    // Get all orders
    @GetMapping
    public ResponseEntity<List<OrderModel>> getAllOrders() {
        List<OrderModel> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // Get order by id
    @GetMapping("/{id}")
    public ResponseEntity<OrderModel> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // Get order by client
    @GetMapping("/client/{client_id}")
    public ResponseEntity<List<OrderModel>> getOrderByClient(@PathVariable Long client_id) {
        List<OrderModel> orders = orderService.getOrderByClient(client_id);
        return ResponseEntity.ok(orders);
    }

    // Get order by client and status
    @GetMapping("/client-status")
    public ResponseEntity<List<OrderModel>> getOrderByClient(@RequestParam Long clientId, @RequestParam String status) {
        List<OrderModel> orders = orderService.getOrderByClientAndStatus(clientId, status);
        return ResponseEntity.ok(orders);
    }
}
