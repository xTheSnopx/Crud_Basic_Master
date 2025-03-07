package com.sena.crud_basic.service;

import com.sena.crud_basic.dto.CategoryDTO;
import com.sena.crud_basic.model.Category;
import com.sena.crud_basic.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Obtener todas las categorías
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Obtener una categoría por ID
    public CategoryDTO getCategoryById(int id) {
        Category category = categoryRepository.findById(id).orElse(null);
        return category != null ? convertToDTO(category) : null;
    }

    // Crear una nueva categoría
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Category category = convertToEntity(categoryDTO);
        category = categoryRepository.save(category);
        return convertToDTO(category);
    }

    // Actualizar una categoría existente
    public CategoryDTO updateCategory(int id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category != null) {
            category.setNombre_categoria(categoryDTO.getNombre_categoria());
            category = categoryRepository.save(category);
            return convertToDTO(category);
        }
        return null;
    }

    // Eliminar una categoría por ID
    public void deleteCategory(int id) {
        categoryRepository.deleteById(id);
    }

    // Convertir entidad a DTO
    private CategoryDTO convertToDTO(Category category) {
        return new CategoryDTO(
                category.getId_Categoria(),
                category.getNombre_categoria()
        );
    }

    // Convertir DTO a entidad
    private Category convertToEntity(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId_Categoria(categoryDTO.getId_Categoria());
        category.setNombre_categoria(categoryDTO.getNombre_categoria());
        return category;
    }
}