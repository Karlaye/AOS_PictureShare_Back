package org.techforumist.google.oauth.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Album;
import org.techforumist.google.oauth.model.Commentaire;
import org.techforumist.google.oauth.model.DroitAlbum;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {

    List<Commentaire> findAll();

    List<Commentaire> findAllByIdPhoto(Long idPhoto);

    List<Commentaire> findAllByIdUser(Long idUser);

    Commentaire findById(Long id);

    void delete(Commentaire c);

    Commentaire save(Commentaire c);



}
