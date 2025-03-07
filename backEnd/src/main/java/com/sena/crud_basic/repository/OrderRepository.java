package com.sena.crud_basic.repository;

import com.sena.crud_basic.model.Order; // Cambio de PayOrder a Order
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}