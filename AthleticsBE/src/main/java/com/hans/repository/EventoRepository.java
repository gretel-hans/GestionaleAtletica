package com.hans.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long>{

	
}
