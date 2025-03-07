package com.sena.crud_basic.service;

import com.sena.crud_basic.dto.ProductDTO;
import com.sena.crud_basic.model.Product;
import com.sena.crud_basic.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Obtener todos los productos
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Obtener un producto por ID
    public ProductDTO getProductById(int id) {
        Product product = productRepository.findById(id).orElse(null);
        return product != null ? convertToDTO(product) : null;
    }

    // Crear un nuevo producto
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = convertToEntity(productDTO);
        product = productRepository.save(product);
        return convertToDTO(product);
    }

    // Actualizar un producto existente
    public ProductDTO updateProduct(int id, ProductDTO productDTO) {
        Product product = productRepository.findById(id).orElse(null);
        if (product != null) {
            product.setNombre_Producto(productDTO.getNombre_Producto());
            product.setMonto(productDTO.getMonto());
            product.setStock(productDTO.getStock());
            product = productRepository.save(product);
            return convertToDTO(product);
        }
        return null;
    }

    // Eliminar un producto por ID
    public void deleteProduct(int id) {
        productRepository.deleteById(id);
    }

    // Convertir entidad a DTO
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getId_Producto(),
                product.getNombre_Producto(),
                product.getMonto(),
                product.getStock()
        );
    }

    // Convertir DTO a entidad
    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setId_Producto(productDTO.getId_Producto());
        product.setNombre_Producto(productDTO.getNombre_Producto());
        product.setMonto(productDTO.getMonto());
        product.setStock(productDTO.getStock());
        return product;
    }
}