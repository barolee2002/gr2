package com.gr2.edu.demo;

import com.gr2.edu.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.modelmapper.ModelMapper;


@Configuration

public class ModelMapperConfig {
    @Autowired
    private CategoryRepository categoryRepository;
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        return modelMapper;
    }


}
