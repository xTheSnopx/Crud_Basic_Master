package com.sena.crud_basic.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Producto_Categoria {


    @ManyToOne
    @Id
    @JoinColumn(name = "ID_Categoria",nullable = false)
    private Category id_Categoria;

    // relación


    @ManyToOne
    @Id
    @JoinColumn(name = "ID_Producto",nullable = false)
    private Product id_Producto;

    public void setId_Categoria(Category id_Categoria) {
        this.id_Categoria = id_Categoria;
    }

    // Getter y Setter para id_Producto
    public Product getId_Producto() {
        return id_Producto;
    }

    public void setId_Producto(Product id_Producto) {
        this.id_Producto = id_Producto;
    }

}


