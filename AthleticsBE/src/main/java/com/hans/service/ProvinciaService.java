package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Provincia;
import com.hans.repository.ProvinciaRepository;

@Service
public class ProvinciaService {
	
	@Autowired
	ProvinciaRepository provinciaRepository;
	
	public Provincia salvaProvincia(Provincia p) {
		return provinciaRepository.save(p);
	}

	public Provincia cercaProvinciaConNome(String nome) {
		return provinciaRepository.findByNome(nome);
	}
	
	public List<Provincia> cercaTutteProvince() {
		return provinciaRepository.findAll();
	}
	
}
  