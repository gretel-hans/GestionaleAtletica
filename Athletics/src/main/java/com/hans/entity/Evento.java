package com.hans.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="eventi")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="nome_evento")
    private String nomeEvento;
    
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String codice;

    @JoinColumn(name="luogo_gara")
    @ManyToOne
    private Indirizzo luogoGara;
    
    
    @ManyToOne
    private Societa organizzatori;
    
    
    @Column(name="lista_gare_corse")
    @OneToMany
    List<GaraCorsa> listaGareCorse;
    
    @Column(name="lista_gare_concorsi")
    @OneToMany
    List<GaraConcorso> listaGareConcorsi;
}
