package com.golab18.vidime.auth;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.golab18.vidime.entity.User;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        if (!request.getServletPath().equals("/api/auth/login")) {
            filterChain.doFilter(request, response);
            return;
        }
    
        ObjectMapper objectMapper = new ObjectMapper();
        AuthRequest authRequest = objectMapper.readValue(request.getReader(), AuthRequest.class);
        
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
            authRequest.getEmail(),
            authRequest.getPassword()
        );  
    
        try {
            Authentication authRes = authenticationManager.authenticate(authToken);

            if (!authRes.isAuthenticated()) return;

            Long userId = ((User) authRes.getPrincipal()).getId();
            
            String jwtAccessToken = jwtGenerator.generateToken(authRes.getName(), userId, false);
            response.setHeader("Authorization", "Bearer " + jwtAccessToken);
        
            String jwtRefreshToken = jwtGenerator.generateToken(authRes.getName(), null, true);
            Cookie cookie = new Cookie("refreshToken", jwtRefreshToken);
            cookie.setHttpOnly(true);
            cookie.setSecure(false); // TODO change to true when switching to https
            cookie.setPath("/api/auth/refresh");
            cookie.setMaxAge(jwtGenerator.getJwtRefreshExpirationMs() / 1000);
        
            response.addCookie(cookie);
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
    }
    
}
