package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Societa;
import com.hans.repository.SocietaRepository;

@Service
public class SocietaService {

	@Autowired
	SocietaRepository sRepo;
	
	public Societa salvaSocieta(Societa s) {
		return sRepo.save(s);
	}
	
	public Societa modificaSocieta(Societa s) {
		return sRepo.save(s);
	}
	
	public Societa cercaSocietaConId(Long id) {
		return sRepo.findById(id).get();
	}
	
	public Societa cercaSocietaConEmail(String s) {
		return sRepo.findByEmail(s);
	}
	
	public List<Societa> cercaTutteSocieta() {
		return sRepo.findAll();
	}
}
