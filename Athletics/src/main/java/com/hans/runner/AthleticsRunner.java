package com.hans.runner;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.hans.entity.Comune;
import com.hans.entity.Provincia;
import com.hans.service.ComuneService;
import com.hans.service.ProvinciaService;


@Component
public class AthleticsRunner implements CommandLineRunner{

	
	@Autowired
	ComuneService comuneService;
	
	@Autowired
	ProvinciaService provinciaService;
	
	@Override
	public void run(String... args) throws Exception {
		System.out.println("Run athletics runner....");
		
	
	if (provinciaService.cercaTutteProvince().size() == 0) {
		setProvince();
	}
	
	if (comuneService.cercaTuttiComuni().size() == 0) {
		setComune();
	}

	}
	
	
	public void setProvince() {
		String provinceTotali;
		String[] rigaProvincia;
		String[] unicaProvincia;
		Scanner sc;
		
		try {
			sc = new Scanner(new File("comuniEProvince/province-italiane.csv"));
			sc.useDelimiter(","); 
			while (sc.hasNext()) 
			{
				provinceTotali = sc.next();
				rigaProvincia = provinceTotali.split("\n");
				for (int i = 0; i < rigaProvincia.length; i++) {
					unicaProvincia = rigaProvincia[i].split(";");
					Provincia p = new Provincia(null, unicaProvincia[0], unicaProvincia[1], unicaProvincia[2]);
					provinciaService.salvaProvincia(p);
				}
			}
			sc.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}
	
	public void setComune() {
		Scanner sc2;
		String comuniTotali;
		String[] rigaComuni;
		String[] unicoComune;
		

		try {
			sc2 = new Scanner(new File("comuniEProvince/comuni-italiani.csv"));
			sc2.useDelimiter(","); 
			while (sc2.hasNext()) 
			{
				comuniTotali = sc2.next();
				rigaComuni = comuniTotali.split("\n");
				for (int i = 0; i < rigaComuni.length; i++) {
					unicoComune = rigaComuni[i].split(";");
					
					if( !(unicoComune[1].equals("#RIF!"))  ){
						Provincia p1 = provinciaService.cercaProvinciaConNome(unicoComune[3].trim());
						if(p1!=null){
							Comune c = new Comune(null,unicoComune[0],unicoComune[1],unicoComune[2],p1);
							comuneService.salvaComune(c);
						}
					}
				}
				}
			sc2.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
}
