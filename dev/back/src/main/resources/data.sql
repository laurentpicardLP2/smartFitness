
DROP FUNCTION IF EXISTS func_count_timestamp^;
CREATE FUNCTION func_count_timestamp(dateTimeOfSeance DATETIME, idFacility INT) RETURNS int
BEGIN
    DECLARE nb INT;
    SELECT COUNT(*) INTO nb FROM db_fitness.timestamp_facility WHERE date_of_timestamp=dateTimeOfSeance AND facility_id_facility=idFacility;
    RETURN nb;
END^;

CREATE TRIGGER triggerTimestamp BEFORE INSERT ON timestamp_facility
    FOR EACH ROW
    BEGIN
		IF `func_count_timestamp`(NEW.date_of_timestamp, NEW.facility_id_facility) > 0 THEN
			signal sqlstate '45000';
		END IF;
    END^;
    




