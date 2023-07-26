package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Comune;
import com.hans.repository.ComuneRepository;

@Service
public class ComuneService {
	
	@Autowired
	ComuneRepository comuneRepository;
	
	public Comune salvaComune(Comune c) {
		return comuneRepository.save(c);
	}

	public Comune cercaComuneConNome(String nomeComune) {
		return comuneRepository.findByNomeComune(nomeComune);
	}
	
	public Comune cercaComuneConId(Long id) {
		return comuneRepository.findById(id).get();
	}
	
	public List<Comune> cercaTuttiComuni() {
		return comuneRepository.findAll();
	}
	
}
  