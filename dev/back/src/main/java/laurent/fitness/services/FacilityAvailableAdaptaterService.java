package laurent.fitness.services;

import java.util.Date;
import java.util.List;
import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;

public interface FacilityAvailableAdaptaterService {
	public List<FacilityAvailableAdaptater> getFacilitiesAvailable(String timestampToString);
}
