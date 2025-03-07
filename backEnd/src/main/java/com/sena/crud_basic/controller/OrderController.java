package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.OrderDTO;
import com.sena.crud_basic.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable int id) {
        OrderDTO orderDTO = orderService.getOrderById(id);
        return orderDTO != null ? ResponseEntity.ok(orderDTO) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable int id, @RequestBody OrderDTO orderDTO) {
        OrderDTO updatedOrderDTO = orderService.updateOrder(id, orderDTO);
        return updatedOrderDTO != null ? ResponseEntity.ok(updatedOrderDTO) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable int id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}