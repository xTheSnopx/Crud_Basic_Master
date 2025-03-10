package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Productos") // Nombre de la tabla en la base de datos
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Producto")
    private int id_Producto;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre_Producto;

    @Column(name = "Precio", nullable = false)
    private int monto;

    @Column(name = "Stock", nullable = false)
    private int stock;

    // Constructor vacío (necesario para JPA)
    public Product() {
    }

    // Constructor con todos los campos
    public Product(int id_Producto, String nombre_Producto, int monto, int stock) {
        this.id_Producto = id_Producto;
        this.nombre_Producto = nombre_Producto;
        this.monto = monto;
        this.stock = stock;
    }

    // Getters y Setters
    public int getId_Producto() {
        return id_Producto;
    }

    public void setId_Producto(int id_Producto) {
        this.id_Producto = id_Producto;
    }

    public String getNombre_Producto() {
        return nombre_Producto;
    }

    public void setNombre_Producto(String nombre_Producto) {
        this.nombre_Producto = nombre_Producto;
    }

    public int getMonto() {
        return monto;
    }

    public void setMonto(int monto) {
        this.monto = monto;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id_Producto=" + id_Producto +
                ", nombre_Producto='" + nombre_Producto + '\'' +
                ", monto=" + monto +
                ", stock=" + stock +
                '}';
    }
}