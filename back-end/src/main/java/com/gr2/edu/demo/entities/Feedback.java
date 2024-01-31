package com.gr2.edu.demo.entities;

import lombok.Data;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "feedback")
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID")
    private Integer id;
    @Column(name = "customer_code")
    private String customerCode;
    @Column
    @Size(max = 10)
    private String phone;
    @Column(name = "staff_code")
    private String staffCode;
    @Column
    @Size(max = 1000)
    private String content;
    @Column(name = "feedback_date")
    private Date feedbackDate;
    @Column
    @Size(max = 10)
    private String status;

    public Feedback() {
    }

    public Feedback(Integer id, String customerCode, String phone, String staffCode, String content, Date feedbackDate, String status) {
        this.id = id;
        this.customerCode = customerCode;
        this.phone = phone;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }

    public Feedback(String customerCode, String phone, String staffCode, String content, Date feedbackDate, String status) {
        this.customerCode = customerCode;
        this.phone = phone;
        this.staffCode = staffCode;
        this.content = content;
        this.feedbackDate = feedbackDate;
        this.status = status;
    }
}
