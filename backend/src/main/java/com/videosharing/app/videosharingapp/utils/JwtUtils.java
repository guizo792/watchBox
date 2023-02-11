package com.videosharing.app.videosharingapp.utils;


import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret ;

    public Key getSingInKey(){
        System.out.println(jwtSecret);
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret) ;
        System.out.println(keyBytes);
        return Keys.hmacShaKeyFor(keyBytes) ;
    }
}
