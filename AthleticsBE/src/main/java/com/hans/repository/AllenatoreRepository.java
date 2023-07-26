package com.hans.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Allenatore;


public interface AllenatoreRepository extends JpaRepository<Allenatore, Long> {

	public Allenatore findByEmail(String email);
	
}
