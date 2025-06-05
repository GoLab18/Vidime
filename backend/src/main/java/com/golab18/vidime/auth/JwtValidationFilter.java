package com.golab18.vidime.auth;

import java.io.IOException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtValidationFilter extends OncePerRequestFilter {

    private final AuthenticationManager authenticationManager;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        
        String token = extractJwtTokenFromRequest(request);
        if (token != null) {
            JwtAuthenticationToken jwtAuthToken = new JwtAuthenticationToken(token);
            Authentication authRes = authenticationManager.authenticate(jwtAuthToken);

            if (authRes.isAuthenticated()) SecurityContextHolder.getContext().setAuthentication(authRes);
        }
        
        filterChain.doFilter(request, response);
    }
    
    private String extractJwtTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) return bearerToken.substring(7);
        return null;
    }
}
