# Smart Fitness - projet chef d'oeuvre
# Mode opératoire pour lancer l'application :
1. Dans mySql Workbench créer un schéma vide intitulé 'db_fitness' 
2. Clôner le lien git https://github.com/laurentpicardLP2/smartFitness.git
3. Dans Eclipse, faire un import gradle depuis le dossier back du repo cloné
4. Dans application.properties, renseigner les user et password de la ligne suivante : spring.datasource.url=jdbc:mysql://localhost:3306/db_fitness?useSSL=false&user=fitness&password=Colis062019!.
5. Modififier dans application.properties la ligne "file.upload-dir" en indiquant le chemin absolue vers le dossier "../assets/images/facilities" (c'est l'endroit où seront stockées les images uploadées).
6. Lancer les serveurs springboot et node.js.

# Test de l'application : Rôle Customer
1. Créer un compte via le module inscription en haut à droite (indiquer une adresse mail permettant de lire les messages)
2. Se connecter avec le compte nouvellement créé.
3. Aller dans le module de réservation (clic sur l'image réservation ou aller dans le menu Nos offres >  Constituer une séance)
4. Réserver trois tranches horaires : deux tranches avec *Elliptique 1* et une tranche avec *Tapis_roulant 2*.
5. Valider la séance -> une page avec une liste de produits favoris s'affiche : séléctionner powerade
6. Choisir la quantité 3, puis cliquer sur *ajouter au panier*.
7. (On se retrouve sur la page *home*) Aller dans le module d'abonnement (clic sur l'image abonnement ou aller dans le menu Nos offres > Souscrire à un abonnement.
8. Choisir l'abonnement annuel. Sur la page suivante, cliquer sur *ajouter au panier*
9. (On se retrouve de nouveau sur la page *home*) Cliquer sur l'icône du panier en haut droite, puis choisir l'option *Voir le panier*.
10. Cliquer sur le bouton *Valider le panier*
11. Attendre la fin du chargement du module paypal
12. Cliquer sur MasterCard
13. Les informations à saisir : 
  - Type de carte : Visa
  - Numéro de carte: 4111 1111 1111 1111
  - Date d'expiration : 02/20
  - Crypto visuel : 123
  - Renseigner les blocs **Adresse de facturation** et **Coordonnées**, choisir l'option *Non, merci* pour l'ouverture d'un compte paypal, puis cliquer *Payer*
  14
14. Avec les comptes db_admin (mot de passe : simplon) ou db_manager(mot de passe : simplon), on peut ajouter et modifier des salles, des catégories d'équipement et des équipements. Il s'agit donc de créer des équipements, appartenant à une catégorie et localisée dans une salle,  pour que les utilisateurs puissent bénéficier d'un choix élargi d'appareils lorsqu'ils sont sur une séquence de réservation.
15. Toujours avec les comptes db_admin ou db_manager, on peut créer et gérer des abonnements et des modèles de montres connectées en tant que services pour les clients.
16. Le compte db_admin permet de créer et gérer des comptes utilisateurs de profil 'ROLE_MANAGER' ou 'ROLE_ADMIN'
17. Il est possible, pour tout utilisateur lambda de se créer un compte utilsateur 'smartFitness'.
