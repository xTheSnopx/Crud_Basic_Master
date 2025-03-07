package com.sena.crud_basic.dto;

import java.sql.Date;

public class OrderDTO {

    private int id_order; // Campo: id_order
    private Date orderDate; // Campo: orderDate
    private int idCustomer; // Campo: idCustomer (solo el ID)
    private String estado; // Campo: estado

    // Constructor vacío
    public OrderDTO() {
    }

    // Constructor con todos los campos
    public OrderDTO(int id_order, Date orderDate, int idCustomer, String estado) {
        this.id_order = id_order;
        this.orderDate = orderDate;
        this.idCustomer = idCustomer;
        this.estado = estado;
    }

    // Getters y Setters
    public int getId_order() { // Getter para id_order
        return id_order;
    }

    public void setId_order(int id_order) { // Setter para id_order
        this.id_order = id_order;
    }

    public Date getOrderDate() { // Getter para orderDate
        return orderDate;
    }

    public void setOrderDate(Date orderDate) { // Setter para orderDate
        this.orderDate = orderDate;
    }

    public int getIdCustomer() { // Getter para idCustomer
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) { // Setter para idCustomer
        this.idCustomer = idCustomer;
    }

    public String getEstado() { // Getter para estado
        return estado;
    }

    public void setEstado(String estado) { // Setter para estado
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "OrderDTO{" +
                "id_order=" + id_order +
                ", orderDate=" + orderDate +
                ", idCustomer=" + idCustomer +
                ", estado='" + estado + '\'' +
                '}';
    }
}