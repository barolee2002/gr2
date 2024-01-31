package com.gr2.edu.demo.service;

import com.gr2.edu.demo.entities.History;
import com.gr2.edu.demo.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryService {

    @Autowired
    HistoryRepository historyRepository;


    public List<History> findTop5ByHistoryDate(){
        return historyRepository.findTop5ByOrderByHistoryDateDesc();
    }

}
