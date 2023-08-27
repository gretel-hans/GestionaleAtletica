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
	
	public int ev=0;
	
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
		Societa s=societaService.cercaSocietaConEmail(email);
		a.setOrganizzatori(s);
		a.setLuogoGara(s.getIndirizzo());
		a.setCodice(null);
		
		List<Evento> listaEventiSocieta=eventoRepo.findByOrganizzatori(a.getOrganizzatori());
		listaEventiSocieta.forEach(evento->{
			if(evento.getDataEvento().equals(a.getDataEvento())) {
				ev++;
				System.out.println("Ecco la data dell'evento: " + evento.getDataEvento());
			}
		});
		
		if(ev>0) {
			return null;
		}else {
			return eventoRepo.save(a);			
		}
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
