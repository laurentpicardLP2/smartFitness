package laurent.fitness.services;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

@Service
public class ReportingServiceImpl implements ReportingService {

	@Override
	public ArrayList<Integer> getDataSet(int period) {
		// TODO Auto-generated method stub
		ArrayList<Integer> data = new ArrayList<Integer>();
		for(int i=0; i< 12; i++) {
			data.add(new Integer(i));
		}
		return data;
	}

}
