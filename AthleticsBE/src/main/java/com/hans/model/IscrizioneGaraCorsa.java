package com.hans.model;

import java.util.List;

import com.hans.entity.Atleta;
import com.hans.entity.GaraCorsa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public  class IscrizioneGaraCorsa {

	private List<Atleta> atletiPartecipanti;
	private GaraCorsa garaCorsa;
}
