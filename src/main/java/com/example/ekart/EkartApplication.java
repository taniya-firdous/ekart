package com.example.ekart;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.ekart.repository")
public class EkartApplication {

	public static void main(String[] args) {
		SpringApplication.run(EkartApplication.class, args);
	}

}
