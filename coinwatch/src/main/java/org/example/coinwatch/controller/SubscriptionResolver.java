package org.example.coinwatch.controller;

import org.example.coinwatch.entity.Subscription;
import org.example.coinwatch.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class SubscriptionResolver {
    @Autowired
    private SubscriptionService subscriptionService;

    @MutationMapping
    public Subscription addSubscription(@Argument Long userId, @Argument Long cryptoId) {
        return subscriptionService.addSubscription(userId, cryptoId);
    }
}
