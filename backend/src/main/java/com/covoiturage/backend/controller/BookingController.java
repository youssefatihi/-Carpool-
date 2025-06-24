package com.covoiturage.backend.controller;

import com.covoiturage.backend.dto.request.BookingRequest;
import com.covoiturage.backend.dto.response.BookingResponse;
import com.covoiturage.backend.model.Booking;
import com.covoiturage.backend.model.Trip;
import com.covoiturage.backend.model.User;
import com.covoiturage.backend.service.MockBookingService;
import com.covoiturage.backend.service.MockTripService;
import com.covoiturage.backend.service.MockUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class BookingController {
    
    private final MockBookingService bookingService;
    private final MockTripService tripService;
    private final MockUserService userService;
    
    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        Optional<Trip> tripOpt = tripService.findById(request.getTripId());
        
        if (tripOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }
        
        Trip trip = tripOpt.get();
        
        if (trip.getAvailableSeats() < request.getNumberOfSeats()) {
            return ResponseEntity.badRequest().body(null);
        }
        
        Booking booking = new Booking();
        booking.setTripId(request.getTripId());
        booking.setPassengerId(user.getId());
        booking.setNumberOfSeats(request.getNumberOfSeats());
        booking.setMessage(request.getMessage());
        booking.setTotalPrice(trip.getPrice().multiply(BigDecimal.valueOf(request.getNumberOfSeats())));
        booking.setStatus(Booking.Status.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        
        Booking savedBooking = bookingService.save(booking);
        BookingResponse response = BookingResponse.from(savedBooking, trip, user);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getMyBookings(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        List<Booking> bookings = bookingService.findByPassengerId(user.getId());
        
        List<BookingResponse> response = bookings.stream()
                .map(booking -> {
                    Optional<Trip> trip = tripService.findById(booking.getTripId());
                    return BookingResponse.from(booking, trip.orElse(null), user);
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-trip-bookings/{tripId}")
    public ResponseEntity<List<BookingResponse>> getTripBookings(@PathVariable Long tripId, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        Optional<Trip> tripOpt = tripService.findById(tripId);
        
        if (tripOpt.isEmpty() || !tripOpt.get().getDriverId().equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        
        Trip trip = tripOpt.get();
        List<Booking> bookings = bookingService.findByTripId(tripId);
        
        List<BookingResponse> response = bookings.stream()
                .map(booking -> {
                    Optional<User> passenger = userService.findById(booking.getPassengerId());
                    return BookingResponse.from(booking, trip, passenger.orElse(null));
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}/confirm")
    public ResponseEntity<BookingResponse> confirmBooking(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        Optional<Booking> bookingOpt = bookingService.findById(id);
        
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Booking booking = bookingOpt.get();
        Optional<Trip> tripOpt = tripService.findById(booking.getTripId());
        
        if (tripOpt.isEmpty() || !tripOpt.get().getDriverId().equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        
        Trip trip = tripOpt.get();
        Booking confirmedBooking = bookingService.confirmBooking(id);
        
        Optional<User> passenger = userService.findById(booking.getPassengerId());
        BookingResponse response = BookingResponse.from(confirmedBooking, trip, passenger.orElse(null));
        
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        Optional<Booking> bookingOpt = bookingService.findById(id);
        
        if (bookingOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Booking booking = bookingOpt.get();
        Optional<Trip> tripOpt = tripService.findById(booking.getTripId());
        
        if (tripOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        if (!booking.getPassengerId().equals(user.getId()) && !tripOpt.get().getDriverId().equals(user.getId())) {
            return ResponseEntity.badRequest().build();
        }
        
        Trip trip = tripOpt.get();
        Booking cancelledBooking = bookingService.cancelBooking(id);
        
        Optional<User> passenger = userService.findById(booking.getPassengerId());
        BookingResponse response = BookingResponse.from(cancelledBooking, trip, passenger.orElse(null));
        
        return ResponseEntity.ok(response);
    }
}