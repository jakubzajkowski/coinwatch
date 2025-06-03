package org.example.coinwatch.dto;

public class AiAnalyseResponseDTO {
    private String text;
    private Long userId;
    private String cryptoId;

    public AiAnalyseResponseDTO(String text, Long userId, String cryptoId) {
        this.text = text;
        this.userId = userId;
        this.cryptoId = cryptoId;
    }

    public String getCryptoId() {
        return cryptoId;
    }

    public void setCryptoId(String cryptoId) {
        this.cryptoId = cryptoId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
