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
		garaC.getPartecipanti().forEach(a->{
			if(garaC.getGenereGara()==(a.getGenere())) {
				listaAtleti.add(a);
			}
		});
		garaC.setPartecipanti(listaAtleti);
		return garaCorsaRepo.save(garaC);
	}
	
	public List<GaraCorsa> cercaTutteGareCorse(){
		return garaCorsaRepo.findAll();
	}
	
	public GaraCorsa cercaGaraCorsaConId(Long id) {
		return garaCorsaRepo.findById(id).get();
	}
}
