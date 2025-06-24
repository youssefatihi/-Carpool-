package com.covoiturage.backend.dto.request;

import com.covoiturage.backend.model.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private User.Role role;
}