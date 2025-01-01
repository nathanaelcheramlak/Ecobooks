package ecobooks.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ecobooks.models.UserModel;
import ecobooks.repositories.UserRepository;
import ecobooks.utils.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserModel registerUser(UserModel user, HttpServletResponse response) {
        validateRegistration(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("SECRET: " + jwtService.getSecretKey());
        System.out.println("EXPIRATION: " + jwtService.getTokenExpiration());
        UserModel savedUser = userRepository.save(user);

        // Generate a JWT for the new user and set it as a cookie
        String token = jwtService.generateToken(Map.of("role", savedUser.getRole()), savedUser.getEmail());
        setTokenCookie(token, response);
        
        return savedUser;
    }

    public Map<String, Object> authenticateUser(String email, String password, HttpServletResponse response) {
        UserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
            
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(Map.of("role", user.getRole()), email);
        setTokenCookie(token, response);

        return Map.of(
            "message", "Login successful",
            "user", user    
        );
    }

    public UserModel verifyUser(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new IllegalArgumentException("No token found");
        }

        String token = null;   
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("jwt")) {
                token = cookie.getValue();
                break;
            }
        }

        if (token == null) {
            throw new IllegalArgumentException("No token found");
        }

        String email;
        try {
            email = jwtService.extractAllClaims(token).getSubject();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token");
        }

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void setTokenCookie(String token, HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(jwtService.getTokenExpiration() / 1000) // ms to sec
                .sameSite("Strict")
                .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public void clearTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("jwt", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    private void validateRegistration(UserModel user) {
        if (user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be greater or equal to 8 characters.");
        }
        if (!user.getEmail().matches("[^@\\s]+@[^@\\s]+\\.[^@\\s]+")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (!user.getPhoneNumber().matches("\\d{10}")) {
            throw new IllegalArgumentException("Phone number must be 10 digits.");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already in use.");
        }
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new IllegalArgumentException("Phone number is already in use.");
        }
    }
}
