package org.example.coinwatch.service;

import jakarta.transaction.Transactional;
import org.example.coinwatch.component.JwtUtil;
import org.example.coinwatch.dto.*;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.exception.InvalidUsernameOrPasswordException;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    public UserRegisterResponseDTO registerUser(UserRegistrationDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email is already in use");
        }

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setCountry(dto.getCountry());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPreferredCurrency(dto.getPreferredCurrency());
        ExperienceLevel level = ExperienceLevel.fromString(dto.getExperienceLevel());
        user.setExperienceLevel(level);
        Set<Interest> interests = new HashSet<>();
        for(String interest : dto.getInterests()){
            interests.add(Interest.fromString(interest));
        }
        user.setInterests(interests);
        user.setAgreedToTerms(dto.isAgreedToTerms());
        user.setReceiveUpdates(dto.isReceiveUpdates());
        User createdUser = userRepository.save(user);

        return new UserRegisterResponseDTO(createdUser.getId(),createdUser.getEmail());
    }
    public UserLoginResponseDTO login(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (passwordEncoder.matches(password, userDetails.getPassword())) {
            String token = jwtUtil.generateToken(username);
            String email = userDetails.getUsername();
            User user = userRepository.findByEmail(email).orElseThrow(()->new IllegalArgumentException("User not found"));
            return new UserLoginResponseDTO(token,email,user.getId(),user.getFirstName(),user.getLastName());
        } else {
            throw new InvalidUsernameOrPasswordException("Invalid username or password");
        }
    }
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(()->new IllegalArgumentException("Invalid user id"));
    }

    @Cacheable(value = "users")
    public List<User> redisTest() {
        return userRepository.findAll();
    }

}
