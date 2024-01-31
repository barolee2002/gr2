package com.gr2.edu.demo.service;

import com.gr2.edu.demo.entities.OrderLine;
import com.gr2.edu.demo.repository.OrderLineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OrderLineService {

    OrderLineRepository orderLineRepository;

    public OrderLineService(OrderLineRepository orderLineRepository) {
        this.orderLineRepository = orderLineRepository;
    }

    public List<OrderLine> createOrderLine(List<OrderLine> orderLines){
        return orderLineRepository.saveAll(orderLines);
    }

    public List<Map<String , Object>> getOrderLineByCode(String code){
        return orderLineRepository.getOrderLineByCode(code);
    }
}
