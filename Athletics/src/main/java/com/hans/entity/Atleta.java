package com.hans.entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.hans.model.Risultato;
import com.hans.security.PasswordConverter;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "atleti")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Atleta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    private String lastname;
    
    private Integer age;
    
    private LocalDate birthdate;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Convert(converter = PasswordConverter.class)
    @Column(nullable = false)
    private String password;
    
    @Column(name = "date_registration")
    private LocalDateTime dateRegistration;
    
   @OneToMany(fetch = FetchType.EAGER)
   @JoinColumn(name="atleta_id")
   List<RisultatoConcorso> risultatiConcorsiAtleta;
   
   @OneToMany(fetch = FetchType.EAGER)
   @JoinColumn(name="atleta_id")
   List<RisultatoSerie> risultatiCorseAtleta;
    
}
