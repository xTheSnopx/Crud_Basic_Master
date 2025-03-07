package com.sena.crud_basic.service;

import com.sena.crud_basic.dto.OrderDTO;
import com.sena.crud_basic.model.Order;
import com.sena.crud_basic.model.Customer;
import com.sena.crud_basic.repository.CustomerRepository;
import com.sena.crud_basic.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(int id) {
        Order order = orderRepository.findById(id).orElse(null);
        return order != null ? convertToDTO(order) : null;
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        Order order = convertToEntity(orderDTO);
        order = orderRepository.save(order);
        return convertToDTO(order);
    }

    public OrderDTO updateOrder(int id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setOrderDate(orderDTO.getOrderDate());

            // Obtener la entidad Customer desde el repositorio
            Customer customer = customerRepository.findById(orderDTO.getIdCustomer())
                    .orElseThrow(() -> new RuntimeException("Customer no encontrado con ID: " + orderDTO.getIdCustomer()));
            order.setIdCustomer(customer);

            order.setEstado(orderDTO.getEstado());
            order = orderRepository.save(order);
            return convertToDTO(order);
        }
        return null;
    }

    public void deleteOrder(int id) {
        orderRepository.deleteById(id);
    }

    private OrderDTO convertToDTO(Order order) {
        return new OrderDTO(
                order.getId_order(),
                order.getOrderDate(),
                order.getIdCustomer().getIdCliente(),
                order.getEstado()
        );
    }

    private Order convertToEntity(OrderDTO orderDTO) {
        Order order = new Order();
        order.setId_order(orderDTO.getId_order());
        order.setOrderDate(orderDTO.getOrderDate());

        // Obtener la entidad Customer desde el repositorio
        Customer customer = customerRepository.findById(orderDTO.getIdCustomer())
                .orElseThrow(() -> new RuntimeException("Customer no encontrado con ID: " + orderDTO.getIdCustomer()));
        order.setIdCustomer(customer);

        order.setEstado(orderDTO.getEstado());
        return order;
    }
}