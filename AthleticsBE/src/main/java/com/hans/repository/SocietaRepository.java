package com.hans.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Societa;



public interface SocietaRepository extends JpaRepository<Societa, Long> {

	public Societa findByEmail(String email);
	
}
