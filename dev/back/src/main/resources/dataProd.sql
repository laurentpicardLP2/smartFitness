insert into room (capacity_room, name_room) values (15, "Salle A");
insert into room (capacity_room, name_room) values (20, "Salle B");
insert into room (capacity_room, name_room) values (10, "Salle C");
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Elliptique", 3, 0);
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Tapis roulant", 2, 0);
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Vélo", 1, 0);
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 1", 0.75, "", "Elliptique 1_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 2", 0.80, "", "Elliptique 2_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 3", 0.45, "", "Elliptique 3_elliptique.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 1", 0.50, "", "Tapis roulant 1_tapisRoulant.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 2", 0.55, "", "Tapis roulant 2_tapisRoulant.jpeg");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(3, 1, "Vélo 1", 1.50, "", "");

insert into watch_category (description_watch, image_watch, name_watch, price_watch) values("", "Watch 1_watch.jpg", "Watch 1", 100);
insert into watch_category (description_watch, image_watch, name_watch, price_watch) values("", "Watch 2_watchXioami.jpg", "Watch 2", 200);

insert into authorities (username, authority) values ("db_admin", "ROLE_ADMIN");
insert into users (username, enabled, password, fullname, id_user) values ("db_admin", 1, "{bcrypt}$2a$10$woFD.JoUP44f4iyS0YLywO5TLT4xabSvFZF9T4NEwhcGLmjGkKsOe", "sysadmin", 1);
insert into staff (username) values ("db_admin");
insert into authorities (username, authority) values ("db_manager", "ROLE_MANAGER");
insert into users (username, enabled, password, fullname, id_user) values ("db_manager", 1, "{bcrypt}$2a$10$b6ej/xgpJMm5LJOpNTw/1.hwO08FJCg6cJs2okGi13Elzgt6lKYuu", "sysmanager", 2);
insert into staff (username) values ("db_manager");
insert into authorities (username, authority) values ("db_user", "ROLE_CUSTOMER");
insert into users (username, enabled, password, fullname, id_user) values ("db_user", 1, "{bcrypt}$2a$10$vJMerK8BAwOHNSwInrCHBO0r4usIzb8e3x3dNg4TZSo3KCZ4lpsLO", "user", 3);
insert into customer (username) values ("db_user");
insert into authorities (username, authority) values ("db_sebastien", "ROLE_CUSTOMER");
insert into users (username, enabled, password, fullname, id_user) values ("db_sebastien", 1, "{bcrypt}$2a$10$6mIW8L/KaNOydeoUKSWDzOS4l6tm./HMNyI9NF4d9MEDoM1YPrqcq", "sébastien", 4);
insert into customer (username) values ("db_sebastien");
insert into authorities (username, authority) values ("db_abonne", "ROLE_CUSTOMER");
insert into users (username, enabled, password, fullname, id_user) values ("db_abonne", 1, "{bcrypt}$2a$10$eVEHILc2AIX3pkEr.2JNgus1viVpbLQX.L0tOPfiyJh3juirkv4Pe", "sysabonne", 5);
insert into customer (username) values ("db_abonne");

insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 jour", 1, 5, "Day");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 3 jours", 3, 15, "Day");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 semaine", 1, 50, "Week");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 2 semaines", 2, 90, "Week");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 mois", 1, 100, "Month");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 6 mois", 6, 500, "Month");
insert into subscription_category (name_subscription, nb_last, price_subscription, type_last) values ("Abonnement 1 an", 1, 800, "Year");


insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (1, current_timestamp(), 0, 5, "db_abonne");
insert into item (id_item, price, type_item) values (1, 5, "Abonnement 1 jour");
insert into command_has_item (item_id_item, command_id_command) values (1, 1);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (1, "db_abonne", 1, "2019-02-25", "2019-02-25");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (2, current_timestamp(), 0, 15, "db_abonne");
insert into item (id_item, price, type_item) values (2, 15, "Abonnement 3 jours");
insert into command_has_item (item_id_item, command_id_command) values (2, 2);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (2, "db_abonne", 2, "2019-02-26", "2019-02-28");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (3, current_timestamp(), 0, 800, "db_abonne");
insert into item (id_item, price, type_item) values (3, 800, "Abonnement 1 an");
insert into command_has_item (item_id_item, command_id_command) values (3, 3);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (3, "db_abonne", 7, "2019-03-01", "2020-02-29");

insert into command (id_command, date_of_command, status_command, total_price, customer_users_username) values (4, current_timestamp(), 0, 600, "db_abonne");
insert into item (id_item, price, type_item) values (4, 500, "Abonnement 6 mois");
insert into command_has_item (item_id_item, command_id_command) values (4, 4);
insert into subscription (id_item, customer_users_username, subscription_category_id_subscription_category, date_start_of_subscription, date_end_of_subscription) values (4, "db_abonne", 6, "2020-03-01", "2020-09-30");
