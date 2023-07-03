package com.hans.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Atleta;
import com.hans.entity.GaraConcorso;
import com.hans.repository.GaraConcorsoRepository;

@Service
public class GaraConcorsoService {

	@Autowired
	GaraConcorsoRepository garaConcorsoRepo;
	
	
	public GaraConcorso salvaGaraConcorso(GaraConcorso garaConcorso) {
		return garaConcorsoRepo.save(garaConcorso);
	}
	
	public List<GaraConcorso> cercaTutteGaraConcorsi(){
		return garaConcorsoRepo.findAll();
	}
	
	public GaraConcorso cercaGaraConcorsoConId(Long id) {
		return garaConcorsoRepo.findById(id).get();
	}


	public GaraConcorso iscriviAtleta(Long id, List<Atleta> atleti) {
		GaraConcorso gara=garaConcorsoRepo.findById(id).get();
		List<Atleta> listaDefinitiva=new ArrayList<>();
		if(gara.getPartecipanti().size()==0) {

		}else {
			listaDefinitiva.addAll(gara.getPartecipanti());
		}
		atleti.forEach(a->{
			if(listaDefinitiva.size()<gara.getMassimoPartecipanti()&&a.getGenere()==gara.getGenereGara()) {
				listaDefinitiva.add(a);
			}
		});
		gara.setPartecipanti(listaDefinitiva);
		return salvaGaraConcorso (gara);
	}
}
