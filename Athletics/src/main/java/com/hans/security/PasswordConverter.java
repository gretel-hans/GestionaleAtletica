package com.hans.security;

import java.nio.charset.StandardCharsets;

import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PasswordConverter implements AttributeConverter<String, String>{

	private static final String ALGORITHM = "AES/CBC/PKCS5Padding";
	private static final byte[] KEY = "MySUperSecretKey".getBytes(StandardCharsets.UTF_8);
	private String initVector = "1234567812345678";
	IvParameterSpec iv = new IvParameterSpec(initVector.getBytes(StandardCharsets.UTF_8));
	@Override
	public String convertToDatabaseColumn(String attribute) {
		Key key= new SecretKeySpec(KEY, "AES");
		try {
			Cipher c=Cipher.getInstance(ALGORITHM);
			c.init(Cipher.ENCRYPT_MODE, key, iv);
			return Base64.getEncoder().encodeToString(c.doFinal(attribute.getBytes()));
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public String convertToEntityAttribute(String dbData) {
		Key key= new SecretKeySpec(KEY, "AES");
		try {
			Cipher c=Cipher.getInstance(ALGORITHM);
			c.init(Cipher.DECRYPT_MODE, key, iv);
			return new String (c.doFinal(Base64.getDecoder().decode(dbData)));
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
	}

}
