package com.example.ekart.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ekart.model.Product;
import com.example.ekart.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public void addProduct(Product product) {
        repo.insertProduct(product);
    }

    public List<Product> getProducts() {
        return repo.getAllProducts();
    }
}