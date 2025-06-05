package com.golab18.vidime.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtGenerator {
    private final SecretKey key;
    private final int jwtAccessExpirationMs;
    private final int jwtRefreshExpirationMs;

    public JwtGenerator(
        @Value("${app.jwt.secret}") String jwtSecret,
        @Value("${app.jwt.access-token-expiration-ms}") int jwtAccessExpirationMs,
        @Value("${app.jwt.refresh-token-expiration-ms}") int jwtRefreshExpirationMs
    ) {
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.jwtAccessExpirationMs = jwtAccessExpirationMs;
        this.jwtRefreshExpirationMs = jwtRefreshExpirationMs;
    }

    public int getJwtRefreshExpirationMs() {
        return jwtRefreshExpirationMs;
    }

    public String generateToken(String email, boolean isRefreshToken) {
        return Jwts
            .builder()
            .subject(email)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + (isRefreshToken ? jwtRefreshExpirationMs : jwtAccessExpirationMs)))
            .signWith(key, Jwts.SIG.HS256)
            .compact();
    }

    public String validateAndRetrieveSubject(String token) {
        try {
            return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
        } catch (Exception e) {
            return null;
        }
    }
}
