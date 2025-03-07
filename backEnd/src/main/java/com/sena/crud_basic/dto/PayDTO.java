package com.sena.crud_basic.dto;

import java.sql.Date;

public class PayDTO {
    private int id_Pago;
    private int id_order; // Solo el ID de la orden
    private String metodoPago;
    private Date fechaPago;
    private double monto;

    // Constructor vacío
    public PayDTO() {
    }

    // Constructor con todos los campos
    public PayDTO(int id_Pago, int id_order, String metodoPago, Date fechaPago, double monto) {
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

    public int getId_order() {
        return id_order;
    }

    public void setId_order(int id_order) {
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

    @Override
    public String toString() {
        return "PayDTO{" +
                "id_Pago=" + id_Pago +
                ", id_order=" + id_order +
                ", metodoPago='" + metodoPago + '\'' +
                ", fechaPago=" + fechaPago +
                ", monto=" + monto +
                '}';
    }
}