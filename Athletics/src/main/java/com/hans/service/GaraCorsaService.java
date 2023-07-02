package com.hans.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Atleta;
import com.hans.entity.GaraCorsa;
import com.hans.repository.GaraCorsaRepository;

@Service
public class GaraCorsaService {

	@Autowired
	GaraCorsaRepository garaCorsaRepo;
	
	
	public GaraCorsa salvaGaraCorsa(GaraCorsa garaC) {
		List<Atleta> listaAtleti=new ArrayList<Atleta>();
		
		if(garaC.getPartecipanti()!=null) {
			garaC.getPartecipanti().forEach(a->{
				if(garaC.getGenereGara()==(a.getGenere())) {
					listaAtleti.add(a);
				}
			});			
		}
		
		garaC.setPartecipanti(listaAtleti);
		return garaCorsaRepo.save(garaC);
	}
	
	public List<GaraCorsa> cercaTutteGareCorse(){
		return garaCorsaRepo.findAll();
	}
	
	public GaraCorsa cercaGaraCorsaConId(Long id) {
		return garaCorsaRepo.findById(id).get();
	}
	
	
	public GaraCorsa iscriviAtleta(Long id, List<Atleta> atleti) {
		GaraCorsa gara=garaCorsaRepo.findById(id).get();
		List<Atleta> listaDefinitiva=new ArrayList<>();
		if(gara.getPartecipanti().size()==0) {
		}else {
			listaDefinitiva.addAll(gara.getPartecipanti());			
		}
		atleti.forEach(a->{
			if(gara.getPartecipanti().size()<=gara.getMassimoPartecipanti()) {
				listaDefinitiva.add(a);
			}			
		});
		gara.setPartecipanti(listaDefinitiva);
		return salvaGaraCorsa (gara);
	}
	
}
