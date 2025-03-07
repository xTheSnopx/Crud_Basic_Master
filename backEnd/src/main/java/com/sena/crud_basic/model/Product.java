package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity(name = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Producto")
    private int id_Producto;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre_Producto;

    @Column(name= "Precio",nullable = false,length = 15)
    private int monto;

    @Column(name = "Stock",nullable = false)
    private int stock;
    
    public int getID_Producto() {
        return id_Producto;
    }

    public void setID_Producto(int ID_Producto) {
        this.id_Producto = ID_Producto;
    }

    // Getter y Setter para nombre_Producto
    public String getNombre_Producto() {
        return nombre_Producto;
    }

    public void setNombre_Producto(String nombre_Producto) {
        this.nombre_Producto = nombre_Producto;
    }

    // Getter y Setter para monto (Precio)
    public int getMonto() {
        return monto;
    }

    public void setMonto(int monto) {
        this.monto = monto;
    }

    // Getter y Setter para stock
    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
