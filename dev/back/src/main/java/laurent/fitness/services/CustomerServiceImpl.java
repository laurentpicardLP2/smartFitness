package laurent.fitness.services;

import java.util.List;
import org.springframework.stereotype.Service;
import laurent.fitness.repository.CustomerRepository;
import laurent.fitness.model.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	private CustomerRepository customerRepo;

    public CustomerServiceImpl(CustomerRepository customerRepo) {
        this.customerRepo = customerRepo;
    }

	@Override
	public List<Customer> getAllCustomers() {
		return this.customerRepo.findAll();
	}

	@Override
	public Customer saveCustomer(Customer customer) {
		return this.customerRepo.save(customer);
	}

	@Override
	public Customer findByUsername(String username) {
		return this.customerRepo.findByUsername(username);
	}
	
}


