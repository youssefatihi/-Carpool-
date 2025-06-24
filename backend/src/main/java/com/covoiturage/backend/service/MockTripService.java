package com.covoiturage.backend.service;

import com.covoiturage.backend.model.Trip;
import com.covoiturage.backend.util.MockDataGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MockTripService {
    
    private final Map<Long, Trip> trips = new HashMap<>();
    private Long nextId = 41L;
    
    public MockTripService(MockDataGenerator mockDataGenerator) {
        initializeTrips(mockDataGenerator.generateTrips());
    }
    
    private void initializeTrips(List<Trip> initialTrips) {
        for (Trip trip : initialTrips) {
            trips.put(trip.getId(), trip);
        }
        log.info("Initialized {} mock trips", trips.size());
    }
    
    public Optional<Trip> findById(Long id) {
        return Optional.ofNullable(trips.get(id));
    }
    
    public List<Trip> findAll() {
        return new ArrayList<>(trips.values());
    }
    
    public List<Trip> findByDriverId(Long driverId) {
        return trips.values().stream()
                .filter(trip -> trip.getDriverId().equals(driverId))
                .sorted(Comparator.comparing(Trip::getDepartureDate))
                .collect(Collectors.toList());
    }
    
    public List<Trip> searchTrips(String departureCity, String arrivalCity, LocalDateTime date, 
                                  BigDecimal minPrice, BigDecimal maxPrice, Integer minSeats) {
        return trips.values().stream()
                .filter(trip -> trip.getStatus() == Trip.Status.ACTIVE)
                .filter(trip -> departureCity == null || trip.getDepartureCity().toLowerCase().contains(departureCity.toLowerCase()))
                .filter(trip -> arrivalCity == null || trip.getArrivalCity().toLowerCase().contains(arrivalCity.toLowerCase()))
                .filter(trip -> date == null || trip.getDepartureDate().toLocalDate().equals(date.toLocalDate()))
                .filter(trip -> minPrice == null || trip.getPrice().compareTo(minPrice) >= 0)
                .filter(trip -> maxPrice == null || trip.getPrice().compareTo(maxPrice) <= 0)
                .filter(trip -> minSeats == null || trip.getAvailableSeats() >= minSeats)
                .sorted(Comparator.comparing(Trip::getDepartureDate))
                .collect(Collectors.toList());
    }
    
    public Trip save(Trip trip) {
        if (trip.getId() == null) {
            trip.setId(nextId++);
        }
        
        trips.put(trip.getId(), trip);
        log.debug("Trip saved: {} -> {}", trip.getDepartureCity(), trip.getArrivalCity());
        return trip;
    }
    
    public void delete(Long id) {
        trips.remove(id);
        log.debug("Trip deleted: {}", id);
    }
    
    public List<Trip> getPage(int page, int size) {
        List<Trip> allTrips = findAll().stream()
                .sorted(Comparator.comparing(Trip::getDepartureDate))
                .collect(Collectors.toList());
        
        int start = page * size;
        int end = Math.min(start + size, allTrips.size());
        
        if (start >= allTrips.size()) {
            return new ArrayList<>();
        }
        
        return allTrips.subList(start, end);
    }
    
    public long getTotalCount() {
        return trips.size();
    }
}