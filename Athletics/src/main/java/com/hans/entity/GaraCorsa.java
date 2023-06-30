package com.hans.entity;

import java.util.List;

import com.hans.enums.Genere;
import com.hans.enums.TipiGare;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name="gare_corse")
public class GaraCorsa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private TipiGare tipo;
    
    @Column(nullable=false)
    @Enumerated(EnumType.STRING)
    private Genere genereGara;
    
    @OneToMany
    List<Atleta> partecipanti;
    
    @Column(name="classifica_generale")
    @OneToMany
    List<Atleta> classificaGenerale;
    
    @Column(name="classifica_generale")
    @OneToMany
    List<Batteria> listaBatterie;
}
