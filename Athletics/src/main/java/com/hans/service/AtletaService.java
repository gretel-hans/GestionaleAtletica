package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Atleta;
import com.hans.repository.AtletaRepository;

@Service
public class AtletaService {

	@Autowired
	AtletaRepository atletaRepo;
	
	public Atleta salvaAtleta(Atleta atleta) {
		return atletaRepo.save(atleta);
	}
	
	public List<Atleta> cercaTuttiAtleti(){
		return atletaRepo.findAll();
	}
	
	public Atleta cercaAtletaConId(Long id) {
		return atletaRepo.findById(id).get();
	}
}
