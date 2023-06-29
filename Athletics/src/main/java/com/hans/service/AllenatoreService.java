package com.hans.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.repository.AllenatoreRepository;

@Service
public class AllenatoreService {

	@Autowired
	AllenatoreRepository aRepo;
	
	public Allenatore salvaAllenatore(Allenatore a) {
		return aRepo.save(a);
	}
}
