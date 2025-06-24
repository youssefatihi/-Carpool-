package com.covoiturage.backend.dto.request;

import lombok.Data;

@Data
public class ReviewRequest {
    private Long toUserId;
    private Long tripId;
    private Integer rating;
    private String comment;
}