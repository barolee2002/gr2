package com.gr2.edu.demo.service;

import com.gr2.edu.demo.entities.Report;
import com.gr2.edu.demo.repository.ReportRepository;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report createReport(Report report){
        return reportRepository.save(report);
    }

}
