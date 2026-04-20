package com.example.ekart.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ekart.model.User;
import com.example.ekart.repository.UserRepository;
import com.example.ekart.security.JwtUtil;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepository userRepository,
                       BCryptPasswordEncoder encoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
    }
    @Transactional
    public void register(User user) {

        System.out.println("EMAIL: " + user.getEmail());

        User existing = userRepository.findByEmail(user.getEmail());

        System.out.println("FOUND USER: " + existing);

        if (existing != null) {
            throw new RuntimeException("Email already exists");
        }

        System.out.println("GOING TO INSERT");

        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");

        userRepository.insertUser(user);

        System.out.println("INSERT DONE");
}
    
    public String login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        userRepository.updateLastLogin(email);
        return jwtUtil.generateToken(email);
    }
}