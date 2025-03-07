package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.PayDTO;
import com.sena.crud_basic.service.PayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pays")
public class PayController {

    @Autowired
    private PayService payService;

    @GetMapping
    public List<PayDTO> getAllPays() {
        return payService.getAllPays();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PayDTO> getPayById(@PathVariable int id) {
        PayDTO payDTO = payService.getPayById(id);
        return payDTO != null ? ResponseEntity.ok(payDTO) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public PayDTO createPay(@RequestBody PayDTO payDTO) {
        return payService.createPay(payDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PayDTO> updatePay(@PathVariable int id, @RequestBody PayDTO payDTO) {
        PayDTO updatedPayDTO = payService.updatePay(id, payDTO);
        return updatedPayDTO != null ? ResponseEntity.ok(updatedPayDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePay(@PathVariable int id) {
        payService.deletePay(id);
        return ResponseEntity.noContent().build();
    }
}