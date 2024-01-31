package com.gr2.edu.demo.dto.response;

import com.gr2.edu.demo.entities.Feedback;
import lombok.Data;

@Data
public class FeedbackResponse {
    private String message;
    private Feedback feedback;

    public FeedbackResponse() {
    }
}
