package com.hans.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.hans.security.PasswordConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="societa")
public class Societa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Indirizzo indirizzo;
    
    @Column(name = "nome_societa",nullable = false)
    private String nomeSocieta;
	
    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Convert(converter = PasswordConverter.class)
    @Column(nullable = false)
    private String password;
    
    @Column(name = "date_registration",nullable = false)
    private LocalDateTime dateRegistration;
    
    @ManyToOne
    private Role role;
}
