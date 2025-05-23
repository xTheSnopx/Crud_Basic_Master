package com.sena.crud_basic.model;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "Pagos")
public class Pay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_Pago", nullable = false)
    private int id_Pago;

    @ManyToOne
    @JoinColumn(name = "ID_orden", nullable = false)
    private Order id_order; // Cambio de PayOrder a Order

    @Column(name = "Metodo_Pago", nullable = false, length = 50)
    private String metodoPago;

    @Column(name = "Fecha_Pago", nullable = false)
    private Date fechaPago;

    @Column(name = "Monto", nullable = false)
    private double monto;

    // Constructor vacío
    public Pay() {
    }

    // Constructor con todos los campos
    public Pay(int id_Pago, Order id_order, String metodoPago, Date fechaPago, double monto) {
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

    public Order getId_order() {
        return id_order;
    }

    public void setId_order(Order id_order) {
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
}