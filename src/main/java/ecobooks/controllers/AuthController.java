package ecobooks.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import ecobooks.models.UserModel;
import ecobooks.models.UserRole;
import ecobooks.services.AuthService;
import ecobooks.utils.CloudinaryService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private final AuthService authService;

    @Autowired
    private final CloudinaryService cloudinaryService;

    public AuthController(AuthService authService, CloudinaryService cloudinaryService) {
        this.authService = authService;
        this.cloudinaryService = cloudinaryService;
    }

    // Register a new user
    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("role") String role,
            @RequestParam(value = "image", required = false) MultipartFile image,
            HttpServletResponse response
        ) {

        // Handle the image file if it exists
        String logoUrl = null;
        if (image != null) {
            logoUrl = cloudinaryService.uploadFile(image);  // Upload image and get the URL
        }

        // Convert the role to an enum
        UserRole userRole;
        try {
            userRole = UserRole.valueOf(role.toUpperCase()); // Convert string to enum (case-insensitive)
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }

        UserModel user = new UserModel(name, phoneNumber, password, email, userRole, logoUrl);
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
