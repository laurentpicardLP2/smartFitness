package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Staff;
import laurent.fitness.repository.StaffRepository;

@Service
public class StaffServiceImpl implements StaffService {
	
	private StaffRepository staffRepo;

    public StaffServiceImpl(StaffRepository staffRepo) {
        this.staffRepo = staffRepo;
    }

	@Override
	public List<Staff> getAllStaff() {
		// TODO Auto-generated method stub
		return this.staffRepo.findAll();
	}

	@Override
	public Staff saveStaff(Staff staff) {
		// TODO Auto-generated method stub
		return this.staffRepo.save(staff);
	}

}
