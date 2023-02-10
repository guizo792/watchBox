package com.videosharing.app.videosharingapp.Services.JWT;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    String extractEmail(String jwtToken) ;
    Date extractExpiration(String jwtToken) ;
    Claims extractAllClaims(String jwtToken) ;
    <T> T extractClaim(String token, Function<Claims ,T> claimsResolver) ;
    String generateToken(Map<String,Object> extrasClaims , UserDetails userDetails);
    String generateToken(UserDetails userDetails);
    boolean isTokenValid(String jwtToken ,UserDetails userDetails) ;
    boolean istTokenExpired(String jwtToken) ;
}
