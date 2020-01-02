package org.techforumist.google.oauth.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Photo;

import java.util.List;
import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    Optional<Photo> findById(long id);

    List<Photo> findAllByIdUser(long idUser);

    List<Photo> findAllByIdAlbum(long idAlbum);

    void delete(Photo p);

    Photo save(Photo p);



}
