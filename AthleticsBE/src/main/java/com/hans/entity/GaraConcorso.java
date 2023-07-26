package com.hans.entity;

import java.util.List;

import com.hans.enums.Categorie;
import com.hans.enums.Genere;
import com.hans.enums.TipiGare;
import com.hans.model.Gara;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="gare_concorsi")
public class GaraConcorso extends Gara{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private TipiGare tipo;

    private Integer massimoPartecipanti;
    
    @Enumerated(EnumType.STRING)
    private Categorie categoria;
    
    @Enumerated(EnumType.STRING)
    private Genere genereGara;
    
    @ManyToMany(fetch = FetchType.EAGER)
    List<Atleta> partecipanti;
    
    /* 
    @Column(name="classifica_generale")
    @OneToMany
    List<Atleta> classificaGenerale;
    
    @Column(name="classifica_generale")
    @OneToMany
    List<Serie> listaSerie;*/
}
