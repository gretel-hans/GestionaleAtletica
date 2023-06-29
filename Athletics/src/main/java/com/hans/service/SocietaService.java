package com.hans.service;

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
}
