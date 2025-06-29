package com.golab18.vidime.auth;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.golab18.vidime.entity.User;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtRefreshFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        if (!request.getServletPath().equals("/api/auth/refresh")) {
            filterChain.doFilter(request, response);
            return;
        }

        String refreshToken = extractJwtTokenFromRequest(request);
        if (refreshToken == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        JwtAuthenticationToken jwtAuthToken = new JwtAuthenticationToken(refreshToken);
        Authentication authRes = authenticationManager.authenticate(jwtAuthToken);

        if (!authRes.isAuthenticated()) return;

        Long userId = ((User) authRes.getPrincipal()).getId();

        String jwtAccessToken = jwtGenerator.generateToken(authRes.getName(), userId, false);
        response.setHeader("Authorization", "Bearer " + jwtAccessToken);
    }

    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refreshToken")) return cookie.getValue();
        }

        return null;
    }
}