package com.gr2.edu.demo.controller;

import com.gr2.edu.demo.dto.OrderDTO;
import com.gr2.edu.demo.dto.ProductDto;
import com.gr2.edu.demo.entities.OrderLine;
import com.gr2.edu.demo.service.OrderLineService;
import com.gr2.edu.demo.service.OrderService;
import com.gr2.edu.demo.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin/sales")
@CrossOrigin("*")
public class OrderTableController {
    OrderService orderTableService;
    OrderLineService orderLineService;
    ProductService productService;

    public OrderTableController(OrderService orderTableService,OrderLineService orderLineService, ProductService productService) {
        this.orderTableService = orderTableService;
        this.orderLineService = orderLineService;
        this.productService = productService;
    }

    @PostMapping("/order/create")
    @Transactional
    public List<OrderLine> CreateNewOrder(@RequestBody OrderDTO newOrder){
        LocalDate date = LocalDate.now();
        newOrder.getOrderTable().setOrderDate(date);
        String code;
        Integer count = orderTableService.getOrderCount();
        if(count<10){
            code = "O00"+count;
        }else if (count < 100 && count >= 10){
            code = "O0"+count;
        }else {
            code = "O"+count;
        }
        newOrder.getOrderTable().setCode(code);
        orderTableService.createOrder(newOrder.getOrderTable());
        List<OrderLine> orderLines = newOrder.getOrderLines();
        Integer i;
        for(i = 0; i < orderLines.size();i++){
            orderLines.get(i).setOrderCode(code);
        }
        return orderLineService.createOrderLine(orderLines);
    }

    @GetMapping("/products")
    public List<ProductDto> searchProducts(@RequestParam String code,@RequestParam String inventory){
        return productService.searchProductBySearchStringAndInventoryName(code,inventory);
    }
}
