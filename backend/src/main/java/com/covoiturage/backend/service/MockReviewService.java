package com.covoiturage.backend.service;

import com.covoiturage.backend.model.Review;
import com.covoiturage.backend.util.MockDataGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MockReviewService {
    
    private final Map<Long, Review> reviews = new HashMap<>();
    private Long nextId = 31L;
    
    public MockReviewService(MockDataGenerator mockDataGenerator) {
        initializeReviews(mockDataGenerator.generateReviews());
    }
    
    private void initializeReviews(List<Review> initialReviews) {
        for (Review review : initialReviews) {
            reviews.put(review.getId(), review);
        }
        log.info("Initialized {} mock reviews", reviews.size());
    }
    
    public Optional<Review> findById(Long id) {
        return Optional.ofNullable(reviews.get(id));
    }
    
    public List<Review> findByToUserId(Long toUserId) {
        return reviews.values().stream()
                .filter(review -> review.getToUserId().equals(toUserId))
                .sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
    
    public List<Review> findByFromUserId(Long fromUserId) {
        return reviews.values().stream()
                .filter(review -> review.getFromUserId().equals(fromUserId))
                .sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
    
    public List<Review> findByTripId(Long tripId) {
        return reviews.values().stream()
                .filter(review -> review.getTripId().equals(tripId))
                .sorted(Comparator.comparing(Review::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
    
    public Review save(Review review) {
        if (review.getId() == null) {
            review.setId(nextId++);
        }
        
        reviews.put(review.getId(), review);
        log.debug("Review saved: from {} to {} rating {}", review.getFromUserId(), review.getToUserId(), review.getRating());
        return review;
    }
    
    public List<Review> findAll() {
        return new ArrayList<>(reviews.values());
    }
    
    public Double getAverageRatingForUser(Long userId) {
        List<Review> userReviews = findByToUserId(userId);
        if (userReviews.isEmpty()) {
            return null;
        }
        
        return userReviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0.0);
    }
}