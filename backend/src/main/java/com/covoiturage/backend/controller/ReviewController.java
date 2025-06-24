package com.covoiturage.backend.controller;

import com.covoiturage.backend.dto.request.ReviewRequest;
import com.covoiturage.backend.dto.response.ReviewResponse;
import com.covoiturage.backend.model.Review;
import com.covoiturage.backend.model.User;
import com.covoiturage.backend.service.MockReviewService;
import com.covoiturage.backend.service.MockUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ReviewController {
    
    private final MockReviewService reviewService;
    private final MockUserService userService;
    
    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@RequestBody ReviewRequest request, Authentication authentication) {
        String email = authentication.getName();
        Optional<User> userOpt = userService.findByEmail(email);
        
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userOpt.get();
        
        if (request.getRating() < 1 || request.getRating() > 5) {
            return ResponseEntity.badRequest().build();
        }
        
        Review review = new Review();
        review.setFromUserId(user.getId());
        review.setToUserId(request.getToUserId());
        review.setTripId(request.getTripId());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());
        
        Review savedReview = reviewService.save(review);
        ReviewResponse response = ReviewResponse.from(savedReview, user);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReviewResponse>> getUserReviews(@PathVariable Long userId) {
        List<Review> reviews = reviewService.findByToUserId(userId);
        
        List<ReviewResponse> response = reviews.stream()
                .map(review -> {
                    Optional<User> fromUser = userService.findById(review.getFromUserId());
                    return ReviewResponse.from(review, fromUser.orElse(null));
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
}