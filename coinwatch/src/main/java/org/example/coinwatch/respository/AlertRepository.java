package org.example.coinwatch.respository;

import org.example.coinwatch.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AlertRepository extends JpaRepository<Alert,Long> {
    Optional<List<Alert>> findAlertsByUserId(Long user_id);
}
