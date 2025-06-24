package com.covoiturage.backend.dto.request;

import lombok.Data;

@Data
public class BookingRequest {
    private Long tripId;
    private Integer numberOfSeats;
    private String message;
}