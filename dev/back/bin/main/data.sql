insert into room (capacity_room, name_room) values (15, "Salle A");
insert into room (capacity_room, name_room) values (20, "Salle B");
insert into room (capacity_room, name_room) values (10, "Salle C");
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Elliptique", 3, 0);
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Tapis roulant", 2, 0);
insert into facility_category (name_facility_category, quantity_facility_category, price_facility_category) values ("Vélo", 1, 0);
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 1", 0.75, "", "");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 2", 0.80, "", "");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(1, 1, "Elliptique 3", 0.45, "", "");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 1", 0.50, "", "");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(2, 1, "Tapis roulant 2", 0.55, "", "");
insert into facility (facility_category_id_facility_category, room_id_room, name_facility, price_seance, description_facility, image_facility) values(3, 1, "Vélo 1", 1.50, "", "");

insert into authorities (username, authority) values ("db_admin", "ROLE_ADMIN");
insert into users (username, enabled, password, fullname, id_user) values ("db_admin", 1, "{bcrypt}$2a$10$woFD.JoUP44f4iyS0YLywO5TLT4xabSvFZF9T4NEwhcGLmjGkKsOe", "sysadmin", 1);
insert into staff (username) values ("db_admin");
insert into authorities (username, authority) values ("db_manager", "ROLE_MANAGER");
insert into users (username, enabled, password, fullname, id_user) values ("ROLE_MANAGER", 1, "{bcrypt}$2a$10$e.vIr1..hgABsdz/YH/WBOvPHMf1FYdvBJYy2Ijn/6nnqtfgRsWO2", "sysmanager", 2);
insert into staff (username) values ("ROLE_MANAGER");
insert into authorities (username, authority) values ("db_user", "ROLE_CUSTOMER");
insert into users (username, enabled, password, fullname, id_user) values ("db_user", 1, "{bcrypt}$2a$10$vJMerK8BAwOHNSwInrCHBO0r4usIzb8e3x3dNg4TZSo3KCZ4lpsLO", "user", 3);
insert into customer (username) values ("db_user");
insert into authorities (username, authority) values ("db_sebastien", "ROLE_CUSTOMER");
insert into users (username, enabled, password, fullname, id_user) values ("db_sebastien", 1, "{bcrypt}$2a$10$6mIW8L/KaNOydeoUKSWDzOS4l6tm./HMNyI9NF4d9MEDoM1YPrqcq", "sébastien", 4);
insert into customer (username) values ("db_sebastien");




