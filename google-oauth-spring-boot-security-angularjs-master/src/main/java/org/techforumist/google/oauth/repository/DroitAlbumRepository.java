package org.techforumist.google.oauth.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Album;
import org.techforumist.google.oauth.model.DroitAlbum;

import java.util.List;
import java.util.Optional;

@Repository
public interface DroitAlbumRepository extends JpaRepository<DroitAlbum, Long> {

    List<DroitAlbum> findAll();

    List<DroitAlbum> findAllByIdUser(Long idUser);

    List<DroitAlbum> findAllByIdAlbum(Long idAlbum);

    DroitAlbum findById(Long id);

    void delete(DroitAlbum a);

    DroitAlbum save(DroitAlbum album);



}
