package org.techforumist.google.oauth.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Album;
import org.techforumist.google.oauth.model.Commentaire;
import org.techforumist.google.oauth.model.DroitAlbum;
import org.techforumist.google.oauth.model.Follow;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findAll();

    List<Follow> findAllByIdUser(Long idPhoto);

    List<Follow> findAllByIdFollower(Long idUser);

    Follow findById(Long id);

    void delete(Follow c);

    Follow save(Follow c);



}
