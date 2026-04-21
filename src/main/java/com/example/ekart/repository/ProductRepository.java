package com.example.ekart.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.ekart.model.Product;

@Mapper
public interface ProductRepository {
    void insertProduct(Product product);
    List<Product> getAllProducts();
}