package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/*
 * Para indicar que la clase es un modelo, se utiliza
 * la anotación bean @Entity
 * name=El nombre de la entidad en la base de datos
 */
@Entity(name = "Cliente")
public class customer {
    /*
     * DTO= Data Transfer Object
     * las clases DTO contienen las entidades de la base
     * de datos
     */
    // id=PRIMARY KEY
    // GeneratedValue=Auto incremental
    // @Column=para indicar que el atributo es una columna
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Cliente", nullable = false)
    private int id_customer;

    @Column(name = "Nombre", length = 50)
    private String nombre;

    @Column(name = "Correo_Electronico", length = 60)
    private String correoElectronico;

    @Column(name = "Telefono", length = 60)
    private String telefono;

    // Constructor vacío (necesario para JPA)
    public customer() {
    }

    // Constructor con todos los campos
    public customer(int id_customer, String nombre, String correoElectronico, String telefono) {
        this.id_customer = id_customer;
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.telefono = telefono;
    }

    // Getters y Setters
    public int getId_customer() {
        return id_customer;
    }

    public void setId_customer(int id_customer) {
        this.id_customer = id_customer;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {  // Corregido: el parámetro debe ser de tipo String
        this.nombre = nombre;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    // Método toString
    @Override
    public String toString() {
        return "customerDTO{" +
                "id_customer=" + id_customer +
                ", nombre='" + nombre + '\'' +
                ", correoElectronico='" + correoElectronico + '\'' +
                ", telefono='" + telefono + '\'' +
                '}';
    }

    // Método equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        customer that = (customer) o;

        if (id_customer != that.id_customer) return false;
        if (!nombre.equals(that.nombre)) return false;
        if (!correoElectronico.equals(that.correoElectronico)) return false;
        return telefono.equals(that.telefono);
    }

    // Método hashCode
    @Override
    public int hashCode() {
        int result = id_customer;
        result = 31 * result + nombre.hashCode();
        result = 31 * result + correoElectronico.hashCode();
        result = 31 * result + telefono.hashCode();
        return result;
    }
}