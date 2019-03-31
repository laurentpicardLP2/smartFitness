package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import laurent.fitness.model.Subscription;

public interface SubscriptionRepository  extends JpaRepository<Subscription, Integer> {

}
