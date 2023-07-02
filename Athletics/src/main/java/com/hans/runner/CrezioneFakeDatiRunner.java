package com.hans.runner;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
import com.hans.entity.Evento;
import com.hans.entity.GaraCorsa;
import com.hans.entity.Indirizzo;
import com.hans.entity.Societa;
import com.hans.enums.Genere;
import com.hans.enums.TipiGare;
import com.hans.payload.LoginDto;
import com.hans.payload.RegisterDto;
import com.hans.service.AllenatoreService;
import com.hans.service.AtletaService;
import com.hans.service.AuthService;
import com.hans.service.ComuneService;
import com.hans.service.EventoService;
import com.hans.service.GaraCorsaService;
import com.hans.service.IndirizzoService;
import com.hans.service.SocietaService;

@Component
public class CrezioneFakeDatiRunner implements CommandLineRunner{

	
	@Autowired SocietaService societaService;
	
	@Autowired AtletaService atletaService;
	
	@Autowired AllenatoreService allenatoreService;
	
	@Autowired GaraCorsaService garaCorsaService;
	
	@Autowired EventoService eventoService; 
	
	@Autowired ComuneService comuneService;
	
	@Autowired IndirizzoService indirizzoService;
	
	@Autowired AuthService authService;
	
	
	@Override
	public void run(String... args) throws Exception {
		
		if(societaService.cercaTutteSocieta().size()==0) {
			creaSocieta();
		}
			
		if(allenatoreService.cercaTuttiAllenatori().size()==0) {
			creaAllenatori();
		}
		if(atletaService.cercaTuttiAtleti().size()==0) {
			creaAtleti();
		}
		
		creaEvento();
		
		
	
		
	}





	private void creaSocieta() {
		
		for(int i=1; i<6;i++) {
			Faker fake= Faker.instance(new Locale("it-IT"));
			
			Indirizzo indirizzo= indirizzoService.salvaInidirzzo(new Indirizzo(null, fake.address().firstName(),fake.number().numberBetween(1, 99), comuneService.cercaComuneConId(fake.number().numberBetween(1l, 7050l)))); 
			RegisterDto r= new RegisterDto();
			r.setIndirizzo(indirizzo);
			r.setNomeSocieta(fake.company().name());
			r.setUsername("Usocieta"+i);
			r.setEmail(r.getNomeSocieta()+"@fidal.com");
			r.setPassword("Psocieta"+i);
			Set<String> ruoli= new HashSet<>();
			ruoli.add("SOCIETA");
			r.setRoles(ruoli);
			authService.register(r);
			
		}
		
	}
	private void creaAllenatori() {
		for(int i=1; i<16;i++) {
			Faker fake= Faker.instance(new Locale("it-IT"));
			
			RegisterDto r= new RegisterDto();
			r.setName(fake.name().firstName());
			r.setLastname(fake.name().lastName());
			String g=fake.number().randomDigit()%2==0?"Donna":"Uomo";
			r.setGenere(g);
			r.setBirthdate(LocalDate.now().minusDays(fake.number().numberBetween(8760l, 28835l)));
			r.setSocieta(societaService.cercaSocietaConId(fake.number().numberBetween(1l, 5l)));
			r.setUsername("Uallenatore"+i);
			r.setEmail(r.getName()+"."+r.getLastname()+"@fidal.com");
			r.setPassword("Pallenatore"+i);
			Set<String> ruoli= new HashSet<>();
			ruoli.add("ALLENATORE");
			r.setRoles(ruoli);
			authService.register(r);
			
		}
		
	}
	
	private void creaAtleti() {
		for(int i=1; i<31;i++) {
			Faker fake= Faker.instance(new Locale("it-IT"));
			
			RegisterDto r= new RegisterDto();
			r.setName(fake.name().firstName());
			r.setLastname(fake.name().lastName());
			String g=fake.number().randomDigit()%2==0?"Donna":"Uomo";
			r.setGenere(g);
			r.setBirthdate(LocalDate.now().minusDays(fake.number().numberBetween(3600l, 16200l)));
			r.setSocieta(societaService.cercaSocietaConId(fake.number().numberBetween(1l, 5l)));
			r.setUsername("Uatleta"+i);
			r.setEmail(r.getName()+"."+r.getLastname()+"@fidal.com");
			r.setPassword("Patleta"+i);
			Set<String> ruoli= new HashSet<>();
			ruoli.add("ATLETA");
			r.setRoles(ruoli);
			authService.register(r);
			
		}
		
	}
	
	private void creaEvento() {
		
		LoginDto login=new LoginDto();
		login.setUsername("Usocieta1");
		login.setPassword("Psocieta1");
		String t=authService.login(login);
		
		
		List<GaraCorsa> listaCorse=new ArrayList<GaraCorsa>();
		
			GaraCorsa gC=new GaraCorsa();
			gC.setGenereGara(Genere.F);
			gC.setTipo(TipiGare.Velocita_100m);
			gC.setMassimoPartecipanti(5);
			listaCorse.add(garaCorsaService.salvaGaraCorsa(gC));
			garaCorsaService.iscriviAtleta(listaCorse.get(0).getId(), atletaService.cercaTuttiAtleti());
			
			GaraCorsa gCM=new GaraCorsa();
			gCM.setGenereGara(Genere.M);
			gCM.setTipo(TipiGare.Velocita_100m);
			gCM.setMassimoPartecipanti(5);
			listaCorse.add(garaCorsaService.salvaGaraCorsa(gCM));
			garaCorsaService.iscriviAtleta(listaCorse.get(1).getId(), atletaService.cercaTuttiAtleti());
		
		Evento evento=new Evento();
		evento.setCodice(t);
		evento.setListaGareCorse(listaCorse);
		evento.setNomeEvento("Trofeo Pratizzoli");
		System.out.println(eventoService.salvaEvento(evento));
		
		
		//System.out.println("ecco il token: "+t);
	}
	

}
