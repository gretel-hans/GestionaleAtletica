package com.hans.model;

import java.util.List;

import com.hans.entity.Atleta;
import com.hans.entity.GaraConcorso;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public  class IscrizioneGaraConcorso {

	private List<Atleta> atletiPartecipanti;
	private GaraConcorso garaCorsa;
}
