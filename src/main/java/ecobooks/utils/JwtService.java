package ecobooks.utils;

import io.github.cdimascio.dotenv.Dotenv;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    // @Value("${SECURITY_JWT_SECRET:default_secret}")
    private String secretKey = "3cfa76ef14937c1d2ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e003an";

    // @Value("${SECURITY_JWT_TOKEN_EXPIRATION:1000000}")
    private long tokenExpiration = 604800000;

    private Key key;

    @PostConstruct
    public void init() {
        // Dotenv dotenv = Dotenv.load();
        // this.secretKey = dotenv.get("SECURITY_JWT_SECRET", "default_secret123");
        // this.tokenExpiration = Long.parseLong(dotenv.get("SECURITY_JWT_TOKEN_EXPIRATION", "604800000"));

        // Initialize the signing key
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String generateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(String subject) {
        return generateToken(Map.of(), subject);
    }

    public Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            logger.error("JWT token has expired: {}", e.getMessage());
            throw e;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            logger.error("Unsupported JWT token: {}", e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
            throw e;
        }
    }

    public <T> T extractClaim(String token, String claimKey, Class<T> requiredType) {
        Claims claims = extractAllClaims(token);
        return claims.get(claimKey, requiredType);
    }

    public String extractSubject(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String subject) {
        try {
            final String extractedSubject = extractSubject(token);
            return extractedSubject.equals(subject) && !isTokenExpired(token);
        } catch (JwtException e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            return extractAllClaims(token).getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        }
    }

    // Optional: Add method to validate token without checking subject
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // Getters
    public String getSecretKey() {
        return this.secretKey;
    }

    public long getTokenExpiration() {
        return this.tokenExpiration;
    }
}