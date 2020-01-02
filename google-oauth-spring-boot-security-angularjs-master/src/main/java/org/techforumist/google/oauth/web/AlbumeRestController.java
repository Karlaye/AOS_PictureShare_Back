package org.techforumist.google.oauth.web;

import org.apache.tomcat.util.log.SystemLogHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.techforumist.google.oauth.DTO.AlbumDTO;
import org.techforumist.google.oauth.model.Album;
import org.techforumist.google.oauth.model.Photo;
import org.techforumist.google.oauth.model.User;
import org.techforumist.google.oauth.repository.AlbumRepository;
import org.techforumist.google.oauth.repository.PhotoRepository;
import org.techforumist.google.oauth.repository.UserRepository;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AlbumeRestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AlbumRepository albumRepository;

    @GetMapping(value = "/album/all")
    @PreAuthorize("hasRole('USER')")
    public List<AlbumDTO> getAllAlbum(Principal principal) {
        AlbumDTO albumDTO = new AlbumDTO();
        List<AlbumDTO> albumDTOList = new ArrayList<>();
        List<Album> albums = albumRepository.findAll();
        AlbumDTO a = new AlbumDTO();
        for(Album album : albums){
            a = new AlbumDTO();
            a.setAlbum(album);
            a.setPhotos(photoRepository.findAllByIdAlbum(album.getId()));
            albumDTOList.add(a);
        }
        return albumDTOList;
    }
    @PostMapping(value = "/album/{id}")
    @PreAuthorize("hasRole('USER')")
    public AlbumDTO getAlbumById(Principal principal,@PathVariable Long id){
        AlbumDTO a = new AlbumDTO();
        a.setAlbum(albumRepository.findOne(id));
        a.setPhotos(photoRepository.findAllByIdAlbum(id));
        return a;
    }

    @PutMapping(value = "/album/{id}")
    @PreAuthorize("hasRole('USER')")
    public void putPhotoById(Principal principal, @PathVariable Long id, @RequestBody Photo photo){
        Photo photo1 = new Photo();
        photo1 = photo;
        System.out.println(photo1);
    }

    @GetMapping("/test/test")
    public String feeder(){
        Album album1 = new Album();
        Album album2 = new Album();
        Album album3 = new Album();
        Album album4 = new Album();
        Album album5 = new Album();

        Photo photo1 = new Photo();
        Photo photo2 = new Photo();
        Photo photo3 = new Photo();
        Photo photo4 = new Photo();
        Photo photo5 = new Photo();
        Photo photo6 = new Photo();
        Photo photo7 = new Photo();
        Photo photo8 = new Photo();
        Photo photo9 = new Photo();
        Photo photo10 = new Photo();
        Photo photo11 = new Photo();
        Photo photo12 = new Photo();
        Photo photo13 = new Photo();
        Photo photo14 = new Photo();

        album1.setIdUser((long)1);
        album1.setName("poker");
        album1.setPublique(false);

        album2.setIdUser((long)1);
        album2.setName("test");
        album2.setPublique(false);

        album3.setIdUser((long)99998);
        album3.setName("test12");
        album3.setPublique(false);

        album4.setIdUser((long)99997);
        album4.setName("test13");
        album4.setPublique(false);

        album5.setIdUser((long)999999);
        album5.setName("test pierrole dingo");
        album5.setPublique(false);

        //part 1 a faire en premier sans la part 2
    /*
        albumRepository.save(album1);
        albumRepository.save(album2);
        albumRepository.save(album3);
        albumRepository.save(album4);
        albumRepository.save(album5);
*/

        photo1.setIdAlbum((long)1);
        photo1.setIdUser((long)1);
        photo1.setPublique(false);
        photo1.setTitre("test1");
        photo1.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo2.setIdAlbum((long)1);
        photo2.setIdUser((long)1);
        photo2.setPublique(false);
        photo2.setTitre("test2");
        photo2.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo3.setIdAlbum((long)1);
        photo3.setIdUser((long)1);
        photo3.setPublique(false);
        photo3.setTitre("test3");
        photo3.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo4.setIdAlbum((long)2);
        photo4.setIdUser((long)1);
        photo4.setPublique(false);
        photo4.setTitre("test4");
        photo4.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo5.setIdAlbum((long)2);
        photo5.setIdUser((long)1);
        photo5.setPublique(false);
        photo5.setTitre("test5");
        photo5.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo6.setIdAlbum((long)2);
        photo6.setIdUser((long)1);
        photo6.setPublique(false);
        photo6.setTitre("test6");
        photo6.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");


        photo7.setIdAlbum((long)3);
        photo7.setIdUser((long)99998);
        photo7.setPublique(false);
        photo7.setTitre("test8");
        photo7.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo8.setIdAlbum((long)3);
        photo8.setIdUser((long)99998);
        photo8.setPublique(false);
        photo8.setTitre("test9");
        photo8.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo9.setIdAlbum((long)4);
        photo9.setIdUser((long)99997);
        photo9.setPublique(false);
        photo9.setTitre("test10");
        photo9.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo10.setIdAlbum((long)4);
        photo10.setIdUser((long)99997);
        photo10.setPublique(false);
        photo10.setTitre("test11");
        photo10.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo11.setIdAlbum((long)5);
        photo11.setIdUser((long)999999);
        photo11.setPublique(false);
        photo11.setTitre("test12");
        photo11.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo12.setIdAlbum((long)5);
        photo12.setIdUser((long)999999);
        photo12.setPublique(false);
        photo12.setTitre("test13");
        photo12.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo13.setIdAlbum((long)5);
        photo13.setIdUser((long)999999);
        photo13.setPublique(false);
        photo13.setTitre("test14");
        photo13.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        photo14.setIdAlbum((long)5);
        photo14.setIdUser((long)999999);
        photo14.setPublique(false);
        photo14.setTitre("test14");
        photo14.setUrl("https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg");

        // part 2 a faire sans la part 1
        /*
        photoRepository.save(photo1);
        photoRepository.save(photo2);
        photoRepository.save(photo3);
        photoRepository.save(photo4);
        photoRepository.save(photo5);
        photoRepository.save(photo6);
        photoRepository.save(photo7);
        photoRepository.save(photo8);
        photoRepository.save(photo9);
        photoRepository.save(photo10);
        photoRepository.save(photo11);
        photoRepository.save(photo12);
        photoRepository.save(photo13);
        photoRepository.save(photo14);
        */

        return "done";
    }




}


