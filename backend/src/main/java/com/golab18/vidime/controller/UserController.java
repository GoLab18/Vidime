package com.golab18.vidime.controller;

import com.golab18.vidime.auth.AuthRequest;
import com.golab18.vidime.dto.UserDto;
import com.golab18.vidime.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody AuthRequest authRequest) {
        UserDto userDto = userService.createUser(authRequest);
        return ResponseEntity.ok(userDto);
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
