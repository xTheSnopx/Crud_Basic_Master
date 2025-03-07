package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "Clientes")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Cliente", nullable = false)
    private int idCliente;

    @Column(name = "Nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "Direccion", nullable = false, length = 200)
    private String direccion;

    @Column(name = "Telefono", nullable = false, length = 15)
    private String telefono;

    // Constructor vacío
    public Customer() {
    }

    // Constructor con todos los campos
    public Customer(int idCliente, String nombre, String direccion, String telefono) {
        this.idCliente = idCliente;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    // Getters y Setters
    public int getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(int idCliente) {
        this.idCliente = idCliente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "idCliente=" + idCliente +
                ", nombre='" + nombre + '\'' +
                ", direccion='" + direccion + '\'' +
                ", telefono='" + telefono + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return idCliente == customer.idCliente &&
                Objects.equals(nombre, customer.nombre) &&
                Objects.equals(direccion, customer.direccion) &&
                Objects.equals(telefono, customer.telefono);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCliente, nombre, direccion, telefono);
    }
}