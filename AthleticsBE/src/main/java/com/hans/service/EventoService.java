package com.hans.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Evento;
import com.hans.entity.GaraConcorso;
import com.hans.entity.GaraCorsa;
import com.hans.entity.Societa;
import com.hans.repository.EventoRepository;
import com.hans.security.JwtTokenProvider;

@Service
public class EventoService {

	@Autowired EventoRepository eventoRepo;
	
	@Autowired SocietaService societaService;

	@Autowired GaraCorsaService garaCorsaService;

	@Autowired GaraConcorsoService garaConcorsoService;

	
	@Autowired JwtTokenProvider tokenP;
	
	public Evento salvaEvento(Evento a) {
		List<GaraConcorso> listaConcorsi=new ArrayList<GaraConcorso>();
		a.getListaGareConcorsi().forEach(g->{
			listaConcorsi.add(garaConcorsoService.salvaGaraConcorso(g));
		});
		a.setListaGareConcorsi(listaConcorsi);

		List<GaraCorsa> listaCorse=new ArrayList<GaraCorsa>();
		a.getListaGareCorse().forEach(g->{
			listaCorse.add(garaCorsaService.salvaGaraCorsa(g));
		});
		a.setListaGareCorse(listaCorse);
		String email=tokenP.getUsername(a.getCodice());
		System.out.println("eccola: "+email);
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
		if(eventoRepo.existsById(id)){
			return eventoRepo.findById(id).get();
		}else{
			return null;
		}
	}
}
