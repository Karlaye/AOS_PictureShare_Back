package org.techforumist.google.oauth.DTO;

import org.techforumist.google.oauth.model.Album;
import org.techforumist.google.oauth.model.Photo;

import java.util.List;

public class AlbumDTO {
    private Album album;
    private List<Photo> photos;

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public List<Photo> getPhotos() {
        return photos;
    }

    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
}
