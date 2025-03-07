package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "Pagos")
public class Pay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Pago", nullable = false)
    private int id_Pago;

    // Relación Many-to-One con payOrderDTO
    @ManyToOne
    @JoinColumn(name = "ID_orden", nullable = false)
    private payOrder id_order;

    @Column(name = "Metodo_Pago", nullable = false, length = 50)
    private String metodoPago;

    @Column(name = "Fecha_Pago", nullable = false)
    private Date fechaPago;

    @Column(name = "Monto", nullable = false)
    private double monto;

    // Constructor vacío (necesario para JPA)
    public Pay() {
    }

    // Constructor con todos los campos
    public Pay(int id_Pago, payOrder id_order, String metodoPago, Date fechaPago, double monto) {
        this.id_Pago = id_Pago;
        this.id_order = id_order;
        this.metodoPago = metodoPago;
        this.fechaPago = fechaPago;
        this.monto = monto;
    }

    // Getters y Setters
    public int getId_Pago() {
        return id_Pago;
    }

    public void setId_Pago(int id_Pago) {
        this.id_Pago = id_Pago;
    }

    public payOrder getId_order() {
        return id_order;
    }

    public void setId_order(payOrder id_order) {
        this.id_order = id_order;
    }

    public String getMetodoPago() {
        return metodoPago;
    }

    public void setMetodoPago(String metodoPago) {
        this.metodoPago = metodoPago;
    }

    public Date getFechaPago() {
        return fechaPago;
    }

    public void setFechaPago(Date fechaPago) {
        this.fechaPago = fechaPago;
    }

    public double getMonto() {
        return monto;
    }

    public void setMonto(double monto) {
        this.monto = monto;
    }

    // Método toString
    @Override
    public String toString() {
        return "pagosDTO{" +
                "id_Pago=" + id_Pago +
                ", id_order=" + id_order +
                ", metodoPago='" + metodoPago + '\'' +
                ", fechaPago=" + fechaPago +
                ", monto=" + monto +
                '}';
    }

    // Método equals
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pay pagosDTO = (Pay) o;
        return id_Pago == pagosDTO.id_Pago &&
                Double.compare(pagosDTO.monto, monto) == 0 &&
                Objects.equals(id_order, pagosDTO.id_order) &&
                Objects.equals(metodoPago, pagosDTO.metodoPago) &&
                Objects.equals(fechaPago, pagosDTO.fechaPago);
    }

    // Método hashCode
    @Override
    public int hashCode() {
        return Objects.hash(id_Pago, id_order, metodoPago, fechaPago, monto);
    }
}