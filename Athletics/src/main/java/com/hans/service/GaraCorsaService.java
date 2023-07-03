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
			if(listaDefinitiva.size()<gara.getMassimoPartecipanti()&&a.getGenere()==gara.getGenereGara()) {
				//System.out.println("ecco quanti sono gli atleti in tutto: "+listaDefinitiva.size());
				listaDefinitiva.add(a);
			}			
		});
		//System.out.println("atleti in tutto: "+listaDefinitiva.size());
		gara.setPartecipanti(listaDefinitiva);
		gara.getPartecipanti().forEach(a->System.out.println("nome: "+a.getId()));
		return salvaGaraCorsa (gara);
	}
	
}
