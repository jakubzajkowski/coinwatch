package org.example.coinwatch.dto;

public class UserRegisterResponseDTO {
    private Long id;
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRegisterResponseDTO(Long id, String email) {
        this.id = id;
        this.email = email;
    }
}
