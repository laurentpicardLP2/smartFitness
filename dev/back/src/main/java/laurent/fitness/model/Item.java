package laurent.fitness.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * The persistent class for the Item database table.
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NamedQuery(name="Item.findAll", query="SELECT i FROM Item i")
public class Item implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected int idItem;
	
	protected String typeItem;
	
	protected int quantityItem;

	protected float price;

	//bi-directional many-to-many association to Command
	@ManyToMany
	@JoinTable(
		name="Command_has_Item"
		, joinColumns={
			@JoinColumn(name="Item_idItem")
			}
		, inverseJoinColumns={
			@JoinColumn(name="Command_idCommand")
			}
		)
	@JsonBackReference
	protected List<Command> commands;

	public Item() {
	}
	
	public Item(List<Command> commands) {
		this.commands = commands;
	}
	
	public Item(List<Command> commands, int quantityItem) {
		this.commands = commands;
		this.quantityItem = quantityItem;
	}
	
	public Item(List<Command> commands, float price) {
		this.commands = commands;
		this.price = price;
	}
	
	public Item(List<Command> commands, float price, int quantityItem) {
		this.commands = commands;
		this.price = price;
		this.quantityItem = quantityItem;
	}
	
	public Item(List<Command> commands, String typeItem) {
		this.commands = commands;
		this.typeItem = typeItem;
	}
	
	public Item(List<Command> commands, String typeItem, int quantityItem) {
		this.commands = commands;
		this.typeItem = typeItem;
		this.quantityItem = quantityItem;
	}
	
	public Item(List<Command> commands, String typeItem, float price) {
		this.commands = commands;
		this.typeItem = typeItem;
		this.price = price;
	}
	
	public Item(List<Command> commands, String typeItem, float price, int quantityItem) {
		this.commands = commands;
		this.typeItem = typeItem;
		this.price = price;
		this.quantityItem = quantityItem;
	}

	public int getIdItem() {
		return this.idItem;
	}

	public void setIdItem(int idItem) {
		this.idItem = idItem;
	}
	
	public String getTypeItem() {
		return this.typeItem;
	}

	public void setTypeItem(String typeItem) {
		this.typeItem = typeItem;
	}
	
	public int getQuantityItem() {
		return this.quantityItem;
	}

	public void setQuantityItem(int quantityItem) {
		this.quantityItem = quantityItem;
	}

	public float getPrice() {
		return this.price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public List<Command> getCommands() {
		return this.commands;
	}

	public void setCommands(List<Command> commands) {
		this.commands = commands;
	}

}