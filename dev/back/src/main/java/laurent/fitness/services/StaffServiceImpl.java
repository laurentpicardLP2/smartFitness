package laurent.fitness.services;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import laurent.fitness.model.Authority;
import laurent.fitness.model.Staff;
import laurent.fitness.repository.AuthorityRepository;
import laurent.fitness.repository.StaffRepository;

@Service
public class StaffServiceImpl implements StaffService {
	
	private StaffRepository staffRepo;
	private AuthorityRepository authorityRepo;
	
	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    public StaffServiceImpl(StaffRepository staffRepo, AuthorityRepository authorityRepo) {
        this.staffRepo = staffRepo;
        this.authorityRepo = authorityRepo;
    }

	@Override
	public List<Staff> getAllStaff() {
		return this.staffRepo.findAllStaff();
	}

	@Override
	public Staff saveStaff(Staff staff) {
		return this.staffRepo.save(staff);
	}

	@Override
	public Staff updateStaff(Staff staff, String role) {
		Authority updatedAuthority = this.authorityRepo.findByUsername(staff.getUsername());
		updatedAuthority.setAuthority(role);
		this.authorityRepo.save(updatedAuthority);
		Staff updatedStaff = this.staffRepo.findByUsername(staff.getUsername());
		updatedStaff.setAuthority(updatedAuthority);
		updatedStaff.setEmail(staff.getEmail());
		updatedStaff.setFullname(staff.getFullname());
		updatedStaff.setPassword("{bcrypt}" + bcrypt.encode(staff.getPassword()));
		updatedStaff.setTel(staff.getTel());
		return this.staffRepo.save(updatedStaff);
	}

}
