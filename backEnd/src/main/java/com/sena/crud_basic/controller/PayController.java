package com.sena.crud_basic.controller;

import com.sena.crud_basic.model.Pay;
import com.sena.crud_basic.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pagos")
public class PayController{

    @Autowired
    private PagosService pagosService;

    // Obtener todos los pagos
    @GetMapping
    public ResponseEntity<List<pagosDTO>> getAllPagos() {
        List<pagosDTO> pagos = pagosService.getAllPagos();
        return new ResponseEntity<>(pagos, HttpStatus.OK);
    }

    // Obtener un pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<pagosDTO> getPagoById(@PathVariable int id) {
        pagosDTO pago = pagosService.getPagoById(id);
        return new ResponseEntity<>(pago, HttpStatus.OK);
    }

    // Crear un nuevo pago
    @PostMapping
    public ResponseEntity<pagosDTO> createPago(@RequestBody pagosDTO pago) {
        pagosDTO nuevoPago = pagosService.createPago(pago);
        return new ResponseEntity<>(nuevoPago, HttpStatus.CREATED);
    }

    // Actualizar un pago existente
    @PutMapping("/{id}")
    public ResponseEntity<pagosDTO> updatePago(@PathVariable int id, @RequestBody pagosDTO pagoDetails) {
        pagosDTO pagoActualizado = pagosService.updatePago(id, pagoDetails);
        return new ResponseEntity<>(pagoActualizado, HttpStatus.OK);
    }

    // Eliminar un pago
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePago(@PathVariable int id) {
        pagosService.deletePago(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}