package com.covoiturage.backend.service;

import com.covoiturage.backend.model.User;
import com.covoiturage.backend.util.MockDataGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class MockUserService {
    
    private final Map<Long, User> users = new HashMap<>();
    private final Map<String, User> usersByEmail = new HashMap<>();
    private final PasswordEncoder passwordEncoder;
    private Long nextId = 16L;
    
    public MockUserService(MockDataGenerator mockDataGenerator, PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        initializeUsers(mockDataGenerator.generateUsers());
    }
    
    private void initializeUsers(List<User> initialUsers) {
        for (User user : initialUsers) {
            users.put(user.getId(), user);
            usersByEmail.put(user.getEmail(), user);
        }
        log.info("Initialized {} mock users", users.size());
    }
    
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(users.get(id));
    }
    
    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(usersByEmail.get(email));
    }
    
    public User save(User user) {
        if (user.getId() == null) {
            user.setId(nextId++);
        }
        
        User existingUser = usersByEmail.get(user.getEmail());
        if (existingUser != null && !existingUser.getId().equals(user.getId())) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        
        users.put(user.getId(), user);
        usersByEmail.put(user.getEmail(), user);
        
        log.debug("User saved: {}", user.getEmail());
        return user;
    }
    
    public List<User> findAll() {
        return List.copyOf(users.values());
    }
    
    public boolean existsByEmail(String email) {
        return usersByEmail.containsKey(email);
    }
}