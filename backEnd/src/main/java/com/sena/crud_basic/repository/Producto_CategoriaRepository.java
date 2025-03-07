package com.sena.crud_basic.repository;

import com.sena.crud_basic.model.Producto_Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Producto_CategoriaRepository extends JpaRepository<Producto_Categoria, Producto_Categoria.Id> {
}