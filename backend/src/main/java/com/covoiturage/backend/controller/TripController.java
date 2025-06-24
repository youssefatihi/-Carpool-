package com.covoiturage.backend.controller;

import com.covoiturage.backend.dto.request.TripRequest;
import com.covoiturage.backend.dto.response.PageResponse;
import com.covoiturage.backend.dto.response.TripResponse;
import com.covoiturage.backend.model.Trip;
import com.covoiturage.backend.model.User;
import com.covoiturage.backend.service.MockTripService;
import com.covoiturage.backend.service.MockUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/trips")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TripController {
    
    private final MockTripService tripService;
    private final MockUserService userService;
    
    @GetMapping
    public ResponseEntity<PageResponse<TripResponse>> getTrips(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String departureCity,
            @RequestParam(required = false) String arrivalCity,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date
    ) {
        try {
            Thread.sleep(150);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        List<Trip> trips;
        if (departureCity != null || arrivalCity != null || date != null) {
            trips = tripService.searchTrips(departureCity, arrivalCity, date, null, null, null);
        } else {
            trips = tripService.getPage(page, size);
        }
        
        List<TripResponse> tripResponses = trips.stream()
                .map(trip -> {
                    Optional<User> driver = userService.findById(trip.getDriverId());
                    return TripResponse.from(trip, driver.orElse(null));
                })
                .collect(Collectors.toList());
        
        long totalElements = tripService.getTotalCount();
        PageResponse<TripResponse> response = PageResponse.of(tripResponses, page, size, totalElements);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long id) {
        Optional<Trip> tripOpt = tripService.findById(id);
        if (tripOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        Trip trip = tripOpt.get();
        Optional<User> driver = userService.findById(trip.getDriverId());
        TripResponse response = TripResponse.from(trip, driver.orElse(null));
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TripResponse>> searchTrips(
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Integer availableSeats
    ) {
        List<Trip> trips = tripService.searchTrips(from, to, date, minPrice, maxPrice, availableSeats);
        
        List<TripResponse> response = trips.stream()
                .map(trip -> {
                    Optional<User> driver = userService.findById(trip.getDriverId());
                    return TripResponse.from(trip, driver.orElse(null));
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/my-trips")
    public ResponseEntity<List<TripResponse>> getMyTrips(Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        List<Trip> trips = tripService.findByDriverId(user.getId());
        
        List<TripResponse> response = trips.stream()
                .map(trip -> TripResponse.from(trip, user))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping
    public ResponseEntity<TripResponse> createTrip(@RequestBody TripRequest request, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        
        Trip trip = new Trip();
        trip.setDriverId(user.getId());
        trip.setDepartureCity(request.getDepartureCity());
        trip.setArrivalCity(request.getArrivalCity());
        trip.setDepartureAddress(request.getDepartureAddress());
        trip.setArrivalAddress(request.getArrivalAddress());
        trip.setDepartureDate(request.getDepartureDate());
        trip.setPrice(request.getPrice());
        trip.setTotalSeats(request.getTotalSeats());
        trip.setAvailableSeats(request.getTotalSeats());
        trip.setDescription(request.getDescription());
        trip.setCarModel(request.getCarModel());
        trip.setCarColor(request.getCarColor());
        trip.setStatus(Trip.Status.ACTIVE);
        trip.setCreatedAt(LocalDateTime.now());
        
        Trip savedTrip = tripService.save(trip);
        TripResponse response = TripResponse.from(savedTrip, user);
        
        return ResponseEntity.ok(response);
    }
}