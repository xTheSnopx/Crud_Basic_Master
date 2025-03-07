package com.sena.crud_basic.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.sena.crud_basic.model.customer;
//extedemos de JPA para generar la conexión
//JpaRepository<modelo,tipoPK>
public interface ICustomerRepository extends JpaRepository<customer,Integer>{

    /*
     * C
     * R
     * U
     * D
     */
    
} 


