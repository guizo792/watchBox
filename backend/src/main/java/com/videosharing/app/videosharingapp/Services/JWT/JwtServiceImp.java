package com.videosharing.app.videosharingapp.Services.JWT;

import com.videosharing.app.videosharingapp.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class JwtServiceImp implements JwtService{

    @Autowired
    private JwtUtils jwtUtils;


    @Override
    public String extractEmail(String jwtToken) {
        return null;
    }

    @Override
    public Date extractExpiration(String jwtToken) {
        return null;
    }

    @Override
    public Claims extractAllClaims(String jwtToken) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtUtils.getSingInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims =this.extractAllClaims(token) ;
        return claimsResolver.apply(claims) ;
    }

    @Override
    public String generateToken(Map<String, Object> extrasClaims, UserDetails userDetails) {
        return Jwts.builder()
                .addClaims(extrasClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+(24*60*60*1000)))
                .signWith(jwtUtils.getSingInKey())
                .compact()
                ;
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<String,Object>() ,userDetails);
    }

    @Override
    public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
        return false;
    }

    @Override
    public boolean istTokenExpired(String jwtToken) {
        return false;
    }
}
