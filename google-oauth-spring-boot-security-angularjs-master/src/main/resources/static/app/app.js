// Creating angular Application with module name "GoogleOAuthDemoApp"
var app = angular.module('GoogleOAuthDemoApp',[]);

app.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ]);

// Creating the Angular Controller
app.controller('AppCtrl', function($http, $scope) {

    $scope.albums = {};
    $scope.name = "Nom de l'album";
    $scope.image = "Image.png";
    $scope.current_album = {};
    $scope.current_picture = {};

    $scope.titre = "Titre de la photo";
    $scope.idAlbum = "Id de l'album";
    $scope.legende = "Legende de la photo";
    $scope.url = "url de la photo";

    $scope.commentaires = {};
    $scope.com = "Inserez votre commentaire";

    $scope.modeAlbum = true;
    $scope.photos = {};

    $scope.followers = [];
    $scope.follows = [];
    $scope.nameAFollow = "";
    $scope.barre = "";

    $scope.nom_tampon = "";
    $scope.albumeARegler ="";

    $scope.new_picture= {};
    $scope.current_id_album = 0;
    $scope.new_album = {};

    $scope.current_user_id = -1;

    $scope.id_pseudo ="";

    var id;

    // method for getting user details FONCTIONNE
    var getUser = function () {
        $http.get('/user').success(function (user) {
            $scope.user = user;
            console.log('Logged User : ', user);
            document.location.href="localhost:8080/";
        }).error(function (error) {
            $scope.resource = error;
        });
    };
    getUser();

    var getUserId = function () {
        $http.get('/user/id').success(function (res) {
           $scope.current_user_id = res;
        }).error(function (error) {
            $scope.resource = error;
        });
    };
    getUserId();

    $scope.getUserIdByPseudo = function(pseudo){
        $http.post('/user/pseudo',pseudo).success(function (res) {
            $scope.id_pseudo = res;
            console.log("id user: ", $scope.id_pseudo);
            return $scope.id_pseudo;
        }).error(function (error) {
            $scope.resource = error;
        });
    }
    //$scope.getUserIdByPseudo("maxime janicot");

    // method for logout FONCTIONNE
    $scope.logout = function () {
        $http.post('/logout').success(function (res) {
            $scope.user = null;
        }).error(function (error) {
            console.log("Logout error : ", error);
        });
    };

    $scope.getUserName = function (id) { // appel avec un parametre dans l'url (/album/+parametre) a utiliser quand on veut recup un truc qui a un id ou faire un put
        $http.get('/user/' + id).success(function (resultat) {
            $scope.nom_tampon = resultat.name;
            return resultat;
        }).error(function (error) {
            console.log("fail get by id");
            console.log(id);
        })
    }

    //method for getting all albums
    //FONCTIONNE

    $scope.changemode = function (listPhotos, album) {
        $scope.modeAlbum = !$scope.modeAlbum;
        $scope.current_album_switch(album);
        if ($scope.modeAlbum == false) {
            $scope.photos = listPhotos;
            console.log(listPhotos);
            $scope.getAllCom(listPhotos);
        } else {
            $scope.getAllAlbum();
            document.location.reload(true);
        }

    }
    $scope.changemodeAcueil = function(){
        $scope.modeAlbum = true;
        $scope.getAllAlbum();
    }

    $scope.getAllAlbum = function () {
        $http.get('/album/all').success(function (resultat) {
            $scope.albums = resultat;
        }).error(function (error) {
            console.log("fail get all albums");
        });
    };
    $scope.getAllAlbum();

    //method for getting album by his id
    //FONCTIONNE
    $scope.getAlbumById = function (id) { // appel avec un parametre dans l'url (/album/+parametre) a utiliser quand on veut recup un truc qui a un id ou faire un put
        $http.post('/album/' + id).success(function (resultat) {
            console.log(resultat)
        }).error(function (error) {
            console.log("fail get by id");
        })
    }
    //$scope.getAlbumById(1);

    //method for getting all my albums
    //DEMANDER A MAXIME
    $scope.getAllAlbumForMe = function () { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/album/all/me').success(function (resultat) {
            console.log('albums for me : ', resultat);
        }).error(function (error) {
            console.log("fail get all albums");
        });
    };

    //method for getting all user's albums
    //DEMANDER A MAXIME
    $scope.getAllAlbumForUser = function (id) { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/album/all/user/' + id).success(function (resultat) {
            $scope.albums=resultat;
            $scope.modeAlbum=true;
            console.log('albums for user : ' + id, resultat);
        }).error(function (error) {

            console.log("fail get all albums");
        });
    };


    //method for delete an album
    //FONCTIONNE
    $scope.deleteAlbum = function (id) {
        $http.delete('/album/' + id).success(function () {
            console.log("deleteDone");
            $scope.getAllAlbum();
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail delete")
        })
        document.location.reload(true);
    }

    //method for create a new album
    //FONCTIONNE
    $scope.createAlbum = function () {
        var album = {};
        album.name = $scope.new_album.titre;
        album.publique = $scope.new_album.publique;
        album.image = $scope.new_album.url;
        album.follower = $scope.new_album.follower;
        $http.post('/album/new', album).success(function () {
            console.log("postAlbum done")
            $scope.getAllAlbum()
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail post album");
        })
    }

    $scope.updateAlbum = function () {
        $http.put('/album/update', $scope.albumeARegler.album).success(function () {
            console.log("update done")
        }).error(function (error) {
            console.log("fail post album");
        })

    }

    //method for put a new photo in a album
    //FONCTIONNE
    $scope.putPhotoAlbum = function () {
        var photo = {};
        photo.commentaire = 0;
        photo.titre = $scope.new_picture.titre;
        photo.publique = false;
        photo.idAlbum = $scope.current_id_album;
        photo.legende = $scope.new_picture.legende;
        photo.url = $scope.new_picture.url;
        $http.put('/album/' + $scope.current_id_album, photo).success(function () {
            console.log("put done")
            document.location.reload(true);
            $scope.getAllAlbum();
        }).error(function (error) {
            console.log("fail put photo");
        })
    }
    $scope.current_album_switch = function (album) {
        $scope.current_album = album;
    }

    //method for delete a photo
    //FONCTIONNE
    $scope.deletePhoto = function (id) {
        $http.delete('/album/picture/' + id).success(function () {
            console.log("deleteDone photo");
            $scope.getAllAlbum();
        }).error(function (error) {
            console.log("fail delete photo");

        })

    }

    //FONCTIONNE
    //method for get all comments
    $scope.getAllCom = function (idPhoto) {
        $http.get('/commentaire/' + idPhoto).success(function (resultat) {
            $scope.commentaires = resultat;
            console.log($scope.commentaires);
            resultat.forEach(function(item, index, array) {
            $http.get('/user/'+item.idUser).success(function(resultats){
                item.name = resultats.name;
            }).error(function(error){
                console.log("fail get by id");
            })
            $scope.commentaires.push = resultat;
            console.log("final: ",$scope.commentaires);
        });
            return $scope.commentaires;
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail get all coms");
        });
    };
    $scope.getAllCom();


    //FONCTIONNE
    //methode for post a new comment
    $scope.postCommentaire = function (idPhoto, com) {
        $http.post('/commentaire/' + idPhoto, com).success(function () {
            console.log("put com done")
            $scope.getAllCom()
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail put com");
        })
    }
    //$scope.postCommentaire(1,"test Ajout commentaire 2");

    //method for delete a comment
    //FONCTIONNE

    $scope.deleteCommentaire = function (id) {
        $http.delete('/commentaire/' + id).success(function () {
            console.log("deleteDone commentaire")
            document.location.reload(true);
        }).error(function (error) {
            console.log(id)
            console.log("fail delete com");
        })
    }
    //$scope.deleteCommentaire(9);

    //method for delete a comment
    //FONCTIONNE

    $scope.updateCommentaire = function (idCom, newCom) {
        $http.put('/commentaire/' + idCom, newCom).success(function () {
            console.log("updateDone commentaire")
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail update com");
        })
    }
    //$scope.updateCommentaire(8, "update du commentaire 8");


    //method for get all the followers
    //FONCTIONNE

    //method for get all the followers
    //FONCTIONNE
    $scope.getFollowers = function(idUser) { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/follow/me').success(function(resultat) {
            resultat.forEach(function(item, index, array) {
                $http.get('/user/'+item.idFollower).success(function(resultat){
                    $scope.followers.push(resultat);
                }).error(function(error){
                    console.log("fail get by id");
                })
            });
            return $scope.followers;
        }).error(function(error) {
            console.log("fail get followers");

        });
    };
    $scope.getFollowers();

    //method for getting all follows
    //FONCTIONNE
    $scope.getAllFollows = function() { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/follow').success(function(resultat) {
            resultat.forEach(function(item, index, array) {
                $http.get('/user/'+item.idUser).success(function(resultat){
                    $scope.follows.push(resultat);
                }).error(function(error){
                    console.log("fail get by id");
                })
            });
            return $scope.follows;
        }).error(function(error) {
            console.log("fail get follows");
        });
    };
    $scope.getAllFollows();

    //method for follow
    //FONCTIONNE
    $scope.follow = function (id) {
        $http.post('/follow/' + id).success(function () {
            console.log("follow")
            $scope.getAllFollows()
        }).error(function (error) {
            console.log("fail follow");
        })
    }
    //$scope.follow(2);

    //method for unfollow
    //FONCTIONNE
    $scope.unfollow = function (id) {
        $http.delete('/follow/' + id).success(function () {
            console.log("unfollow done");
            $scope.getAllFollows();
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail unollow");
        })
    }

    $scope.deleteFollower = function(id){
        $http.delete('/follower/' + id).success(function () {
            console.log("unfollower done");
            $scope.getFollowers();
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail unollow");
        })
}

    //A VERIFIER
    //method for get nb of followers
    $scope.getNbFollowers = function () { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/follow/me/count').success(function (resultat) {

        }).error(function (error) {
            console.log("fail get nb followers");
        });
    };
    $scope.getNbFollowers();

    //A VOIR AVEC MAX
    //method for get nb of follows

    $scope.getNbFollows = function () { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/follow/count').success(function (resultat) {

        }).error(function (error) {
            console.log("fail get nb follows");
        });
    };
    $scope.getNbFollows();

    $scope.followByName = function (){
        $http.post('/follow', $scope.nameAFollow).success(function () {
            console.log("follow done");
            $scope.nameAFollow = "";
            document.location.reload(true);
        }).error(function (error) {
            console.log("fail update com");
        })
    }

    $scope.rechercher = function(){
        $http.post('/user/pseudo',$scope.barre).success(function (res) {
            $scope.id_pseudo = res;
            $http.post('/album/all/user/' + res).success(function (resultat) {
                $scope.albums=resultat;
                $scope.modeAlbum=true;
                console.log('albums for user : ' + res, resultat);
            }).error(function (error) {
                console.log("fail get all albums");
            });
        }).error(function (error) {
            $scope.resource = error;
        });
    }


    //modal fonctions
    $scope.openReglageModal = function (albumARegler) {
        $('#ReglageModal').modal('show');
        $scope.albumeARegler = albumARegler;
        console.log($scope.albumeARegler+ "album a regler");
    }

    $scope.openPictureModal = function (p) {
        $('#pictureModal').modal('show');
        $scope.current_picture = p;


    }

    $scope.openCreatePictureModal = function (idAlbum) {
        $('#createPictureModal').modal('show');
        $scope.current_id_album= idAlbum;
    }
    $scope.openAlbumModal = function(){
        $('#createAlbumModal').modal('show');

    }

});




