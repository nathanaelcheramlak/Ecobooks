package ecobooks.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import ecobooks.models.OrderItemModel;
import ecobooks.models.OrderStatus;

public class OrderDTO {
    private Long id;
    private Long clientId;
    private List<OrderItemModel> orderItems;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private String deliveryAddress;
    private LocalDate orderDate;
    private LocalDate deliveryDate;

    // Constructors, Getters, and Setters
    public OrderDTO(Long id, Long clientId, List<OrderItemModel> orderItems, BigDecimal totalPrice, 
                    OrderStatus status, String deliveryAddress, LocalDate orderDate, LocalDate deliveryDate) {
        this.id = id;
        this.clientId = clientId;
        this.orderItems = orderItems;
        this.totalPrice = totalPrice;
        this.status = status;
        this.deliveryAddress = deliveryAddress;
        this.orderDate = orderDate;
        this.deliveryDate = deliveryDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
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

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }
}
