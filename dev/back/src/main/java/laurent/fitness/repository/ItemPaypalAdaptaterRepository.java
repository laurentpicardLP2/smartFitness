package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import laurent.fitness.model.adaptater.ItemPaypalAdaptater;

public interface ItemPaypalAdaptaterRepository extends JpaRepository<ItemPaypalAdaptater, String> {

}
