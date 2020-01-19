package org.techforumist.google.oauth.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.techforumist.google.oauth.model.Commentaire;
import org.techforumist.google.oauth.model.Follow;
import org.techforumist.google.oauth.model.Photo;
import org.techforumist.google.oauth.repository.*;

import java.security.Principal;
import java.util.List;

@RestController
public class FollowRestController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private CommentaireRepository commentaireRepository;

    @Autowired
    private FollowRepository followRepository;

    @GetMapping(value = "/follow/me")
    @PreAuthorize("hasRole('USER')")
    public List<Follow> getFollower(Principal principal){
        return followRepository.findAllByIdUser(userRepository.findByName(principal.getName()).getId());
    }

    @GetMapping(value = "/follow")
    @PreAuthorize("hasRole('USER')")
    public List<Follow> getAllCommentaireFor(Principal principal){
        return followRepository.findAllByIdFollower(userRepository.findByName(principal.getName()).getId());
    }

    @PostMapping(value = "/follow/{id}")
    @PreAuthorize("hasRole('USER')")
    public Follow follow(Principal principal, @PathVariable Long id){
        Follow follow = new Follow();
        follow.setIdFollower(userRepository.findByName(principal.getName()).getId());
        follow.setIdUser(id);
        followRepository.save(follow);
        return follow;
    }

    @DeleteMapping(value ="/follow/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteCommentaire(Principal principal, @PathVariable Long id) {

        followRepository.delete(followRepository.findFirstByIdUserAndIdFollower(id, userRepository.findByName(principal.getName()).getId()).getId());
    }

    @DeleteMapping(value ="/follower/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteFollower(Principal principal, @PathVariable Long id) {

        followRepository.delete(followRepository.findFirstByIdUserAndIdFollower(userRepository.findByName(principal.getName()).getId(),id).getId());
    }

    @GetMapping(value = "/follow/me/count")
    @PreAuthorize("hasRole('USER')")
    public int getcountFollower(Principal principal){
        return followRepository.findAllByIdUser(userRepository.findByName(principal.getName()).getId()).size();
    }

    @GetMapping(value = "/follow/count")
    @PreAuthorize("hasRole('USER')")
    public int getCountFollw(Principal principal){
        return followRepository.findAllByIdFollower(userRepository.findByName(principal.getName()).getId()).size();
    }

    @PostMapping(value = "/follow")
    @PreAuthorize("hasRole('USER')")
    public void FollowByName(Principal principal, @RequestBody String name){
        Follow follow = new Follow();
        follow.setIdUser(userRepository.findByName(name).getId());
        follow.setIdFollower(userRepository.findByName(principal.getName()).getId());
        if(followRepository.findFirstByIdUserAndIdFollower(follow.getIdUser(), follow.getIdFollower()) == null ) {
            followRepository.save(follow);
        }

    }
}
