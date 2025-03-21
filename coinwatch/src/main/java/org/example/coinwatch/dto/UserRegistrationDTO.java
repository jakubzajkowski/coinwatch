package org.example.coinwatch.dto;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.Set;

public class UserRegistrationDTO {
    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Date of birth is required")
    private LocalDate dateOfBirth;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Invalid phone number")
    private String phoneNumber;

    @NotBlank(message = "Country is required")
    private String country;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern(regexp = ".*[0-9].*", message = "Password must contain a number")
    @Pattern(regexp = ".*[!@#$%^&*()_+{}:;<>,.?~].*", message = "Password must contain a special character")
    private String password;

    @NotBlank(message = "Password confirmation is required")
    private String confirmPassword;

    @NotBlank(message = "Preferred currency is required")
    private String preferredCurrency;

    @NotNull(message = "Experience level is required")
    private ExperienceLevel experienceLevel;

    @NotEmpty(message = "At least one interest must be selected")
    private Set<Interest> interests;

    @AssertTrue(message = "You must agree to the Terms of Service and Privacy Policy")
    private boolean agreedToTerms;

    private boolean receiveUpdates;

    public enum ExperienceLevel {
        BEGINNER, INTERMEDIATE, EXPERT
    }

    public enum Interest {
        BITCOIN, TRADING, ETHEREUM, MINING, DEFI, STAKING, NFTS, NEWS
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getPreferredCurrency() {
        return preferredCurrency;
    }

    public void setPreferredCurrency(String preferredCurrency) {
        this.preferredCurrency = preferredCurrency;
    }

    public ExperienceLevel getExperienceLevel() {
        return experienceLevel;
    }

    public void setExperienceLevel(ExperienceLevel experienceLevel) {
        this.experienceLevel = experienceLevel;
    }

    public Set<Interest> getInterests() {
        return interests;
    }

    public void setInterests(Set<Interest> interests) {
        this.interests = interests;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public boolean isReceiveUpdates() {
        return receiveUpdates;
    }

    public void setReceiveUpdates(boolean receiveUpdates) {
        this.receiveUpdates = receiveUpdates;
    }
}
