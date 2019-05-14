
insert into room (capacity_room, name_room) values (15, "Salle A");
insert into room (capacity_room, name_room) values (20, "Salle B");
insert into room (capacity_room, name_room) values (10, "Salle C");
insert into room (capacity_room, name_room) values (43, "SALLE SAPIN");
insert into room (capacity_room, name_room) values (100, "SALLE 3ÈME ETOILE");
insert into room (capacity_room, name_room) values (24, "SALLE CADEAU");

insert into facility_category (name_facility_category, quantity_facility_category) values ("Elliptique", 3);
insert into facility_category (name_facility_category, quantity_facility_category) values ("Tapis roulant", 2);
insert into facility_category (name_facility_category, quantity_facility_category) values ("Vélo", 1);
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 1", 1500, '2019-04-18', 0.75, "", "Elliptique 1_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 2", 1500, '2018-03-04', 0.80, "", "Elliptique 2_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 3", 1500, '2015-05-15', 0.40, "", "Elliptique 3_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 1", 1800, '2016-08-16', 0.50, "", "Tapis roulant 1_tapisRoulant.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 2", 1800, '2014-12-25', 0.55, "", "Tapis roulant 2_tapisRoulant.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_facility, date_of_purchase, price_seance, description_facility, image_facility) values(3, 1, "Vélo 1", 2000, '2019-06-27', 1.50, "", "");

insert into watch_category (description_watch, image_watch, name_watch, price_watch) values("", "Watch 1_watch.jpg", "Watch 1", 100);
insert into watch_category (description_watch, image_watch, name_watch, price_watch) values("", "Watch 2_watchXioami.jpg", "Watch 2", 200);

insert into authorities (username, authority) values ("db_admin", "ROLE_ADMIN");
insert into users (username, enabled, password, fullname, id_user) values ("db_admin", 1, "{bcrypt}$2a$10$woFD.JoUP44f4iyS0YLywO5TLT4xabSvFZF9T4NEwhcGLmjGkKsOe", "sysadmin", 1);
insert into staff (username) values ("db_admin");
insert into authorities (username, authority) values ("db_manager", "ROLE_MANAGER");
insert into users (username, enabled, password, fullname, id_user) values ("db_manager", 1, "{bcrypt}$2a$10$b6ej/xgpJMm5LJOpNTw/1.hwO08FJCg6cJs2okGi13Elzgt6lKYuu", "sysmanager", 2);
insert into staff (username) values ("db_manager");
insert into authorities (username, authority) values ("db_user", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$JXRZi7XpNNJtjkv6Xvii0eQUvg85eEe69q.Esz3RMtd.wlKKlYNjS", "user", 3);
insert into customer (username) values ("db_user");
insert into authorities (username, authority) values ("db_user1", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user1", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$ftMkD60z0PiSy3/Lzk4RQOO/EPjzxNuA6SxB3mBckdG95fDDkEZZa", "user1", 4);
insert into customer (username) values ("db_user1");
insert into authorities (username, authority) values ("db_user2", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user2", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$Gywr3I/HPtAfSdhUTeDvkuqvnfDOLFktmah/uuXWF2htH6kLaiB0.", "user2", 5);
insert into customer (username) values ("db_user2");
insert into authorities (username, authority) values ("db_user3", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user3", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$j00CcY/hTWOAOFsRr5z7G.fRujM1udGMlbJG4cdoOzGU6BT2LyxTi", "user3", 6);
insert into customer (username) values ("db_user3");
insert into authorities (username, authority) values ("db_user4", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user4", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$wY.aG/K0O6MkJopPIR4WhuLyw4zrjdD2osXhLHVRmYr.QHmN8sxT.", "user4", 7);
insert into customer (username) values ("db_user4");
insert into authorities (username, authority) values ("db_user5", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user5", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$ogO2h.sNSlKS1..MUpnSeOaHwO4PNTtmFJ8BwINxWNRA88Z5l1m8u", "user5", 8);
insert into customer (username) values ("db_user5");
insert into authorities (username, authority) values ("db_user6", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_user6", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$vJMerK8BAwOHNSwInrCHBO0r4usIzb8e3x3dNg4TZSo3KCZ4lpsLO", "user6", 9);
insert into customer (username) values ("db_user6");
insert into authorities (username, authority) values ("db_sebastien", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_sebastien", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$DzYEN3DGWBFihiHy5AqKuOSGODbp6Fl8DO1Q4DqF3cJdT/wb1PkI.", "Sébastien", 10);
insert into customer (username) values ("db_sebastien");
insert into authorities (username, authority) values ("db_abonne", "ROLE_CUSTOMER");
insert into users (username, enabled, email, password, fullname, id_user) values ("db_abonne", 1, "lolo.picard@laposte.net" ,"{bcrypt}$2a$10$eVEHILc2AIX3pkEr.2JNgus1viVpbLQX.L0tOPfiyJh3juirkv4Pe", "sysabonne", 11);
insert into customer (username) values ("db_abonne");

insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 jour", 1, 3, "Day");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 3 jours", 3, 9, "Day");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 semaine", 1, 15, "Week");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 2 semaines", 2, 29, "Week");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 mois", 1, 55, "Month");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 6 mois", 6, 150, "Month");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 an", 1, 250, "Year");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (1, current_timestamp(), 3, 3, "db_abonne");
insert into item (id_item, price, type_item, quantity_item) values (1, 3, "Abonnement 1 jour:subscription", 1);
insert into command_has_item (item_id_item, command_id_command) values (1, 1);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (1, "db_abonne", 1, "2019-02-25", "2019-02-25");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (2, current_timestamp(), 3, 9, "db_abonne");
insert into item (id_item, price, type_item, quantity_item) values (2, 9, "Abonnement 3 jours:subscription", 1);
insert into command_has_item (item_id_item, command_id_command) values (2, 2);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (2, "db_abonne", 2, "2019-02-26", "2019-02-28");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (3, current_timestamp(), 3, 250, "db_abonne");
insert into item (id_item, price, type_item, quantity_item) values (3, 250, "Abonnement 1 an:subscription", 1);
insert into command_has_item (item_id_item, command_id_command) values (3, 3);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (3, "db_abonne", 7, "2019-03-01", "2020-02-29");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (4, current_timestamp(), 3, 150, "db_abonne");
insert into item (id_item, price, type_item, quantity_item) values (4, 150, "Abonnement 6 mois:subscription", 1);
insert into command_has_item (item_id_item, command_id_command) values (4, 4);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (4, "db_abonne", 6, "2020-03-01", "2020-09-30");

insert into product_category(name_product_category) values ("Montre");
insert into product_category(name_product_category) values ("Boisson");
insert into product_category(name_product_category) values ("Alimentation");

insert into product_ref (product_category_id_product_category, name_product_ref, price_product_ref, image_product_ref, description_product_ref) values (2, "Powerade", 5.5, "Powerade_powerade.jpg", "");
insert into product_ref (product_category_id_product_category, name_product_ref, price_product_ref, image_product_ref, description_product_ref) values (2, "Gatorade", 6, "Gatorade_gatorade.jpg", "");
insert into product_ref (product_category_id_product_category, name_product_ref, price_product_ref, image_product_ref, description_product_ref) values (2, "Monster", 7.55, "Monster_monster.jpg", "");
insert into product_ref (product_category_id_product_category, name_product_ref, price_product_ref, image_product_ref, description_product_ref) values (3, "Barre céréale", 3.5, "Barre céréale_barre.jpg", "");
insert into product_ref (product_category_id_product_category, name_product_ref, price_product_ref, image_product_ref, description_product_ref) values (2, "Ovotamine", 5, "Ovotamine_ovotamine.jpg", "");

insert into evenement(title_evt) values("Cours Fitness");