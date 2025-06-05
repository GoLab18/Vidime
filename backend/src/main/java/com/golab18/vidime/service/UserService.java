package com.golab18.vidime.service;

import com.golab18.vidime.auth.AuthRequest;
import com.golab18.vidime.dto.UserDto;

public interface UserService {
    UserDto createUser(AuthRequest authRequest);
    void deleteUser(Long id);
}
