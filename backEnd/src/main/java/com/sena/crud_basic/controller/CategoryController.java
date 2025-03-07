package com.sena.crud_basic.controller;

import com.sena.crud_basic.dto.CategoryDTO;
import com.sena.crud_basic.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Obtener todas las categorías
    @GetMapping
    public List<CategoryDTO> getAllCategories() {
        return categoryService.getAllCategories();
    }

    // Obtener una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable int id) {
        CategoryDTO categoryDTO = categoryService.getCategoryById(id);
        return categoryDTO != null ? ResponseEntity.ok(categoryDTO) : ResponseEntity.notFound().build();
    }

    // Crear una nueva categoría
    @PostMapping
    public CategoryDTO createCategory(@RequestBody CategoryDTO categoryDTO) {
        return categoryService.createCategory(categoryDTO);
    }

    // Actualizar una categoría existente
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {
        CategoryDTO updatedCategoryDTO = categoryService.updateCategory(id, categoryDTO);
        return updatedCategoryDTO != null ? ResponseEntity.ok(updatedCategoryDTO) : ResponseEntity.notFound().build();
    }

    // Eliminar una categoría por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}