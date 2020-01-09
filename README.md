# AOS_PictureShare_Back-
Album: 
get All albums => GET /album/all
get 1 album by id => GET /album/{id}
ajouter un photo a un album  => PUT /album/{id} body = Photo photo (type variable)
allAlbum pour un user donné : POST /album/all/user/{id}
delete un album : DELETE /album/picture/{id}

commentaire : 
get commentaire d'une photo :GET /commentaire/{id}
poster un commentaire : POST /commentaire/{id} body = String commentaire
modifier un commentaire : PUT /commmentaire/{id} body = Commentaire commentaire
supprimer un commentaire : DELETE /commentaire/{id}

follow : 
get les user qui me follow : GET /follow/me
get les user que je follow : GET /follow
follow quelqu'un : POST /follow/{id}  (l'id de la photo visée )
supprimer un follow : DELETE /follow/{id} 
compte des gens qui me follow : GET  /follow/me/count
compte des gens que je follow : GET /follow/me/count

User :
get userinfo : GET user/{id}
