package ecobooks.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import ecobooks.repositories.UserRepository;
import ecobooks.models.UserModel;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;
    private BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private String hashPassword(String raw) {
        String hashed = bcrypt.encode(raw);
        return hashed;
    }

    // Register User
    public UserModel registerUser(UserModel user) {
        String rawPassword = user.getPassword();

        // Validations
        if (rawPassword.length() < 8) {
            throw new IllegalArgumentException("Password must be greater or equal to 8 characters.");
        }
        if (!user.getEmail().matches("[^@\\s]+@[^@\\s]+\\.[^@\\s]+")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        if (!user.getPhoneNumber().matches("\\d{10}")) {
            throw new IllegalArgumentException("Phone number must be 10 digits.");
        }

        // Existing User Checker
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use.");
        }
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new IllegalArgumentException("Phone number already in use.");
        }
        
        // Hash password        
        String hashedPassword = this.hashPassword(rawPassword);
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    // Update User
    public UserModel updateUser(Long id, UserModel user) {
        UserModel oldUser = userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found"));

        if (user.getName() != null) {
            oldUser.setName(user.getName());
        }
        if (user.getPhoneNumber() != null) {
            oldUser.setPhoneNumber(user.getPhoneNumber());
        }
        if (user.getEmail() != null) {
            oldUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null) {
            if (user.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be greater or equal to 8 characters.");
            }
            oldUser.setPassword(this.hashPassword(user.getPassword()));
        }
        if (user.getLogoUrl() != null) {
            oldUser.setLogoUrl(user.getLogoUrl());
        }
        if (user.getRole() != null) {
            oldUser.setRole(user.getRole());
        }
        // TODO: Add a role validator.
        return userRepository.save(oldUser);
    }

    // Delete User
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("User not found");
        }
        userRepository.deleteById(id);
    }

    // Get all users
    public List<UserModel> getAllUser() {
        return userRepository.findAll();
    }

    // Get user by id
    public Optional<UserModel> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Get user by email
    public Optional<UserModel> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Get user by phone number
    public Optional<UserModel> getUserByPhone(String phone) {
        return userRepository.findByPhoneNumber(phone);
    }
}
