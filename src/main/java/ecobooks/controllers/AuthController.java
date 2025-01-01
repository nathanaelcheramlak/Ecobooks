package ecobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ecobooks.models.UserModel;
import ecobooks.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Register a new user
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid UserModel user, HttpServletResponse response) {
        UserModel savedUser = authService.registerUser(user, response);
        return ResponseEntity.status(201).body(savedUser);
    }

    // Login a user
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpServletResponse response) {
        String email = credentials.get("email");
        String password = credentials.get("password");
    
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required."));
        }
    
        Map<String, Object> result = authService.authenticateUser(email, password, response);
        return ResponseEntity.ok(result);
    }

    // Logout a user
    @GetMapping("/logout")
    public ResponseEntity<?> postMethodName(HttpServletResponse response) {
        authService.clearTokenCookie(response);
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }

    // Verify User
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(HttpServletRequest request) {
        UserModel user = authService.verifyUser(request);
        return ResponseEntity.ok(Map.of(
            "message", "User verified successfully.",
            "user", user
        ));
    }
    
}
