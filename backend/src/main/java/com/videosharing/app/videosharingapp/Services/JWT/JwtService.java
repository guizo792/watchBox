package com.videosharing.app.videosharingapp.Services.JWT;

import com.videosharing.app.videosharingapp.model.Users.UserDetailsImp;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    String extractId(String jwtToken) ;
    Date extractExpiration(String jwtToken) ;
    Claims extractAllClaims(String jwtToken) ;
    <T> T extractClaim(String token, Function<Claims ,T> claimsResolver) ;
    String generateToken(Map<String,Object> extrasClaims , UserDetailsImp userDetails);
    String generateToken(UserDetailsImp userDetails);
    boolean isTokenValid(String jwtToken ,UserDetailsImp userDetails) ;
    boolean istTokenExpired(String jwtToken) ;
}
