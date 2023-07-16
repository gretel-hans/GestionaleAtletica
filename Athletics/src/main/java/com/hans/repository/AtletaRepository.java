package com.hans.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hans.entity.Atleta;
import com.hans.entity.Societa;


public interface AtletaRepository extends JpaRepository<Atleta, Long> {

	public List<Atleta> findAllBySocieta(Societa societa);


	
}
