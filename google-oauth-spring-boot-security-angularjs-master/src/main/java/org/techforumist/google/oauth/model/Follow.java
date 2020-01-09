package org.techforumist.google.oauth.model;

import javax.persistence.*;

@Entity
@Table(name = "Follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // celui qui follow
    private Long idFollower;

    @Column(nullable = false) // celui qui est follow
    private Long idUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdFollower() {
        return idFollower;
    }

    public void setIdFollower(Long idFollower) {
        this.idFollower = idFollower;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }
}
