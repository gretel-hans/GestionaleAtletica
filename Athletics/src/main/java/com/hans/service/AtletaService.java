package com.hans.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.entity.Societa;
import com.hans.repository.AllenatoreRepository;
import com.hans.repository.AtletaRepository;

@Service
public class AtletaService {

	@Autowired
	AtletaRepository atletaRepo;
	
	@Autowired
	SocietaService societaRepo;
	
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
