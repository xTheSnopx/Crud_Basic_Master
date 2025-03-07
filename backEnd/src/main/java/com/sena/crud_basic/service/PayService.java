package com.sena.crud_basic.service;

import com.sena.crud_basic.dto.PayDTO;
import com.sena.crud_basic.model.Pay;
import com.sena.crud_basic.model.Order; // Cambio de PayOrder a Order
import com.sena.crud_basic.repository.OrderRepository; // Cambio de PayOrderRepository a OrderRepository
import com.sena.crud_basic.repository.PayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PayService {

    @Autowired
    private PayRepository payRepository;

    @Autowired
    private OrderRepository orderRepository; // Cambio de PayOrderRepository a OrderRepository

    public List<PayDTO> getAllPays() {
        return payRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PayDTO getPayById(int id) {
        Pay pay = payRepository.findById(id).orElse(null);
        return pay != null ? convertToDTO(pay) : null;
    }

    public PayDTO createPay(PayDTO payDTO) {
        Pay pay = convertToEntity(payDTO);
        pay = payRepository.save(pay);
        return convertToDTO(pay);
    }

    public PayDTO updatePay(int id, PayDTO payDTO) {
        Pay pay = payRepository.findById(id).orElse(null);
        if (pay != null) {
            // Obtener la entidad Order desde el repositorio
            Order order = orderRepository.findById(payDTO.getId_order())
                    .orElseThrow(() -> new RuntimeException("Order no encontrada con ID: " + payDTO.getId_order()));
            pay.setId_order(order);

            pay.setMetodoPago(payDTO.getMetodoPago());
            pay.setFechaPago(payDTO.getFechaPago());
            pay.setMonto(payDTO.getMonto());
            pay = payRepository.save(pay);
            return convertToDTO(pay);
        }
        return null;
    }

    public void deletePay(int id) {
        payRepository.deleteById(id);
    }

    private PayDTO convertToDTO(Pay pay) {
        return new PayDTO(
                pay.getId_Pago(),
                pay.getId_order().getId_order(), // Cambio de getId_Orden() a getId_order()
                pay.getMetodoPago(),
                pay.getFechaPago(),
                pay.getMonto()
        );
    }

    private Pay convertToEntity(PayDTO payDTO) {
        Pay pay = new Pay();
        pay.setId_Pago(payDTO.getId_Pago());

        // Obtener la entidad Order desde el repositorio
        Order order = orderRepository.findById(payDTO.getId_order())
                .orElseThrow(() -> new RuntimeException("Order no encontrada con ID: " + payDTO.getId_order()));
        pay.setId_order(order);

        pay.setMetodoPago(payDTO.getMetodoPago());
        pay.setFechaPago(payDTO.getFechaPago());
        pay.setMonto(payDTO.getMonto());
        return pay;
    }
}