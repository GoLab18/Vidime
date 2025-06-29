package com.golab18.vidime.service;

import com.golab18.vidime.auth.AuthRequest;

public interface UserService {
    void createUser(AuthRequest authRequest);
    void deleteUser(Long id);
}
