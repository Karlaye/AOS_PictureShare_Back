package org.techforumist.google.oauth.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.techforumist.google.oauth.model.Photo;
import org.techforumist.google.oauth.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByName(String name);

   // Boolean existsByName(String name);

    void delete(User u);

    User save(User u);



}
