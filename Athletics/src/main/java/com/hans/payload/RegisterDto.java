package com.hans.payload;

import java.time.LocalDate;
import java.util.Set;

import com.hans.enums.Genere;

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
    // Passagio di ruoli dal client (Facoltativo)
    private Set<String> roles;
}

// Il client dovrà inviare un oggetto JSON nel body con questa forma
/*{
    "name": "Francesca Neri",
    "username": "francescaneri",
    "email": "f.neri@example.com",
    "password": "qwerty",
    "roles": ["MODERATOR", "USER"]
}*/
