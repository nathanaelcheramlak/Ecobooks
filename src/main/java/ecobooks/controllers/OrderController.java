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
    public ResponseEntity<?> createOrder(@RequestBody @Valid OrderModel order) {
        OrderModel newOrder = orderService.createOrder(order);
        return ResponseEntity.status(201).body(Map.of(
            "message", "Order created successfully",
            "order", newOrder
        ));
    }

    // Update an order
    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody @Valid OrderModel order) {
        OrderModel updatedOrder = orderService.updateOrder(id, order);
        return ResponseEntity.ok(Map.of(
            "message", "Order updated successfully",
            "order", updatedOrder
        ));
    }

    // Delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.status(204).body(Map.of(
            "message", "Order deleted successfully"
        ));
    }

    // Get all orders
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        List<OrderModel> orders = orderService.getAllOrders();
        return ResponseEntity.ok(Map.of(
            "message", "Orders retrieved successfully",
            "orders", orders,
            "count", orders.size()
        ));
    }

    // Get order by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
            .map(order -> ResponseEntity.ok(Map.of(
                "message", "Order retrieved successfully",
                "order", order
            )))
            .orElse(ResponseEntity.status(404).body(Map.of(
                "error", "Order not found"
            )));
    }

    // Get order by client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<?> getOrderByClient(@PathVariable Long clientId) {
        List<OrderModel> orders = orderService.getOrderByClient(clientId);
        return ResponseEntity.ok(Map.of(
            "message", "Orders retrieved successfully",
            "orders", orders,
            "count", orders.size()
        ));
    }

    // Get order by client and status
    @GetMapping("/client-status")
    public ResponseEntity<?> getOrderByClientAndStatus(@RequestParam Long clientId, @RequestParam String status) {
        List<OrderModel> orders = orderService.getOrderByClientAndStatus(clientId, status);
        return ResponseEntity.ok(Map.of(
            "message", "Orders retrieved successfully",
            "orders", orders,
            "count", orders.size()
        ));
    }

    // Get order by client and status (optimized with dynamic filters)
    @GetMapping("/filter")
    public ResponseEntity<?> getOrderByClientAndStatus(
            @RequestParam(required = false) Long clientId, 
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String dateRange) {

        Map<String, Object> filters = Map.of(
            "clientId", clientId,
            "status", status,
            "dateRange", dateRange
        );

        List<OrderModel> orders = orderService.getFilteredOrders(filters);
        return ResponseEntity.ok(Map.of(
            "message", "Orders retrieved successfully",
            "orders", orders,
            "count", orders.size()
        ));
    }
}
