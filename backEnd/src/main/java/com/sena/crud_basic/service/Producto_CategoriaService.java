package com.sena.crud_basic.service;

import com.sena.crud_basic.dto.Producto_CategoriaDTO;
import com.sena.crud_basic.model.Category;
import com.sena.crud_basic.model.Product;
import com.sena.crud_basic.model.Producto_Categoria;
import com.sena.crud_basic.repository.CategoryRepository;
import com.sena.crud_basic.repository.ProductRepository;
import com.sena.crud_basic.repository.Producto_CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Producto_CategoriaService {

    @Autowired
    private Producto_CategoriaRepository producto_CategoriaRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    // Crear una nueva relación
    public Producto_CategoriaDTO createProducto_Categoria(Producto_CategoriaDTO producto_CategoriaDTO) {
        Category category = categoryRepository.findById(producto_CategoriaDTO.getId_Categoria())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        Product product = productRepository.findById(producto_CategoriaDTO.getId_Producto())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Producto_Categoria producto_Categoria = new Producto_Categoria(category, product);
        producto_CategoriaRepository.save(producto_Categoria);

        return producto_CategoriaDTO;
    }

    // Eliminar una relación
    public void deleteProducto_Categoria(int id_Categoria, int id_Producto) {
        Producto_Categoria.Id id = new Producto_Categoria.Id(id_Categoria, id_Producto);
        producto_CategoriaRepository.deleteById(id);
    }
}