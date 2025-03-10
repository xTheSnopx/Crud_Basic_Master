package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Categorias") // Nombre de la tabla en la base de datos
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Categoria")
    private int id_Categoria;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre_categoria;

    // Constructor vacío (necesario para JPA)
    public Category() {
    }

    // Constructor con todos los campos
    public Category(int id_Categoria, String nombre_categoria) {
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
        return "Category{" +
                "id_Categoria=" + id_Categoria +
                ", nombre_categoria='" + nombre_categoria + '\'' +
                '}';
    }
}