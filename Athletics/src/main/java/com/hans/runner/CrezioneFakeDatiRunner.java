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
import com.hans.entity.Atleta;
import com.hans.entity.Evento;
import com.hans.entity.GaraConcorso;
import com.hans.entity.GaraCorsa;
import com.hans.entity.Indirizzo;
import com.hans.entity.Societa;
import com.hans.enums.Categorie;
import com.hans.enums.Genere;
import com.hans.enums.TipiGare;
import com.hans.payload.LoginDto;
import com.hans.payload.RegisterDto;
import com.hans.service.AllenatoreService;
import com.hans.service.AtletaService;
import com.hans.service.AuthService;
import com.hans.service.ComuneService;
import com.hans.service.EventoService;
import com.hans.service.GaraConcorsoService;
import com.hans.service.GaraCorsaService;
import com.hans.service.IndirizzoService;
import com.hans.service.SocietaService;

@Component
public class CrezioneFakeDatiRunner implements CommandLineRunner{

	
	@Autowired SocietaService societaService;
	
	@Autowired AtletaService atletaService;
	
	@Autowired AllenatoreService allenatoreService;
	
	@Autowired GaraCorsaService garaCorsaService;

	@Autowired GaraConcorsoService garaConcorsoService;
	
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
		
		if(eventoService.cercaTuttiEventi().size()==0){
			creaEvento();
		}
		
		iscriviAtleti();
	
	}





	private void iscriviAtleti() {
		List<Atleta> lista=new ArrayList<Atleta>();
		lista.add(atletaService.cercaAtletaConId(1l));
		lista.add(atletaService.cercaAtletaConId(2l));
		lista.add(atletaService.cercaAtletaConId(3l));
		lista.add(atletaService.cercaAtletaConId(4l));
		lista.add(atletaService.cercaAtletaConId(5l));
		lista.add(atletaService.cercaAtletaConId(6l));
		lista.add(atletaService.cercaAtletaConId(7l));
		garaCorsaService.iscriviAtleta(1l, lista);

		List<Atleta> lista2=new ArrayList<Atleta>();
		lista2.add(atletaService.cercaAtletaConId(2l));
		lista2.add(atletaService.cercaAtletaConId(4l));
		lista2.add(atletaService.cercaAtletaConId(5l));
		lista2.add(atletaService.cercaAtletaConId(1l));
		garaCorsaService.iscriviAtleta(1l, lista2);

		List<Atleta> lista3=new ArrayList<Atleta>();
		lista3.add(atletaService.cercaAtletaConId(1l));
		lista3.add(atletaService.cercaAtletaConId(2l));
		lista3.add(atletaService.cercaAtletaConId(3l));
		lista3.add(atletaService.cercaAtletaConId(4l));
		lista3.add(atletaService.cercaAtletaConId(5l));
		lista3.add(atletaService.cercaAtletaConId(6l));
		lista3.add(atletaService.cercaAtletaConId(7l));
		garaConcorsoService.iscriviAtleta(1l, lista3);

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
			gC.setMassimoPartecipanti(25);
			gC.setCategoria(Categorie.Assoluti);
			listaCorse.add(garaCorsaService.salvaGaraCorsa(gC));
			
			
			GaraCorsa gCM=new GaraCorsa();
			gCM.setGenereGara(Genere.M);
			gCM.setTipo(TipiGare.Velocita_100m);
			gCM.setMassimoPartecipanti(10);
			//listaCorse.add(garaCorsaService.salvaGaraCorsa(gCM));
		

			List<GaraConcorso> listaConcorsi= new ArrayList<GaraConcorso>();

			GaraConcorso g1=new GaraConcorso();
			g1.setGenereGara(Genere.M);
			g1.setTipo(TipiGare.Salto_lungo);
			g1.setMassimoPartecipanti(30);
			g1.setCategoria(Categorie.Assoluti);
			listaConcorsi.add(garaConcorsoService.salvaGaraConcorso(g1));


		Evento evento=new Evento();
		evento.setCodice(t);
		evento.setListaGareCorse(listaCorse);
		evento.setListaGareConcorsi(listaConcorsi);
		evento.setNomeEvento("Trofeo Pratizzoli");
		System.out.println(eventoService.salvaEvento(evento));
		
		
		//System.out.println("ecco il token: "+t);
	}
	

}
