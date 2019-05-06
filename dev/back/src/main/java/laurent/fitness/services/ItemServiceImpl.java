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
		// TODO Auto-generated method stub
		return this.itemRepo.findAll();
	}

	@Override
	public Item saveItem(Item item) {
		// TODO Auto-generated method stub
		return this.itemRepo.save(item);
	}

	@Override
	public void deleteItem(int idItem) {
		// TODO Auto-generated method stub
		this.itemRepo.delete(this.itemRepo.findById(idItem).get());
	}

	@Override
	public Item findItemById(int idItem) {
		// TODO Auto-generated method stub
		return this.findItemById(idItem);
	}

}
