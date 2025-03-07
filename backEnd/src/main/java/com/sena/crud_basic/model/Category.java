package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "Categorias")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Categoria")
    private int id_Categoria;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre_categoria;

        // Getter y Setter para ID_Categoria
        public int getID_Categoria() {
            return id_Categoria;
        }
    
        // Setter para ID_Categoria
        public void setID_Categoria(int ID_Categoria) {
            this.id_Categoria = ID_Categoria;
        }
    
        // Getter y Setter para nombre_categoria
        public String getNombre_categoria() {
            return nombre_categoria;
        }
    
        public void setNombre_categoria(String nombre_categoria) {
            this.nombre_categoria = nombre_categoria;
        }

}
