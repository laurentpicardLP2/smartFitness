package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import laurent.fitness.model.Seance;

public interface SeanceService {
	public List<Seance> getAllSeances();
	public Seance createSeance(int idCommand, String username, float price);
	public Seance updateSeance(int idItem);
	public void deleteSeance(int idItem);
	public Seance findSeanceById(int idItem);
	public Date findByDateOfTimestamp(int idItem);
	public int findNbTimestampBySeance(int idItem);
	public List<Seance> findSeancesByUsername(String username);
}
