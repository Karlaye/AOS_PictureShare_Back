package org.techforumist.google.oauth.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Album;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {

    Optional<Album> findById(long id);

    List<Album> findAllByIdUser(long idUser);

    List<Album> findAll();

    void delete(Album a);

    Album save(Album album);



}
