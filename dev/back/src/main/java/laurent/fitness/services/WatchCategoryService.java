package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.WatchCategory;

public interface WatchCategoryService {
	public List<WatchCategory> getAllWatchCategories();
	
	public WatchCategory saveWatchCategory(WatchCategory watchCategory);
	
	public WatchCategory saveWatchCategory(String nameWatch, float priceWatch, String descriptionWatch, String imageWatch);
	
	public WatchCategory updateWatchCategory(int idWatchCategory, String nameWatch, float priceWatch, String descriptionWatch,
			String imageWatch);
	
	public WatchCategory updateWatchCategory(String nameWatch, float priceWatch, String descriptionWatch,
			String imageWatch);
	
	public void deleteWatchCategory(WatchCategory watchCategory);
	
	public void deleteWatchCategory(int idWatchCategory);
	
	
	public WatchCategory findByIdWatchCategory(int idWatchCategory);
	
	public WatchCategory findByNameWatch(String nameWatch);
	
	public List<String> getListNameWatches();
	
}
