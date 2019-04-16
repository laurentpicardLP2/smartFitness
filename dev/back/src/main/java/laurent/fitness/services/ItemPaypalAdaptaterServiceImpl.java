package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.adaptater.ItemPaypalAdaptater;
import laurent.fitness.repository.ItemPaypalAdaptaterRepository;

@Service
public class ItemPaypalAdaptaterServiceImpl implements ItemPaypalAdaptaterService {
	
	private ItemPaypalAdaptaterRepository itemPaypalAdaptaterRepo;
	
	public ItemPaypalAdaptaterServiceImpl(ItemPaypalAdaptaterRepository itemPaypalAdaptaterRepo) {
		this.itemPaypalAdaptaterRepo = itemPaypalAdaptaterRepo;
	}

	@Override
	public List<ItemPaypalAdaptater> findAllItemsPaypalAdaptater() {
		// TODO Auto-generated method stub
		return this.itemPaypalAdaptaterRepo.findAll();
	}

}
