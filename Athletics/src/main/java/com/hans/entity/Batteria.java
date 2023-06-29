package com.hans.entity;

import java.time.LocalTime;
import java.util.List;

import com.hans.enums.Genere;
import com.hans.enums.TipiGare;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="batterie")
public class Batteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToMany
    @Column(name="partecipanti_serie")
    List<Atleta> partecipantiBatteria;
    
    @OneToMany
    private List<RisultatoBatteria> risultato;
    
    @Column(name="ora_inizio")
    private LocalTime oraInizio;
}
