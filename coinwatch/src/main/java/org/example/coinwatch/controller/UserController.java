package org.example.coinwatch.controller;


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

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/api/signup")
    public ResponseEntity<User> signUp(@Valid @RequestBody UserRegistrationDTO userRegistrationDTO){
        return new ResponseEntity<>(userService.registerUser(userRegistrationDTO), HttpStatus.OK);
    }
}
