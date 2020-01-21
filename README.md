# AOS_PictureShare_Back-

AlbumeRestController : 

get All albums => GET /album/all
get 1 album by id => GET /album/{id}
ajouter un photo a un album  => PUT /album/{id} body = Photo photo (type variable)
allAlbum pour un user donné : POST /album/all/user/{id}
delete un album : DELETE /album/picture/{id}
delete une photo : DELETE /album/picture/{id}
updateAlbum : PUT /album/update body = Album album
createAlbum : POST/album/new body = Album album
getAlbumForUser : GET /album/all/user/{id}
getAlbumMe : GET /album/all
ajouterdroitAlbum : POST album/droit/{id}
droitAlbum : GET album/droit/{id}

CommentaireRestController : 

get commentaire d'une photo :GET /commentaire/c
poster un commentaire : POST /commentaire/{id} body = String commentaire
modifier un commentaire : PUT /commmentaire/{id} body = Commentaire commentaire
supprimer un commentaire : DELETE /commentaire/{id}

FollowRestController : 

get les user qui me follow : GET /follow/me
get les user que je follow : GET /follow
follow quelqu'un : POST /follow/{id}  (l'id de la photo visée )
supprimer un follow : DELETE /follow/{id} 
compte des gens qui me follow : GET  /follow/me/count
compte des gens que je follow : GET /follow/count
FollowByName : /follow body = String Name
getAllCommentaireFor : GET /follow

UserRestControlleur :

geUserInfo : GET /user/{id}
getUserId : GET /user/id
getUserIdByPseudo : GET /user/pseudo body = String pseudo



z
