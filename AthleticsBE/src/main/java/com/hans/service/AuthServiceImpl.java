package com.hans.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hans.repository.UtenteRepository;
import com.hans.entity.Allenatore;
import com.hans.entity.Atleta;
import com.hans.entity.Indirizzo;
import com.hans.entity.Role;
import com.hans.entity.Societa;
import com.hans.entity.Utente;
import com.hans.enums.ERole;
import com.hans.enums.Genere;
import com.hans.exception.MyAPIException;
import com.hans.payload.LoginDto;
import com.hans.payload.RegisterDto;
import com.hans.repository.RoleRepository;
import com.hans.security.JwtTokenProvider;



@Service
public class AuthServiceImpl implements AuthService {

    private AuthenticationManager authenticationManager;
    private UtenteRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    @Autowired AllenatoreService allenatoreService;
    @Autowired AtletaService atletaService;
    @Autowired SocietaService societaService;
	@Autowired ComuneService comuneService;
	@Autowired ProvinciaService provinciaService;
	@Autowired IndirizzoService indirizzoService;


    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           UtenteRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder,
                           JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginDto loginDto) {
        
    	Authentication authentication = authenticationManager.authenticate(
        		new UsernamePasswordAuthenticationToken(
        				loginDto.getUsername(), loginDto.getPassword()
        		)
        ); 
    	//System.out.println("autenticazione: "+authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
       	//System.out.println("ecco il token: "+token);
        return token;
    }
	
    @Override
    public String register(RegisterDto registerDto) {
    	
        // add check for username exists in database
        if(userRepository.existsByUsername(registerDto. getUsername())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username already exists!.");
        }

        // add check for email exists in database
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Email already exists!.");
        }

        Utente user = new Utente();
        user.setNome(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		user.setCognome(registerDto.getLastname());
		if(registerDto.getSocieta()!=null){
			user.setSocieta(registerDto.getSocieta());
		}

        Set<Role> roles = new HashSet<>();
        
        if(registerDto.getRoles() != null) {
	        registerDto.getRoles().forEach(role -> {
	        	Role userRole = roleRepository.findByRoleName(getRole(role)).get();
	        	if(role.equals("ALLENATORE")) {
	        		creaAllenatore(registerDto);
	        	}else if(role.equals("ATLETA")) {
	        		creaAtleta(registerDto);
	        	}else if(role.equals("SOCIETA")) {
	        		creaSocieta(registerDto);
	        	}
	        	roles.add(userRole);
	        });
        } else {
        	Role userRole = roleRepository.findByRoleName(ERole.ROLE_ATLETA).get();
        	roles.add(userRole);
        }
        
        user.setRoles(roles);
        userRepository.save(user);

        return "User registered successfully!.";
    }
    
    private void creaSocieta(RegisterDto registerDto) {
		Societa societa= new Societa();
		Indirizzo i=indirizzoService.salvaInidirzzo(registerDto.getIndirizzo());
		societa.setIndirizzo(i);
		societa.setName(registerDto.getName());
		societa.setUsername(registerDto.getUsername());
		societa.setEmail(registerDto.getEmail());
		societa.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		societa.setDateRegistration(LocalDateTime.now());
		societa.setRole(roleRepository.findByRoleName(ERole.ROLE_SOCIETA).get());
		societaService.salvaSocieta(societa);
	}

	private void creaAtleta(RegisterDto registerDto) {
    	Genere g;
    	
    	if(registerDto.getGenere().equalsIgnoreCase("Uomo")) {
    		g=Genere.M;
    	}else
    		g=Genere.F;
    	
    	 Atleta atleta = new Atleta();
    	 atleta.setName(registerDto.getName());
    	 atleta.setLastname(registerDto.getLastname());
    	 atleta.setGenere(g);
    	 atleta.setBirthdate(registerDto.getBirthdate());
    	 Period d=Period.between(atleta.getBirthdate(), LocalDate.now());
    	 atleta.setAge(d.getYears());
    	 atleta.setSocieta(societaService.cercaSocietaConId(registerDto.getSocieta().getId()));
    	 atleta.setUsername(registerDto.getUsername());
    	 atleta.setEmail(registerDto.getEmail());
    	 atleta.setPassword(passwordEncoder.encode(registerDto.getPassword()));
    	 atleta.setDateRegistration(LocalDateTime.now());
    	 atleta.setRole(roleRepository.findByRoleName(ERole.ROLE_ATLETA).get());
		 atletaService.salvaAtleta(atleta);
		 
	}

	private void creaAllenatore(RegisterDto registerDto) {
    	Genere g;
    	
    	if(registerDto.getGenere().equalsIgnoreCase("Uomo")) {
    		g=Genere.M;
    	}else
    		g=Genere.F;
    	
    	 Allenatore allenatore = new Allenatore();
    	 allenatore.setName(registerDto.getName());
    	 allenatore.setLastname(registerDto.getLastname());
    	 allenatore.setGenere(g);
    	 allenatore.setBirthdate(registerDto.getBirthdate());
    	 allenatore.setSocieta(societaService.cercaSocietaConId(registerDto.getSocieta().getId()));
    	 allenatore.setUsername(registerDto.getUsername());
    	 allenatore.setEmail(registerDto.getEmail());
    	 allenatore.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		 allenatore.setDateRegistration(LocalDateTime.now());
		 allenatore.setRole(roleRepository.findByRoleName(ERole.ROLE_ALLENATORE).get());
		 allenatoreService.salvaAllenatore(allenatore);
	}

	public ERole getRole(String role) {
    	if(role.equalsIgnoreCase("ALLENATORE")) return ERole.ROLE_ALLENATORE;
    	else if(role.equalsIgnoreCase("SOCIETA")) return ERole.ROLE_SOCIETA;
    	else if(role.equalsIgnoreCase("ADMIN")) return ERole.ROLE_ADMIN;
    	else return ERole.ROLE_ATLETA;
    }
    
}
