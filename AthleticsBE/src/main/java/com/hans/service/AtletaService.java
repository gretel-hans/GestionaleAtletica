package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.entity.Societa;
import com.hans.repository.AtletaRepository;
import com.hans.security.JwtTokenProvider;

@Service
public class AtletaService {

	@Autowired
	AtletaRepository atletaRepo;

	@Autowired JwtTokenProvider tokenP;

	@Autowired AllenatoreService allenatoreService;
	
	public Atleta salvaAtleta(Atleta atleta) {
		return atletaRepo.save(atleta);
	}
	
	public List<Atleta> cercaTuttiAtleti(){
		return atletaRepo.findAll();
	}
	
	public Atleta cercaAtletaConId(Long id) {
		if(atletaRepo.existsById(id)){
			return atletaRepo.findById(id).get();
		}else
		return null;
	}

	public List<Atleta> cercaAtletiConSocieta(String c){
		String email=tokenP.getUsername(c);
		Allenatore coach =allenatoreService.cercaAllenatoreConEmail(email);
		return atletaRepo.findAllBySocieta(coach.getSocieta());
	}

	public List<Atleta> cercaAtletaTest(Societa societa){
		return atletaRepo.findAllBySocieta(societa);
	}

}
