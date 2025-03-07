package com.sena.crud_basic.dto;

public class ProductDTO {

    private int id_Producto;
    private String nombre_Producto;
    private int monto;
    private int stock;

    // Constructor vacío
    public ProductDTO() {
    }

    // Constructor con todos los campos
    public ProductDTO(int id_Producto, String nombre_Producto, int monto, int stock) {
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
        return "ProductDTO{" +
                "id_Producto=" + id_Producto +
                ", nombre_Producto='" + nombre_Producto + '\'' +
                ", monto=" + monto +
                ", stock=" + stock +
                '}';
    }
}