package com.sena.crud_basic.dto;

public class Producto_CategoriaDTO {

    private int id_Categoria;
    private int id_Producto;

    // Constructor vacío
    public Producto_CategoriaDTO() {
    }

    // Constructor con todos los campos
    public Producto_CategoriaDTO(int id_Categoria, int id_Producto) {
        this.id_Categoria = id_Categoria;
        this.id_Producto = id_Producto;
    }

    // Getters y Setters
    public int getId_Categoria() {
        return id_Categoria;
    }

    public void setId_Categoria(int id_Categoria) {
        this.id_Categoria = id_Categoria;
    }

    public int getId_Producto() {
        return id_Producto;
    }

    public void setId_Producto(int id_Producto) {
        this.id_Producto = id_Producto;
    }

    @Override
    public String toString() {
        return "Producto_CategoriaDTO{" +
                "id_Categoria=" + id_Categoria +
                ", id_Producto=" + id_Producto +
                '}';
    }
}