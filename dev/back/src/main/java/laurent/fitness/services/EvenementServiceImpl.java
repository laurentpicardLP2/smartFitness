package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Evenement;
import laurent.fitness.repository.EvenementRepository;

@Service
public class EvenementServiceImpl implements EvenementService {
	
	private EvenementRepository evenementRepo;
	
	public EvenementServiceImpl(EvenementRepository evenementRepo) {
		this.evenementRepo = evenementRepo;
	}

	@Override
	public List<Evenement> findAllEvenement() {
		return this.evenementRepo.findAll();
	}

	@Override
	public Evenement saveEvenement(Evenement evt) {
		return this.evenementRepo.save(evt);
	}

	@Override
	public Evenement updateEvenement(Evenement evt) {
		Evenement updatedEvenement = this.evenementRepo.findByIdEvenement(evt.getIdEvt());
		updatedEvenement.setTitleEvt(evt.getTitleEvt());
		updatedEvenement.setDescriptionEvt(evt.getDescriptionEvt());
		updatedEvenement.setEndDateTimeEvt(evt.getEndDateTimeEvt());
		updatedEvenement.setStartDateTimeEvt(evt.getStartDateTimeEvt());
		updatedEvenement.setImageEvt(evt.getImageEvt());
		updatedEvenement.setVideoEvt(evt.getVideoEvt());
		return this.evenementRepo.save(updatedEvenement);
	}

	@Override
	public void deleteEvenement(int idEvt) {
		this.evenementRepo.delete(this.evenementRepo.findByIdEvenement(idEvt));
	}

	@Override
	public Evenement findEvenementById(int idEvt) {
		return this.evenementRepo.findByIdEvenement(idEvt);
	}

	@Override
	public int getIdMaxEvenement() {
		return this.evenementRepo.findByIdMaxEvenement();
	}

	@Override
	public List<Evenement> getEvenementInProgress() {
		return this.evenementRepo.findByEvenementInProgress();
	}

	@Override
	public List<Evenement> getEvenementInSlotTime() {
		return this.evenementRepo.findByEvenementInSlotTime();
	}

}
