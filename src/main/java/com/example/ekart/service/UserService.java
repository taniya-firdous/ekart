package com.example.ekart.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.ekart.model.User;
import com.example.ekart.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public void register(User user) {
    
        user.setPassword(encoder.encode(user.getPassword()));
        user.setRole("USER");

        userRepository.insertUser(user);

    }
    public String login(User user) {

        User dbUser = userRepository.findByEmail(user.getEmail());

        if (dbUser == null) {
            return "User not found";
        }

        // compare hashed password
        boolean match = encoder.matches(user.getPassword(), dbUser.getPassword());

        if (!match) {
            return "Invalid password";
        }

        return "Login successful";
    }
}