package com.covoiturage.backend.service;

import com.covoiturage.backend.model.User;
import com.covoiturage.backend.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MockAuthService {
    
    private final MockUserService userService;
    private final JwtTokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    
    private final Map<String, String> refreshTokens = new HashMap<>();
    
    public Map<String, Object> login(String email, String password) {
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        
        User user = userOpt.get();
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }
        
        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        
        refreshTokens.put(refreshToken, user.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("refreshToken", refreshToken);
        response.put("user", sanitizeUser(user));
        
        log.info("User logged in: {}", email);
        return response;
    }
    
    public Map<String, Object> register(String email, String password, String firstName, String lastName, User.Role role) {
        if (userService.existsByEmail(email)) {
            throw new RuntimeException("Email déjà utilisé");
        }
        
        User user = new User();
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(role);
        user.setCreatedAt(LocalDateTime.now());
        user.setProfilePicture("https://i.pravatar.cc/150?u=" + email);
        user.setRating(5.0);
        
        user = userService.save(user);
        
        String token = tokenProvider.generateToken(user.getEmail(), user.getRole().name());
        String refreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        
        refreshTokens.put(refreshToken, user.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("refreshToken", refreshToken);
        response.put("user", sanitizeUser(user));
        
        log.info("User registered: {}", email);
        return response;
    }
    
    public Map<String, Object> refreshToken(String refreshToken) {
        String email = refreshTokens.get(refreshToken);
        if (email == null) {
            throw new RuntimeException("Refresh token invalide");
        }
        
        Optional<User> userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        
        User user = userOpt.get();
        String newToken = tokenProvider.generateToken(user.getEmail(), user.getRole().name());
        String newRefreshToken = tokenProvider.generateRefreshToken(user.getEmail());
        
        refreshTokens.remove(refreshToken);
        refreshTokens.put(newRefreshToken, user.getEmail());
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", newToken);
        response.put("refreshToken", newRefreshToken);
        
        log.debug("Token refreshed for user: {}", email);
        return response;
    }
    
    private User sanitizeUser(User user) {
        User sanitized = new User();
        sanitized.setId(user.getId());
        sanitized.setEmail(user.getEmail());
        sanitized.setFirstName(user.getFirstName());
        sanitized.setLastName(user.getLastName());
        sanitized.setRole(user.getRole());
        sanitized.setProfilePicture(user.getProfilePicture());
        sanitized.setBio(user.getBio());
        sanitized.setRating(user.getRating());
        sanitized.setPhoneNumber(user.getPhoneNumber());
        sanitized.setCreatedAt(user.getCreatedAt());
        sanitized.setSmoker(user.getSmoker());
        sanitized.setPets(user.getPets());
        sanitized.setMusic(user.getMusic());
        return sanitized;
    }
}