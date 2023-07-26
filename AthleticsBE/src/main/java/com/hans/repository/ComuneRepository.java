package com.hans.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Comune;


public interface ComuneRepository extends JpaRepository<Comune, Long> {

	public Comune findByNomeComune(String s);
	
	
}
