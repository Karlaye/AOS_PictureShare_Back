// Creating angular Application with module name "GoogleOAuthDemoApp"
var app = angular.module('GoogleOAuthDemoApp', []);

app.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ]);

// Creating the Angular Controller
app.controller('AppCtrl', function($http, $scope) {

    $scope.albums = {};
    $scope.name="Nom de l'album";
    $scope.image="Image.png";

    $scope.titre="Titre de la photo";
    $scope.idAlbum="Id de l'album";
    $scope.legende="Legende de la photo";
    $scope.url="url de la photo";

    $scope.commentaires={};
    $scope.com = "Inserez votre commentaire";

    $scope.modeAlbum = true;
    $scope.photos = {};


    // method for getting user details FONCTIONNE
        var getUser = function() {
            $http.get('/user').success(function(user) {
                $scope.user = user;
                console.log('Logged User : ', user);
            }).error(function(error) {
                $scope.resource = error;
            });
        };
        getUser();

        // method for logout FONCTIONNE
        $scope.logout = function() {
            $http.post('/logout').success(function(res) {
                $scope.user = null;
            }).error(function(error) {
                console.log("Logout error : ", error);
            });
        };

        $scope.getUserName = function(id) { // appel avec un parametre dans l'url (/album/+parametre) a utiliser quand on veut recup un truc qui a un id ou faire un put
            $http.post('/user/'+id).success(function(resultat){
                    console.log(resultat)
                    return resultat;
                }).error(function(error){
                    console.log("fail get by id");
                                         })
                                     }

        //method for getting all albums
        //FONCTIONNE

        $scope.changemode = function(listPhotos){
            $scope.modeAlbum = !$scope.modeAlbum;
            if($scope.modeAlbum == false){
                $scope.photos = listPhotos;
                console.log(listPhotos);

            } else{
                $scope.getAllAlbum();
                document.location.reload(true);
            }

        }
        $scope.getAllAlbum = function() {
            $http.get('/album/all').success(function(resultat) {
                $scope.albums = resultat;
                console.log('albums : ', resultat);
            }).error(function(error) {
                console.log("fail get all albums");
            });
        };
        $scope.getAllAlbum();

        //method for getting album by his id
        //FONCTIONNE
        $scope.getAlbumById = function(id) { // appel avec un parametre dans l'url (/album/+parametre) a utiliser quand on veut recup un truc qui a un id ou faire un put
            $http.post('/album/'+id).success(function(resultat){
                console.log(resultat)
            }).error(function(error){
                console.log("fail get by id");
            })
        }
        //$scope.getAlbumById(1);

/*        //method for getting all my albums
        //DEMANDER A MAXIME
                $scope.getAllAlbumForMe = function() { // pour faire un appel simple sans arguement ni objet dans la requete
                    $http.get('/album/all/me').success(function(resultat) {
                        console.log('albums for me : ', resultat);
                    }).error(function(error) {
                        console.log("fail get all albums");
                    });
                };

        //method for getting all user's albums
        //DEMANDER A MAXIME
        $scope.getAllAlbumForUser = function(id) { // pour faire un appel simple sans arguement ni objet dans la requete
            $http.post('/album/all/user/'+id).success(function(resultat) {
               console.log('albums for user : '+id, resultat);
            }).error(function(error) {
               console.log("fail get all albums");
            });
        };
*/
        //method for delete an album
        //FONCTIONNE
        $scope.deleteAlbum = function(id){
            $http.delete('/album/'+id).success(function(){
                console.log("deleteDone")
                $scope.getAllAlbum();
            }).error(function(error){
                console.log("fail delete")
            })
        }

        //method for create a new album
        //FONCTIONNE
        $scope.createAlbum = function(name,image){
            var album = {};
            album.name = name;
            album.publique = false;
            album.image = image;
            $http.post('/album/new', album).success(function(){
                console.log("postAlbum done")
                $scope.getAllAlbum()
            }).error(function(error){
                console.log("fail post album");
            })
        }

        //method for put a new photo in a album
        //FONCTIONNE
        $scope.putPhotoAlbum = function(titre, idAlbum, Legende, url){
            var photo = {};
            photo.commentaire = 0;
            photo.titre = titre;
            photo.publique  = false;
            photo.idAlbum = idAlbum;
            photo.legende = Legende;
            photo.url = url;
            $http.put('/album/'+idAlbum , photo).success(function(){
                console.log("put done")
                $scope.getAllAlbum();
            }).error(function(error){
                console.log("fail put photo");
            })
        }

        //method for delete a photo
        //FONCTIONNE
        $scope.deletePhoto = function(id){
            $http.delete('/album/picture/'+id).success(function(){
                console.log("deleteDone photo")
                $scope.getAllAlbum()
            }).error(function(error){
                console.log("fail delete photo");

            })
        }

        //FONCTIONNE
        //method for get all comments
        $scope.getAllCom = function(idPhoto) {
            $http.get('/commentaire/'+idPhoto).success(function(resultat) {
                $scope.commentaires = resultat;
                    console.log('commentaires : ', resultat);
                    return resultat;
                }).error(function(error) {
                    console.log("fail get all coms");
                    console.log(idPhoto);
                });
            };
        $scope.getAllCom();


        //FONCTIONNE
        //methode for post a new comment
        $scope.postCommentaire = function(idPhoto, com){
            $http.post('/commentaire/'+idPhoto , com).success(function(){
                console.log("put com done")
                $scope.getAllAlbum();
            }).error(function(error){
                console.log("fail put com");
            })
        }
        //$scope.postCommentaire(1,"test Ajout commentaire 2");

        //method for delete a comment
        //FONCTIONNE

        $scope.deleteCommentaire = function(id){
            $http.delete('/commentaire/' + id).success(function(){
                console.log("deleteDone commentaire")
            }).error(function(error){
                console.log(id)
                console.log("fail delete com");
            })
        }
        //$scope.deleteCommentaire(9);

        //method for delete a comment
        //FONCTIONNE

        $scope.updateCommentaire = function(idCom, newCom){
            $http.put('/commentaire/' + idCom, newCom).success(function(){
                console.log("updateDone commentaire")
            }).error(function(error){
                console.log("fail update com");
            })
        }
        //$scope.updateCommentaire(8, "update du commentaire 8");


        //method for get all the followers
       //FONCTIONNE
        $scope.getFollowers = function(idUser) { // pour faire un appel simple sans arguement ni objet dans la requete
            $http.get('/follow/me').success(function(resultat) {
                console.log('Followers : ', resultat);
            }).error(function(error) {
                console.log("fail get followers");
            });
        };
        //$scope.getFollowers(1);

        //method for getting all follows
        //FONCTIONNE
        $scope.getAllFollows = function() { // pour faire un appel simple sans arguement ni objet dans la requete
            $http.get('/follow').success(function(resultat) {
                console.log('Follows : ', resultat);
            }).error(function(error) {
                console.log("fail get followss");
            });
        };
        $scope.getAllFollows();

        //method for follow
       //FONCTIONNE
        $scope.follow = function(id){
            $http.post('/follow/'+id).success(function(){
                console.log("follow")
                $scope.getAllFollows()
            }).error(function(error){
                console.log("fail follow");
            })
        }
        //$scope.follow(2);

        //method for unfollow
        //FONCTIONNE
        $scope.unfollow = function(id){
            $http.delete('/follow/'+id).success(function(){
                console.log("unfollow done")
                $scope.getAllFollows()
            }).error(function(error){
                console.log("fail unollow");
            })
        }
       // $scope.unfollow(3);

        //A VERIFIER
        //method for get nb of followers
         $scope.getNbFollowers = function() { // pour faire un appel simple sans arguement ni objet dans la requete
            $http.get('/follow/me/count').success(function(resultat) {
                console.log('Nb Followers : ', resultat);
            }).error(function(error) {
                console.log("fail get nb followers");
            });
        };
        $scope.getNbFollowers();

        //A VOIR AVEC MAX
        //method for get nb of follows

        $scope.getNbFollows = function() { // pour faire un appel simple sans arguement ni objet dans la requete
            $http.get('/follow/count').success(function(resultat) {
                console.log('Nb Follows : ', resultat);
            }).error(function(error) {
                console.log("fail get nb follows");
            });
        };
        $scope.getNbFollows();


});



