package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.Producto_CategoriaDTO;
import com.sena.crud_basic.service.Producto_CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/producto_categoria")
public class Producto_CategoriaController {

    @Autowired
    private Producto_CategoriaService producto_CategoriaService;

    // Crear una nueva relación
    @PostMapping
    public Producto_CategoriaDTO createProducto_Categoria(@RequestBody Producto_CategoriaDTO producto_CategoriaDTO) {
        return producto_CategoriaService.createProducto_Categoria(producto_CategoriaDTO);
    }

    // Eliminar una relación
    @DeleteMapping("/{id_Categoria}/{id_Producto}")
    public ResponseEntity<Void> deleteProducto_Categoria(
            @PathVariable int id_Categoria,
            @PathVariable int id_Producto) {
        producto_CategoriaService.deleteProducto_Categoria(id_Categoria, id_Producto);
        return ResponseEntity.noContent().build();
    }
}