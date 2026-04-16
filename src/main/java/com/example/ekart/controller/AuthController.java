package com.example.ekart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
       public Object register(@RequestBody User user) {
        userService.register(user);
        return ResponseEntity.ok("User registered successfully"); 
       }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        String response = userService.login(user);
        return ResponseEntity.ok(response);
    }
}