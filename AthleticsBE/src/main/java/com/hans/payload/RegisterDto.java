package com.hans.payload;

import java.time.LocalDate;
import java.util.Set;

import com.hans.entity.Indirizzo;
import com.hans.entity.Societa;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    private String name;
    private String lastname;
    private String username;
    private String genere;
    private LocalDate birthdate;
    private String email;
    private String password;
    private Societa societa;
    private Indirizzo indirizzo;
    private Set<String> roles;
}

