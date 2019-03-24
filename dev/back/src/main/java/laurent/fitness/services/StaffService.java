package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Staff;

public interface StaffService {
	public List<Staff> getAllStaff();
	public Staff saveStaff(Staff staff);
}
