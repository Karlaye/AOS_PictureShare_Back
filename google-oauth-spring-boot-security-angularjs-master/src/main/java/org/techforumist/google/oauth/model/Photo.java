package org.techforumist.google.oauth.model;

import javax.persistence.*;

@Entity
@Table(name = "Photo")
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titre;


    @Column(nullable = false)
    private Boolean publique;

    @Column(nullable = false)
    private Long idUser;

    @Column(nullable = false)
    private Long idAlbum;

    @Column(nullable = true)
    private int commentaire;

    @Column(nullable = true)
    private String legende;

    @Column(nullable = false)
    private String url;

    public Photo() {
        this.commentaire = 0;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Boolean getPublique() {
        return publique;
    }

    public void setPublique(Boolean publique) {
        this.publique = publique;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdAlbum() {
        return idAlbum;
    }

    public void setIdAlbum(Long idAlbum) {
        this.idAlbum = idAlbum;
    }

    public int getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(int commentaire) {
        this.commentaire = commentaire;
    }

    public String getLegende() {
        return legende;
    }

    public void setLegende(String legende) {
        this.legende = legende;
    }
}
