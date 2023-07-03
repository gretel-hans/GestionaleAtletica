package com.hans.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hans.entity.Atleta;
import com.hans.entity.GaraCorsa;
import com.hans.repository.GaraCorsaRepository;

import jakarta.persistence.EntityExistsException;

@Service
public class GaraCorsaService {

	@Autowired
	GaraCorsaRepository garaCorsaRepo;
	
	
	public GaraCorsa salvaGaraCorsa(GaraCorsa garaC) {
		return garaCorsaRepo.save(garaC);
	}
	
	public List<GaraCorsa> cercaTutteGareCorse(){
		return garaCorsaRepo.findAll();
	}
	
	public GaraCorsa cercaGaraCorsaConId(Long id) {
		return garaCorsaRepo.findById(id).get();
	}

	boolean giaEsistente;
	public GaraCorsa iscriviAtleta(Long id, List<Atleta> atleti) {
		GaraCorsa gara=garaCorsaRepo.findById(id).get();
		List<Atleta> listaDefinitiva=new ArrayList<>();
		if(gara.getPartecipanti().size()==0) {

		}else {
			listaDefinitiva.addAll(gara.getPartecipanti());
		}
		atleti.forEach(a->{
			giaEsistente=false;
			if(listaDefinitiva.size()<gara.getMassimoPartecipanti()&&a.getGenere()==gara.getGenereGara()) {
				 garaCorsaRepo.findById(id).get().getPartecipanti().forEach(atleta->{
					if(atleta.getEmail().equalsIgnoreCase(a.getEmail())){
						System.out.println("Atleta già presente con id"+a.getId());
						giaEsistente=true;
					}
				 });
				 	if(!giaEsistente){
						 listaDefinitiva.add(a);
					}
			}
		});
		gara.setPartecipanti(listaDefinitiva);
		return salvaGaraCorsa (gara);
	}
	
}
