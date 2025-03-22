package org.example.coinwatch.dto;

public enum ExperienceLevel {
    BEGINNER, INTERMEDIATE, EXPERT;

    public static ExperienceLevel fromString(String value) {
        for (ExperienceLevel level : ExperienceLevel.values()) {
            if (level.name().equalsIgnoreCase(value)) {
                return level;
            }
        }
        throw new IllegalArgumentException("Invalid type od experience: " + value);
    }
}
