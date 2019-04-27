package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Evenement;

public interface EvenementService {
	public List<Evenement> findAllEvenement();
	public List<Evenement> getEvenementInProgress();
	public List<Evenement> getEvenementInSlotTime();
	public Evenement saveEvenement(Evenement evt);
	public Evenement updateEvenement(Evenement evt);
	public void deleteEvenement(int idEvt);
	public Evenement findEvenementById(int idEvt);
	public int getIdMaxEvenement();
}
