package org.example.coinwatch.service;

import org.example.coinwatch.dto.ExperienceLevel;
import org.example.coinwatch.dto.Interest;
import org.example.coinwatch.dto.UserRegisterResponseDTO;
import org.example.coinwatch.dto.UserRegistrationDTO;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


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
}
