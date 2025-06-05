package com.golab18.vidime.auth;

import lombok.Data;

@Data
public class AuthRequest {
    private String email;
    private String password;
}
