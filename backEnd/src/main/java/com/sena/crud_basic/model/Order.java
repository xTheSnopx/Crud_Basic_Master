package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "Ordenes")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Orden", nullable = false)
    private int id_order;

    @Column(name = "Fecha_Orden", nullable = false)
    private Date orderDate;

    @ManyToOne
    @JoinColumn(name = "id_Cliente", nullable = false)
    private Customer idCustomer;

    @Column(name = "Estado_Orden", nullable = false, length = 15)
    private String estado;

    // Constructor vacío
    public Order() {
    }

    // Constructor con todos los campos
    public Order(int id_order, Date orderDate, Customer idCustomer, String estado) {
        this.id_order = id_order;
        this.orderDate = orderDate;
        this.idCustomer = idCustomer;
        this.estado = estado;
    }

    // Getters y Setters
    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
        this.id_order = id_order;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Customer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Customer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id_order=" + id_order +
                ", orderDate=" + orderDate +
                ", idCustomer=" + idCustomer +
                ", estado='" + estado + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id_order == order.id_order &&
                Objects.equals(orderDate, order.orderDate) &&
                Objects.equals(idCustomer, order.idCustomer) &&
                Objects.equals(estado, order.estado);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id_order, orderDate, idCustomer, estado);
    }
}