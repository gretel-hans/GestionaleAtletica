package com.hans.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Evento;
import com.hans.entity.Societa;

public interface EventoRepository extends JpaRepository<Evento, Long>{

	public List<Evento> findByOrganizzatori(Societa Organizzatori);
}
