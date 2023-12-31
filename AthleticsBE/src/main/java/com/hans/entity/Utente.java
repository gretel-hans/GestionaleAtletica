package com.hans.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

import com.hans.security.PasswordConverter;

import java.util.HashSet;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name="utenti")
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Utente {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String username;

	private String nome;	
	
	@Column(nullable = false)
	private String email;
	
	@Convert(converter = PasswordConverter.class)
    @Column(nullable = false)
    private String password;

	private String cognome;

	private Integer eta;

	@ManyToOne
	private Societa societa;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles = new HashSet<>();
    

	
	
	
	

	
}
