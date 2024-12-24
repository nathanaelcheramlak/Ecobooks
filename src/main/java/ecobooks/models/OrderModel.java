package ecobooks.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "orders")
public class OrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private UserModel client;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemModel> orderItems;

    @NotNull(message = "Total price is required")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @NotBlank(message = "Delivery address is required")
    @Column(nullable = false)
    private String deliveryAddress;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime orderDate;

    @Column
    private LocalDateTime deliveryDate;

    // Timestamps
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Default Constructor
    public OrderModel() {}

    public OrderModel(UserModel client, List<OrderItemModel> orderItems, BigDecimal totalPrice, OrderStatus status, String deliveryAddress, LocalDateTime deliveryDate) {
        this.client = client;
        this.orderItems = orderItems;
        this.totalPrice = totalPrice;
        this.status = status;
        this.deliveryAddress = deliveryAddress;
        this.deliveryDate = deliveryDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public UserModel getClient() {
        return client;
    }

    public void setClient(UserModel client) {
        this.client = client;
    }

    public List<OrderItemModel> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemModel> orderItems) {
        this.orderItems = orderItems;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public LocalDateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
