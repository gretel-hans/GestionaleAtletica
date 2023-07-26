package com.hans.runner;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.hans.entity.Role;
import com.hans.enums.ERole;
import com.hans.repository.RoleRepository;
import com.hans.repository.UtenteRepository;
import com.hans.service.AuthService;



@Component
public class AuthRunner implements ApplicationRunner {
	
	@Autowired RoleRepository roleRepository;
	@Autowired UtenteRepository userRepository;
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired AuthService authService;
	
	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("Run...");
		// Metodo da lanciare solo la prima volta
		// Serve per salvare i ruoli nel DB
		if(roleRepository.findAll().size()==0) {
			setRoleDefault();
		}
		
	}
	
	private void setRoleDefault() {
		Role admin = new Role();
		admin.setRoleName(ERole.ROLE_ADMIN);
		roleRepository.save(admin);
		
		Role atleta = new Role();
		atleta.setRoleName(ERole.ROLE_ATLETA);
		roleRepository.save(atleta);
		
		Role allenatore = new Role();
		allenatore.setRoleName(ERole.ROLE_ALLENATORE);
		roleRepository.save(allenatore);
		
		Role societa = new Role();
		societa.setRoleName(ERole.ROLE_SOCIETA);
		roleRepository.save(societa);
		

	}
	
	

}
