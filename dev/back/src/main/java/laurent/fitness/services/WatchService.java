package laurent.fitness.services;

import laurent.fitness.model.Watch;

public interface WatchService {
	public Watch createWatch(int idCommand, int idWatchCategory, String username);
	public Watch findWatchByIdItem(int idItem);

}
