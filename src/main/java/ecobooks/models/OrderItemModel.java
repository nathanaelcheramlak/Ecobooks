package ecobooks.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
public class OrderItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private OrderModel order;

    @ManyToOne
    @JoinColumn(name = "book_id", nullable = false)
    private BookModel book;

    @NotNull(message = "Item quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    @NotNull(message = "Item price is required")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    // Default Constructor
    public OrderItemModel() {}

    // Constructor
    public OrderItemModel(OrderModel order, BookModel book, Integer quantity, BigDecimal price) {
        this.order = order;
        this.book = book;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public OrderModel getOrder() {
        return order;
    }

    public void setOrder(OrderModel order) {
        this.order = order;
    }

    public BookModel getBook() {
        return book;
    }

    public void setBook(BookModel book) {
        this.book = book;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // Utility Method
    public BigDecimal calculateTotalPrice() {
        return price.multiply(BigDecimal.valueOf(quantity));
    }
}
