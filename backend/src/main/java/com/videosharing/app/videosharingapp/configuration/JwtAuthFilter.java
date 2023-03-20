package com.videosharing.app.videosharingapp.configuration;

import com.videosharing.app.videosharingapp.Services.JWT.JwtService;
import com.videosharing.app.videosharingapp.Services.Users.UserDetailsImpService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.TestSecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    JwtService jwtService ;


    @Autowired
    UserDetailsService userDetailsService ;

    @Autowired
    UserDetailsImpService userDetailsImpService ;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // get authorization header
        String authorization =request.getHeader("Authorization") ;
        String jwt ;
        String id ;

        System.out.println("i'm heeere");
        // if there is no authorization header 
        if(authorization ==null || authorization.split(" ")[0]=="Bearer") {
            System.out.println("........... no authorization header ");
            filterChain.doFilter(request,response);
            return ;
        }

        jwt =authorization.split(" ")[1] ;


        System.out.println("token"+jwt);
        id =jwtService.extractId(jwt);

        System.out.println("all claims" +jwtService.extractAllClaims(jwt));
        System.out.println(id);
        if(id !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails =userDetailsImpService.loadUserById(id) ;

            UsernamePasswordAuthenticationToken authToken =new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            ) ;

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            //System.out.println("..... username found...");
            // set security context
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        filterChain.doFilter(request,response);
    }
}
