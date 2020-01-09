// Creating angular Application with module name "GoogleOAuthDemoApp"
var app = angular.module('GoogleOAuthDemoApp', []);

app.config([ '$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ]);

// Creating the Angular Controller
app.controller('AppCtrl', function($http, $scope) {

    $scope.albums = {};
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

    $scope.getAllAlbum = function() { // FONCTIONNE
        $http.get('/album/all').success(function(resultat) {
            $scope.albums = resultat;
            console.log('albums : ', resultat);
        }).error(function(error) {
            console.log("fail get all albums");
        });
    };
    $scope.getAllAlbum();

    //FONCTIONNE
    $scope.getAlbumById = function(id) { // appel avec un parametre dans l'url (/album/+parametre) a utiliser quand on veut recup un truc qui a un id ou faire un put
        $http.post('/album/'+id).success(function(resultat){
            console.log(resultat)
        }).error(function(error){
            console.log("fail get by id");
        })
    }
    //$scope.getAlbumById(1);

    //FONCTIONNE
    $scope.putPhotoAlbum = function(id){
        var photo = {};
        photo.titre = "titre de test";
        photo.publique  = false;
        photo.idAlbum = id;
        photo.legende = "legend";
        photo.url = "https://media.gettyimages.com/photos/colorful-powder-explosion-in-all-directions-in-a-nice-composition-picture-id890147976?s=612x612";
        $http.put('/album/'+id , photo).success(function(){
            console.log("put done")
        }).error(function(error){
            console.log("fail put photo");
        })
    }
    //$scope.putPhotoAlbum(1);


    $scope.deleteAlbum = function(id){
        $http.delete('/album/'+id).success(function(){
            console.log("deleteDone")
        }).error(function(error){
            console.log("fail delete");
        })
    }

    //FONCTIONNE
    $scope.deletePhoto = function(id){
        $http.delete('/album/picture/'+id).success(function(){
            console.log("deleteDone photo")
        }).error(function(error){
            console.log("fail delete photo");
        })
    }

    $scope.createAlbum = function(nom,publique,image){
        var album = {};
        album.name = nom;
        album.publique = publique;
        album.image = image;
        $http.post('/album/new', album).success(function(){
            console.log("postAlbum done")
        }).error(function(error){
            console.log("fail post album");
        })
    }

    $scope.getAllAlbumForMe = function() { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.get('/album/all/me').success(function(resultat) {
            console.log('albums for me : ', resultat);
        }).error(function(error) {
            console.log("fail get all albums");
        });
    };

    $scope.getAllAlbumForUser = function(id) { // pour faire un appel simple sans arguement ni objet dans la requete
        $http.post('/album/all/user/'+id).success(function(resultat) {

            console.log('albums for user : '+id, resultat);
        }).error(function(error) {
            console.log("fail get all albums");
        });
    };


    //$scope.deleteAlbum(7);
    //$scope.deletePhoto(1);
    //$scope.createAlbum("test pierroledingo",true,"pas d'image");
    //$scope.getAllAlbumForMe();
    //$scope.getAllAlbumForUser(99998);



});
