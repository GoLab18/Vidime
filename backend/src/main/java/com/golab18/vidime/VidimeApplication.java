package com.golab18.vidime;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VidimeApplication {

	public static void main(String[] args) {
		SpringApplication.run(VidimeApplication.class, args);
	}

}
