package com.hans.entity;

import com.hans.model.Risultato;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="risultati_corse")
public class RisultatoSerie extends Risultato {

	private Integer corsia;
	private Double prestazione;
}
