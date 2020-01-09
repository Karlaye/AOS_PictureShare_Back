package org.techforumist.google.oauth.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.techforumist.google.oauth.model.Commentaire;
import org.techforumist.google.oauth.model.Photo;
import org.techforumist.google.oauth.repository.AlbumRepository;
import org.techforumist.google.oauth.repository.CommentaireRepository;
import org.techforumist.google.oauth.repository.PhotoRepository;
import org.techforumist.google.oauth.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@RestController
public class CommentaireRestController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @Autowired
    private CommentaireRepository commentaireRepository;

    @GetMapping(value = "/commentaire/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Commentaire> getAllCommentaireFor(Principal principal, @PathVariable Long id){
        return commentaireRepository.findAllByIdPhoto(id);
    }

    @PostMapping(value = "/commentaire/{id}")
    @PreAuthorize("hasRole('USER')")
    public Commentaire commenter(Principal principal, @PathVariable Long id, @RequestBody String commentaire){
        Commentaire c = new Commentaire();
        c.setCommentaire(commentaire);
        c.setIdUser(userRepository.findByName(principal.getName()).getId());
        c.setIdPhoto(id);
        commentaireRepository.save(c);
        Photo p = photoRepository.findOne(commentaireRepository.findById(id).getIdPhoto());
        p.setCommentaire(p.getCommentaire()+1);
        photoRepository.save(p);
        return c;
    }

    @PutMapping(value = "/commentaire/{id}")
    @PreAuthorize("hasRole('USER')")
    public Commentaire modifCommentaire(Principal principal, @PathVariable Long id, @RequestBody Commentaire commentaire){
        if(commentaireRepository.findOne(commentaire.getId()) != null){
            commentaireRepository.save(commentaire);
            return commentaire;
        }
        return null;
    }

    @DeleteMapping(value ="/commentaire/{id}")
    @PreAuthorize("hasRole('USER')")
    public String deleteCommentaire(Principal principal, @PathVariable Long id) {
        if (principal.getName().equals(userRepository.findOne(albumRepository.findOne(id).getIdUser()).getName())) {
        try {
            commentaireRepository.delete(id);

            Photo p = photoRepository.findOne(commentaireRepository.findById(id).getIdPhoto());
            p.setCommentaire(p.getCommentaire() - 1);
        }catch(Exception e){
        System.out.println("raté delete com");
        return null;
        }
           return "done";

        }
        return "fail";
    }

}
