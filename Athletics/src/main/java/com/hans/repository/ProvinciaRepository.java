package com.hans.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Provincia;



public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {

	public Provincia findByNome(String nome);

	
}
