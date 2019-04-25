package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Evenement;

public interface EvenementService {
	public List<Evenement> findAllEvenement();
	public Evenement saveEvenement(Evenement evt);
	public Evenement updateEvenement(Evenement evt);
	public void deleteEvenement(Evenement evt);
	public Evenement findEvenementById(int idEvt);
}
