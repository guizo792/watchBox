package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.model.Users.UserDetailsImp;
import com.videosharing.app.videosharingapp.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsImpService implements UserDetailsService {
    @Autowired
    UserRepository userRepository ;


    public UserDetails loadUserById(String id) throws UsernameNotFoundException {

        UserEntity userEntity =userRepository.findById(id)
                .orElseThrow(()-> new UsernameNotFoundException("No username found")) ;
        UserDetailsImp userDetailsImp =new UserDetailsImp() ;
        BeanUtils.copyProperties(userEntity,userDetailsImp);

        return userDetailsImp;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity userEntity =userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("No username found")) ;
        UserDetailsImp userDetailsImp =new UserDetailsImp() ;
        BeanUtils.copyProperties(userEntity,userDetailsImp);
        return userDetailsImp;

    }
}
