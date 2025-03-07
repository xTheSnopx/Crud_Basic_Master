package com.sena.crud_basic.dto;

public class CategoryDTO {

    private int id_Categoria;
    private String nombre_categoria;

    // Constructor vacío
    public CategoryDTO() {
    }

    // Constructor con todos los campos
    public CategoryDTO(int id_Categoria, String nombre_categoria) {
        this.id_Categoria = id_Categoria;
        this.nombre_categoria = nombre_categoria;
    }

    // Getters y Setters
    public int getId_Categoria() {
        return id_Categoria;
    }

    public void setId_Categoria(int id_Categoria) {
        this.id_Categoria = id_Categoria;
    }

    public String getNombre_categoria() {
        return nombre_categoria;
    }

    public void setNombre_categoria(String nombre_categoria) {
        this.nombre_categoria = nombre_categoria;
    }

    @Override
    public String toString() {
        return "CategoryDTO{" +
                "id_Categoria=" + id_Categoria +
                ", nombre_categoria='" + nombre_categoria + '\'' +
                '}';
    }
}