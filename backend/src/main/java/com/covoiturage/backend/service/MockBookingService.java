package com.covoiturage.backend.service;

import com.covoiturage.backend.model.Booking;
import com.covoiturage.backend.util.MockDataGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MockBookingService {
    
    private final Map<Long, Booking> bookings = new HashMap<>();
    private Long nextId = 21L;
    
    public MockBookingService(MockDataGenerator mockDataGenerator) {
        initializeBookings(mockDataGenerator.generateBookings());
    }
    
    private void initializeBookings(List<Booking> initialBookings) {
        for (Booking booking : initialBookings) {
            bookings.put(booking.getId(), booking);
        }
        log.info("Initialized {} mock bookings", bookings.size());
    }
    
    public Optional<Booking> findById(Long id) {
        return Optional.ofNullable(bookings.get(id));
    }
    
    public List<Booking> findByPassengerId(Long passengerId) {
        return bookings.values().stream()
                .filter(booking -> booking.getPassengerId().equals(passengerId))
                .sorted(Comparator.comparing(Booking::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
    
    public List<Booking> findByTripId(Long tripId) {
        return bookings.values().stream()
                .filter(booking -> booking.getTripId().equals(tripId))
                .sorted(Comparator.comparing(Booking::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
    
    public Booking save(Booking booking) {
        if (booking.getId() == null) {
            booking.setId(nextId++);
        }
        
        bookings.put(booking.getId(), booking);
        log.debug("Booking saved: trip {} for passenger {}", booking.getTripId(), booking.getPassengerId());
        return booking;
    }
    
    public Booking confirmBooking(Long bookingId) {
        Booking booking = bookings.get(bookingId);
        if (booking != null) {
            booking.setStatus(Booking.Status.CONFIRMED);
            log.debug("Booking confirmed: {}", bookingId);
        }
        return booking;
    }
    
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookings.get(bookingId);
        if (booking != null) {
            booking.setStatus(Booking.Status.CANCELLED);
            log.debug("Booking cancelled: {}", bookingId);
        }
        return booking;
    }
    
    public List<Booking> findAll() {
        return new ArrayList<>(bookings.values());
    }
}