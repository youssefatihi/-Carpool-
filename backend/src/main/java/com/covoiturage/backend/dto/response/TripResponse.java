package com.covoiturage.backend.dto.response;

import com.covoiturage.backend.model.Trip;
import com.covoiturage.backend.model.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class TripResponse {
    private Long id;
    private Long driverId;
    private String departureCity;
    private String arrivalCity;
    private String departureAddress;
    private String arrivalAddress;
    private LocalDateTime departureDate;
    private BigDecimal price;
    private Integer availableSeats;
    private Integer totalSeats;
    private String description;
    private Trip.Status status;
    private LocalDateTime createdAt;
    private String carModel;
    private String carColor;
    private UserSummary driver;
    
    @Data
    public static class UserSummary {
        private Long id;
        private String firstName;
        private String lastName;
        private String profilePicture;
        private Double rating;
        
        public static UserSummary from(User user) {
            UserSummary summary = new UserSummary();
            summary.setId(user.getId());
            summary.setFirstName(user.getFirstName());
            summary.setLastName(user.getLastName());
            summary.setProfilePicture(user.getProfilePicture());
            summary.setRating(user.getRating());
            return summary;
        }
    }
    
    public static TripResponse from(Trip trip, User driver) {
        TripResponse response = new TripResponse();
        response.setId(trip.getId());
        response.setDriverId(trip.getDriverId());
        response.setDepartureCity(trip.getDepartureCity());
        response.setArrivalCity(trip.getArrivalCity());
        response.setDepartureAddress(trip.getDepartureAddress());
        response.setArrivalAddress(trip.getArrivalAddress());
        response.setDepartureDate(trip.getDepartureDate());
        response.setPrice(trip.getPrice());
        response.setAvailableSeats(trip.getAvailableSeats());
        response.setTotalSeats(trip.getTotalSeats());
        response.setDescription(trip.getDescription());
        response.setStatus(trip.getStatus());
        response.setCreatedAt(trip.getCreatedAt());
        response.setCarModel(trip.getCarModel());
        response.setCarColor(trip.getCarColor());
        if (driver != null) {
            response.setDriver(UserSummary.from(driver));
        }
        return response;
    }
}