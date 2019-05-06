package laurent.fitness.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Command;
import laurent.fitness.model.Product;
import laurent.fitness.model.ProductRef;
import laurent.fitness.repository.CommandRepository;
import laurent.fitness.repository.ProductRefRepository;
import laurent.fitness.repository.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {
	
	private CommandRepository commandRepo;
	private ProductRepository productRepo;
	private ProductRefRepository productRefRepo;
	
	public ProductServiceImpl(CommandRepository commandRepo, ProductRepository productRepo, ProductRefRepository productRefRepo) {
		this.commandRepo = commandRepo;
		this.productRepo = productRepo;
		this.productRefRepo = productRefRepo;
	}

	@Override
	public Product addProduct(int idCommand, int idProductRef, int quantityItem) {
		// TODO Auto-generated method stub
		List<Command> commands = new ArrayList<Command>();
		Command command = this.commandRepo.findByIdCommand(idCommand);
		commands.add(command);
		ProductRef productRef = this.productRefRepo.findByIdProductRef(idProductRef);
		return this.productRepo.save(new Product(commands, productRef.getNameProductRef() + ":product", productRef.getPriceProductRef(), productRef, quantityItem));
	
	}

	@Override
	public List<ProductRef> getAllProductRef() {
		// TODO Auto-generated method stub
		return this.productRefRepo.findAll();
	}

	@Override
	public ProductRef getProductRefByIdItem(int idItem) {
		// TODO Auto-generated method stub
		return this.productRefRepo.findByIdProductRef(this.productRepo.findByIdItem(idItem).getProductRef().getIdProductRef());
	}

}
