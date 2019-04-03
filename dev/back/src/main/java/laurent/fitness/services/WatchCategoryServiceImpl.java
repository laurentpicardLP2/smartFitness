package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.WatchCategory;
import laurent.fitness.repository.WatchCategoryRepository;

@Service
public class WatchCategoryServiceImpl implements WatchCategoryService{
	
private WatchCategoryRepository watchCategoryRepo;
	
	public WatchCategoryServiceImpl(WatchCategoryRepository watchCategoryRepo) {
		this.watchCategoryRepo = watchCategoryRepo;
	}

	@Override
	public List<WatchCategory> getAllWatchCategories() {
		// TODO Auto-generated method stub
		return this.watchCategoryRepo.findAll();
	}

	@Override
	public WatchCategory saveWatchCategory(WatchCategory watchCategory) {
		// TODO Auto-generated method stub
		return this.watchCategoryRepo.save(watchCategory);
	}
	
	@Override
	public WatchCategory saveWatchCategory(String nameWatch, float priceWatch, String descriptionWatch,
			String imageWatch) {
		// TODO Auto-generated method stub
		return this.watchCategoryRepo.save(new WatchCategory(nameWatch, priceWatch, descriptionWatch, imageWatch));
	}

	@Override
	public WatchCategory updateWatchCategory(int idWatchCategory, String nameWatch, float priceWatch, String descriptionWatch,
			String imageWatch) {
		// TODO Auto-generated method stub
		WatchCategory watchCategory = this.watchCategoryRepo.findByIdWatchCategory(idWatchCategory);
		watchCategory.setNameWatch(nameWatch);
		watchCategory.setPriceWatch(priceWatch);
		watchCategory.setDescriptionWatch(descriptionWatch);
		watchCategory.setImageWatch(imageWatch);
		return this.watchCategoryRepo.save(watchCategory);
	}

	@Override
	public WatchCategory updateWatchCategory(String nameWatch, float priceWatch, String descriptionWatch,
			String imageWatch) {
		// TODO Auto-generated method stub
		WatchCategory watchCategory = this.watchCategoryRepo.findByNameWatch(nameWatch);
		watchCategory.setPriceWatch(priceWatch);
		watchCategory.setDescriptionWatch(descriptionWatch);
		watchCategory.setImageWatch(imageWatch);
		return this.watchCategoryRepo.save(watchCategory);
	}

	@Override
	public void deleteWatchCategory(WatchCategory watchCategory) {
		// TODO Auto-generated method stub
		this.watchCategoryRepo.delete(watchCategory);
	}
	
	@Override
	public void deleteWatchCategory(int idWatchCategory) {
		// TODO Auto-generated method stub
		this.watchCategoryRepo.delete(this.watchCategoryRepo.findByIdWatchCategory(idWatchCategory));
	}


	@Override
	public WatchCategory findByIdWatchCategory(int idWatchCategory) {
		// TODO Auto-generated method stub
		return this.watchCategoryRepo.findByIdWatchCategory(idWatchCategory);
	}

	@Override
	public WatchCategory findByNameWatch(String nameWatch) {
		// TODO Auto-generated method stub
		return this.findByNameWatch(nameWatch);
	}

}
