package ecobooks.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ecobooks.models.UserModel;
import ecobooks.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Create user
    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody @Valid UserModel user) {
        UserModel newUser = userService.registerUser(user);
        return ResponseEntity.status(201).body(Map.of("message", "User created successfully", "user", newUser));
    }

    // Update user by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody @Valid UserModel user) {
        UserModel updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(Map.of("message", "User updated successfully", "user", updatedUser));
    }

    // Delete user by id
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.status(204).body(Map.of("message", "User deleted successfully"));  
    }

    // Get all users
    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserModel> users = userService.getAllUser();
        return ResponseEntity.ok(Map.of("users", users, "count", users.size()));
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(Map.of(
                    "message", "User retrieved successfully",
                    "user", user
                ))) // 200 OK with message and user data
                .orElse(ResponseEntity.status(404).body(Map.of(
                    "error", "User not found"
                ))); // 404 Not Found with error message
    }

    // Get user by Email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email)
                .map(user -> ResponseEntity.ok(Map.of(
                    "message", "User retrieved successfully",
                    "user", user
                ))) // 200 OK with message and user data
                .orElse(ResponseEntity.status(404).body(Map.of(
                    "error", "User with the provided email not found"
                ))); // 404 Not Found with error message
    }

    // Get user by Phone
    @GetMapping("/phone/{phone}")
    public ResponseEntity<?> getUserByPhone(@PathVariable String phone) {
        return userService.getUserByPhone(phone)
                .map(user -> ResponseEntity.ok(Map.of(
                    "message", "User retrieved successfully",
                    "user", user
                ))) // 200 OK with message and user data
                .orElse(ResponseEntity.status(404).body(Map.of(
                    "error", "User with the provided phone number not found"
                ))); // 404 Not Found with error message
    }

}
