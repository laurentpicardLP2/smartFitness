package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Customer;

public interface CustomerService {
	public List<Customer> getAllCustomers();
	public Customer saveCustomer(Customer customer);
	public Customer findByUsername(String username);
	
}
