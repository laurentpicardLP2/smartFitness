package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import laurent.fitness.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
