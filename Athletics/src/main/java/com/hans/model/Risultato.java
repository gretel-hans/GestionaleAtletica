package com.hans.model;

import com.hans.entity.Atleta;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class Risultato {

	private Atleta atleta;
	private Double vento;
	private Boolean valido;
}
