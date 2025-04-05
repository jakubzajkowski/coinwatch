package org.example.coinwatch.controller;


import jakarta.validation.Valid;
import org.example.coinwatch.dto.UserLoginDTO;
import org.example.coinwatch.dto.UserLoginResponseDTO;
import org.example.coinwatch.dto.UserRegisterResponseDTO;
import org.example.coinwatch.dto.UserRegistrationDTO;
import org.example.coinwatch.entity.User;
import org.example.coinwatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/api/auth/signup")
    public ResponseEntity<UserRegisterResponseDTO> signUp(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO){
        return new ResponseEntity<>(userService.registerUser(userRegistrationDTO), HttpStatus.CREATED);
    }

    @PostMapping("/api/auth/signin")
    public ResponseEntity<UserLoginResponseDTO> signIn(@Valid @RequestBody UserLoginDTO request){
        return new ResponseEntity<>(userService.login(request.getEmail(),request.getPassword()),HttpStatus.OK);
    }
}
