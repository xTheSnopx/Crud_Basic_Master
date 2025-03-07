package com.sena.crud_basic.controller;

import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.model.Customer;
import com.sena.crud_basic.service.CustomerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    //método para crear un registro POST
    @PostMapping("/")
    public String registerCustomer(
        @RequestBody Customer customer
        ){
            customerService.save(customer);
        return "register ok";
    }






    @GetMapping("/")
    public ResponseEntity<Object> getCustomerAll() {
        var prueba=customerService.getAllCustomer();
        
        return new ResponseEntity<>(prueba, HttpStatus.OK);
    }

    

    @GetMapping("/{id}")
    public ResponseEntity<Object> getCustomerId(@PathVariable int id) {
        var prueba=customerService.getCustomerById(id);
        
        return new ResponseEntity<>(prueba, HttpStatus.OK);
    }

}
