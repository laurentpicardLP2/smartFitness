package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.adaptater.TimestampFacilityAdaptater;

public interface TimestampFacilityAdaptaterService {
	public List<TimestampFacilityAdaptater> getTimestampFacilitiesForASeance(int idItem);
}
