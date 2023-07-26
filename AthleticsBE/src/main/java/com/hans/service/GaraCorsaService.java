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
		Integer[] range= range(gara.getCategoria().toString());
		//System.out.println("min: "+range[0]+" max:"+range[1]);
		
		List<Atleta> listaDefinitiva=new ArrayList<>();
		if(gara.getPartecipanti().size()==0) {

		}else {
			listaDefinitiva.addAll(gara.getPartecipanti());
		}
		atleti.forEach(a->{
			giaEsistente=false;
			if(listaDefinitiva.size()<gara.getMassimoPartecipanti()&&a.getGenere()==gara.getGenereGara()&& (a.getAge()>= range[0]&&a.getAge()<= range[1])) {
				 garaCorsaRepo.findById(id).get().getPartecipanti().forEach(atleta->{
					if(atleta.getEmail().equalsIgnoreCase(a.getEmail())){
						//System.out.println("Atleta già presente con id"+a.getId());
						giaEsistente=true;
					}
				 });
				 	if(!giaEsistente){
						//System.out.println("ecco l'eta:"+a.getAge());
						 listaDefinitiva.add(a);
					}
			}
		});
		gara.setPartecipanti(listaDefinitiva);
		return salvaGaraCorsa (gara);
	}

	public Integer[] range(String categoria){
		Integer[] rangeEta=new Integer[2];
		switch(categoria){
			case("Esordienti"):
			rangeEta[0]=6;
			rangeEta[1]=11;
			return rangeEta;

			case("Ragazzi"):
			rangeEta[0]=12;
			rangeEta[1]=13;
			return rangeEta;

			case("Cadetti"):
			rangeEta[0]=14;
			rangeEta[1]=15;
			return rangeEta;

			case("Allievi"):
			rangeEta[0]=16;
			rangeEta[1]=17;
			return rangeEta;

			case("Juniores"):
			rangeEta[0]=18;
			rangeEta[1]=19;
			return rangeEta;

			case("Promesse"):
			rangeEta[0]=20;
			rangeEta[1]=22;
			return rangeEta;

			case("Seniores"):
			rangeEta[0]=23;
			rangeEta[1]=34;
			return rangeEta;

			case("Master"):
			rangeEta[0]=35;
			rangeEta[1]=100;
			return rangeEta;

			case("Assoluti"):
			rangeEta[0]=16;
			rangeEta[1]=34;
			return rangeEta;

			default:
			return null;
		}
	}
	
}
