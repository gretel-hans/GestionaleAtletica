package com.hans.entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.hans.enums.Genere;
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
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String lastname;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Genere genere;
    
    private Integer age;
    
    @Column(nullable = false)
    private LocalDate birthdate;
    
    @JoinColumn(nullable = false)
    @ManyToOne
    private Societa societa;
    
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Convert(converter = PasswordConverter.class)
    @Column(nullable = false)
    private String password;
    
    @Column(name = "date_registration")
    private LocalDateTime dateRegistration;
    
   /* 
   @OneToMany(fetch = FetchType.EAGER)
   @JoinColumn(name="atleta_id")
   List<RisultatoConcorso> risultatiConcorsiAtleta;
   
   @OneToMany(fetch = FetchType.EAGER)
   @JoinColumn(name="atleta_id")
   List<RisultatoBatteria> risultatiCorseAtleta;
   */ 
   @ManyToOne
   private Role role;
   
}
