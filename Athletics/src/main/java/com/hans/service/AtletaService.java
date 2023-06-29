package com.hans.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.repository.AllenatoreRepository;
import com.hans.repository.AtletaRepository;

@Service
public class AtletaService {

	@Autowired
	AtletaRepository aRepo;
	
	public Atleta salvaAtleta(Atleta atleta) {
		return aRepo.save(atleta);
	}
}
