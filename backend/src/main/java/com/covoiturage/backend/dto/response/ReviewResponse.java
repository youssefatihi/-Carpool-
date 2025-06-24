package com.covoiturage.backend.dto.response;

import com.covoiturage.backend.model.Review;
import com.covoiturage.backend.model.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReviewResponse {
    private Long id;
    private Long fromUserId;
    private Long toUserId;
    private Long tripId;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
    private UserSummary fromUser;
    
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
    
    public static ReviewResponse from(Review review, User fromUser) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setFromUserId(review.getFromUserId());
        response.setToUserId(review.getToUserId());
        response.setTripId(review.getTripId());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        if (fromUser != null) {
            response.setFromUser(UserSummary.from(fromUser));
        }
        return response;
    }
}