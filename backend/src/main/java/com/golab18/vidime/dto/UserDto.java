package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class UserDto {              // TODO user session table/spring security
    private Long id;
    private String email;
    private String passwordHash;
    private String createdAt;
}
