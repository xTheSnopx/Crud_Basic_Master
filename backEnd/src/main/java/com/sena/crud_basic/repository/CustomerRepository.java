package com.sena.crud_basic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.Customer;
//extedemos de JPA para generar la conexión
//JpaRepository<modelo,tipoPK>
public interface CustomerRepository extends JpaRepository<Customer,Integer>{

    /*
     * C
     * R
     * U
     * D
     */
    
} 


