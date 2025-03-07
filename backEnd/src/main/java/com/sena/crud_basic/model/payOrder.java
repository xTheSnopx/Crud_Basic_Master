package com.sena.crud_basic.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "Ordenes")
public class payOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Orden",nullable = false)
    private int id_order;

    @Column(name = "Fecha_Orden",nullable = false)
    private Date orderDate;

    // relación
    @ManyToOne
    @JoinColumn(name = "id_Cliente",nullable = false)
    private customer idCustomer;

    @Column(name = "Estado_Orden", nullable = false, length = 15)
    private String Estado;

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
    
    public customer getIdCustomer() {
        return idCustomer;
    }
    
    public void setIdCustomer(customer idCustomer) {
        this.idCustomer = idCustomer;
    }
    
    public String getEstado() {
        return Estado;
    }
    
    public void setEstado(String Estado) {
        this.Estado = Estado;
    }
}
