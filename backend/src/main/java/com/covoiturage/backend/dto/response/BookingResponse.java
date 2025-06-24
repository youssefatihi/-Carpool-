package com.covoiturage.backend.dto.response;

import com.covoiturage.backend.model.Booking;
import com.covoiturage.backend.model.Trip;
import com.covoiturage.backend.model.User;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingResponse {
    private Long id;
    private Long tripId;
    private Long passengerId;
    private Integer numberOfSeats;
    private Booking.Status status;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private String message;
    private TripSummary trip;
    private UserSummary passenger;
    
    @Data
    public static class TripSummary {
        private Long id;
        private String departureCity;
        private String arrivalCity;
        private LocalDateTime departureDate;
        private BigDecimal price;
        
        public static TripSummary from(Trip trip) {
            TripSummary summary = new TripSummary();
            summary.setId(trip.getId());
            summary.setDepartureCity(trip.getDepartureCity());
            summary.setArrivalCity(trip.getArrivalCity());
            summary.setDepartureDate(trip.getDepartureDate());
            summary.setPrice(trip.getPrice());
            return summary;
        }
    }
    
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
    
    public static BookingResponse from(Booking booking, Trip trip, User passenger) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setTripId(booking.getTripId());
        response.setPassengerId(booking.getPassengerId());
        response.setNumberOfSeats(booking.getNumberOfSeats());
        response.setStatus(booking.getStatus());
        response.setTotalPrice(booking.getTotalPrice());
        response.setCreatedAt(booking.getCreatedAt());
        response.setMessage(booking.getMessage());
        if (trip != null) {
            response.setTrip(TripSummary.from(trip));
        }
        if (passenger != null) {
            response.setPassenger(UserSummary.from(passenger));
        }
        return response;
    }
}