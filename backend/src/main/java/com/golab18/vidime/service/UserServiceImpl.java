package com.golab18.vidime.service;

import com.golab18.vidime.auth.AuthRequest;
import com.golab18.vidime.dto.UserDto;
import com.golab18.vidime.entity.User;
import com.golab18.vidime.repository.UserRepository;
import com.golab18.vidime.mapper.UserMapper;
import com.golab18.vidime.exception.ResourceNotFoundException;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void createUser(AuthRequest authRequest) {
        User user = userMapper.toEntity(authRequest);
        user.setPasswordHash(passwordEncoder.encode(authRequest.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
    }
}
