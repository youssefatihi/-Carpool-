package com.covoiturage.backend.dto.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String firstName;
    private String lastName;
    private String bio;
    private String phoneNumber;
    private Boolean smoker;
    private Boolean pets;
    private Boolean music;
}