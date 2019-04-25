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
		// TODO Auto-generated method stub
		return this.evenementRepo.findAll();
	}

	@Override
	public Evenement saveEvenement(Evenement evt) {
		// TODO Auto-generated method stub
		return this.evenementRepo.save(evt);
	}

	@Override
	public Evenement updateEvenement(Evenement evt) {
		// TODO Auto-generated method stub
		Evenement updatedEvenement = this.evenementRepo.findByIdEvenement(evt.getIdEvt());
		updatedEvenement.setTitleEvt(evt.getTitleEvt());
		updatedEvenement.setDescriptionEvt(evt.getDescriptionEvt());
		updatedEvenement.setEndDateTimeEvt(evt.getEndDateTimeEvt());
		updatedEvenement.setStartDateTimeEvt(evt.getStartDateTimeEvt());
		updatedEvenement.setImageEvt(evt.getImageEvt());
		return this.evenementRepo.save(updatedEvenement);
	}

	@Override
	public void deleteEvenement(Evenement evt) {
		// TODO Auto-generated method stub
		this.evenementRepo.delete(evt);
	}

	@Override
	public Evenement findEvenementById(int idEvt) {
		// TODO Auto-generated method stub
		return this.evenementRepo.findByIdEvenement(idEvt);
	}

}
