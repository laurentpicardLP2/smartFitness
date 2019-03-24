package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Item;

public interface ItemService {
	public List<Item> getAllItems();
	public Item saveItem(Item item);
	public void deleteItem(int idItem);
	public Item findItemById(int idItem);
}
