package com.covoiturage.backend.dto.request;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TripRequest {
    private String departureCity;
    private String arrivalCity;
    private String departureAddress;
    private String arrivalAddress;
    private LocalDateTime departureDate;
    private BigDecimal price;
    private Integer totalSeats;
    private String description;
    private String carModel;
    private String carColor;
}