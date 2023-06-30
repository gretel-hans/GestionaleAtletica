package com.hans.runner;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.github.javafaker.Faker;
import com.hans.entity.Indirizzo;
import com.hans.entity.Societa;
import com.hans.enums.Genere;
import com.hans.payload.RegisterDto;
import com.hans.service.AllenatoreService;
import com.hans.service.AtletaService;
import com.hans.service.AuthService;
import com.hans.service.ComuneService;
import com.hans.service.IndirizzoService;
import com.hans.service.SocietaService;

@Component
public class CrezioneFakeDatiRunner implements CommandLineRunner{

	
	@Autowired SocietaService societaService;
	
	@Autowired AtletaService atletaService;
	
	@Autowired AllenatoreService allenatoreService;
	
	@Autowired ComuneService comuneService;
	
	@Autowired IndirizzoService indirizzoService;
	
	@Autowired AuthService authService;
	
	@Override
	public void run(String... args) throws Exception {
		
		if(societaService.cercaTutteSocieta().size()==0) {
			setSocieta();
		}
		
		if(societaService.cercaTutteSocieta().size()!=0 && allenatoreService.cercaTuttiAllenatori().size()==0) {
			setAllenatori();
		}
		
	}


	private void setSocieta() {
		
		for(int i=1; i<11;i++) {
			Faker fake= Faker.instance(new Locale("it-IT"));
			
			Indirizzo indirizzo= indirizzoService.salvaInidirzzo(new Indirizzo(null, fake.address().firstName(),fake.number().numberBetween(1, 99), comuneService.cercaComuneConId(fake.number().numberBetween(1l, 7050l)))); 
			RegisterDto r= new RegisterDto();
			r.setIndirizzo(indirizzo);
			r.setNomeSocieta(fake.company().name());
			r.setUsername("societa"+i);
			r.setEmail(r.getNomeSocieta()+"@fidal.com");
			r.setPassword("societa"+i);
			Set<String> ruoli= new HashSet<>();
			ruoli.add("SOCIETA");
			r.setRoles(ruoli);
			authService.register(r);
			
		}
		
	}
	private void setAllenatori() {
		for(int i=1; i<16;i++) {
			Faker fake= Faker.instance(new Locale("it-IT"));
			
			Indirizzo indirizzo= indirizzoService.salvaInidirzzo(new Indirizzo(null, fake.address().firstName(),fake.number().numberBetween(1, 99), comuneService.cercaComuneConId(fake.number().numberBetween(1l, 7050l)))); 
			RegisterDto r= new RegisterDto();
			r.setName(fake.name().firstName());
			r.setLastname(fake.name().lastName());
			String g=i%2==0?"Femmina":"Maschio";
			r.setGenere(g);
			r.setBirthdate(LocalDate.now().minusDays(fake.number().numberBetween(7300l, 31025l)));
			r.setSocieta(societaService.cercaSocietaConId(fake.number().numberBetween(1l, 10l)));
			r.setUsername("allenatore"+i);
			r.setEmail(r.getName()+"."+r.getLastname()+"@fidal.com");
			r.setPassword("allenatore"+i);
			Set<String> ruoli= new HashSet<>();
			ruoli.add("ALLENATORE");
			r.setRoles(ruoli);
			authService.register(r);
			
		}
		
	}
	
	

}
