package laurent.fitness.model.adaptater;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@Entity
@NamedQuery(name="ItemPaypalAdaptater.findAll", query="SELECT i FROM ItemPaypalAdaptater i")
public class ItemPaypalAdaptater {

	@Id
	private String typeItem;
	
	private int nb;
	
	private float amount;

	public ItemPaypalAdaptater() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ItemPaypalAdaptater(String typeItem, int nb, float amount) {
		super();
		this.typeItem = typeItem;
		this.nb = nb;
		this.amount = amount;
	}

	public String getTypeItem() {
		return typeItem;
	}

	public void setTypeItem(String typeItem) {
		this.typeItem = typeItem;
	}

	public int getNb() {
		return nb;
	}

	public void setNb(int nb) {
		this.nb = nb;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
	}
	
	
	
}
