package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Item;
import laurent.fitness.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
	
	private ItemRepository itemRepo;
	
	public ItemServiceImpl(ItemRepository itemRepo) {
		this.itemRepo = itemRepo;
	}

	@Override
	public List<Item> getAllItems() {
		return this.itemRepo.findAll();
	}

	@Override
	public Item saveItem(Item item) {
		return this.itemRepo.save(item);
	}

	@Override
	public void deleteItem(int idItem) {
		this.itemRepo.delete(this.itemRepo.findById(idItem).get());
	}

	@Override
	public Item findItemById(int idItem) {
		return this.findItemById(idItem);
	}

}
