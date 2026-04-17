package com.example.ekart.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ekart.dto.LoginRequest;
import com.example.ekart.model.User;
import com.example.ekart.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        userService.register(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");

        return response;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {

        String token = userService.login(request.getEmail(), request.getPassword());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return response;
    }
    @GetMapping("/profile")
    public String getProfile() {
        return "This is a protected user profile";
    }
}