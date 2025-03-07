package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Producto_Categoria {

    @Embeddable
    public static class Id implements Serializable {
        @Column(name = "ID_Categoria")
        private int id_Categoria;

        @Column(name = "ID_Producto")
        private int id_Producto;

        // Constructor vacío
        public Id() {
        }

        // Constructor con todos los campos
        public Id(int id_Categoria, int id_Producto) {
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
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            Id id = (Id) o;
            return id_Categoria == id.id_Categoria && id_Producto == id.id_Producto;
        }

        @Override
        public int hashCode() {
            return Objects.hash(id_Categoria, id_Producto);
        }
    }

    @jakarta.persistence.Id
    private Id id = new Id();

    @ManyToOne
    @JoinColumn(name = "ID_Categoria", insertable = false, updatable = false)
    private Category id_Categoria;

    @ManyToOne
    @JoinColumn(name = "ID_Producto", insertable = false, updatable = false)
    private Product id_Producto;

    // Constructor vacío
    public Producto_Categoria() {
    }

    // Constructor con todos los campos
    public Producto_Categoria(Category id_Categoria, Product id_Producto) {
        this.id_Categoria = id_Categoria;
        this.id_Producto = id_Producto;
        this.id.setId_Categoria(id_Categoria.getId_Categoria());
        this.id.setId_Producto(id_Producto.getId_Producto());
    }

    // Getters y Setters
    public Id getId() {
        return id;
    }

    public void setId(Id id) {
        this.id = id;
    }

    public Category getId_Categoria() {
        return id_Categoria;
    }

    public void setId_Categoria(Category id_Categoria) {
        this.id_Categoria = id_Categoria;
    }

    public Product getId_Producto() {
        return id_Producto;
    }

    public void setId_Producto(Product id_Producto) {
        this.id_Producto = id_Producto;
    }

    @Override
    public String toString() {
        return "Producto_Categoria{" +
                "id=" + id +
                ", id_Categoria=" + id_Categoria +
                ", id_Producto=" + id_Producto +
                '}';
    }
}