package org.example.coinwatch.controller;

import org.example.coinwatch.entity.User;
import org.example.coinwatch.respository.UserRepository;
import org.example.coinwatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class UserResolver {

    @Autowired
    private UserService userService;

    @QueryMapping
    public User getUserById(@Argument Long id){
        return userService.getUserById(id);
    }
}
