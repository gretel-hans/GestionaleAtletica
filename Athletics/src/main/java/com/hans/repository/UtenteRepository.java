package com.hans.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Utente;



public interface UtenteRepository extends JpaRepository<Utente,Long>{

    Optional<Utente> findByEmail(String email);

    Optional<Utente> findByUsernameOrEmail(String username, String email);

    Optional<Utente> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
	
	public Utente findByNome(String nome);
	
	}
