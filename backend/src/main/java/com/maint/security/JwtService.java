package com.maint.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties props;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(Base64.getDecoder().decode(props.getSecret()));
    }

    public String generateAccessToken(String userId, String tenantId, List<String> roles) {
        return Jwts.builder()
                .subject(userId)
                .claim("tenantId", tenantId)
                .claim("roles", roles)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + props.getAccessTokenTtl()))
                .signWith(key())
                .compact();
    }

    public String generateRefreshToken(String userId) {
        return Jwts.builder()
                .subject(userId)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + props.getRefreshTokenTtl()))
                .signWith(key())
                .compact();
    }

    public Claims validateToken(String token) {
        try {
            return Jwts.parser().verifyWith(key()).build()
                    .parseSignedClaims(token).getPayload();
        } catch (JwtException e) {
            throw new RuntimeException("Invalid token", e);
        }
    }
}
