package com.hans.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Allenatore;
import com.hans.entity.Evento;
import com.hans.entity.Societa;
import com.hans.repository.AllenatoreRepository;
import com.hans.repository.EventoRepository;
import com.hans.security.JwtTokenProvider;

@Service
public class EventoService {

	@Autowired EventoRepository eventoRepo;
	
	@Autowired SocietaService societaService;
	
	@Autowired JwtTokenProvider tokenP;
	
	public Evento salvaEvento(Evento a) {
		String email=tokenP.getUsername(a.getCodice());
		Societa s=societaService.cercaSocietaConEmail(email);
		a.setOrganizzatori(s);
		a.setLuogoGara(s.getIndirizzo());
		a.setCodice(null);
		return eventoRepo.save(a);
	}
	
	public List<Evento> cercaTuttiEventi(){
		return eventoRepo.findAll();
	}
	
	public Evento cercaEventoConId(Long id) {
		return eventoRepo.findById(id).get();
	}
}
