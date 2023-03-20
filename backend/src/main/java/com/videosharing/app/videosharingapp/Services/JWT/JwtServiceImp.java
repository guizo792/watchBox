package com.videosharing.app.videosharingapp.Services.JWT;

import com.videosharing.app.videosharingapp.model.Users.UserDetailsImp;
import com.videosharing.app.videosharingapp.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class JwtServiceImp implements JwtService{

    @Autowired
    private JwtUtils jwtUtils;


    @Override
    public String extractId(String jwtToken) {

        return extractClaim(jwtToken ,Claims::getSubject);
    }

    @Override
    public Date extractExpiration(String jwtToken) {

        return extractClaim(jwtToken ,Claims::getExpiration);
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
    public String generateToken(Map<String, Object> extrasClaims, UserDetailsImp userDetails) {

        System.out.println(userDetails.getId());

        return Jwts.builder()
                .addClaims(extrasClaims)
                .setSubject(userDetails.getId())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+(24*60*60*1000)))
                .signWith(jwtUtils.getSingInKey())
                .compact()
                ;
    }

    @Override
    public String generateToken(UserDetailsImp userDetails) {
        return generateToken(new HashMap<String,Object>() ,userDetails);
    }

    @Override
    public boolean isTokenValid(String jwtToken, UserDetailsImp userDetails) {
        String id =extractId(jwtToken) ;
        return (id.equals(userDetails.getId()) && !istTokenExpired(jwtToken)) ;
    }

    @Override
    public boolean istTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }
}
