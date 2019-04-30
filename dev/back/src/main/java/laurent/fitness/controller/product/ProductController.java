package laurent.fitness.controller.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.ProductRef;
import laurent.fitness.services.ProductCategoryService;
import laurent.fitness.services.ProductRefService;
import laurent.fitness.services.ProductService;

@RestController
@RequestMapping("/productctrl")
@CrossOrigin("http://localhost:4200")
public class ProductController {
	private ProductService productService;
	private ProductRefService productRefService;
	
	public ProductController(ProductService productService, ProductRefService productRefService) {
		this.productService = productService;
		this.productRefService = productRefService;
	}
	
	/**
	 * Retourne la liste des références de produit
	 * @return
	 */
	@GetMapping("/getproducts")
	public List<ProductRef> getProductRefs() {
		return this.productRefService.getAllProductRef();
	}
	
	/**
	 * Retourne la liste des cinq premières références de produit
	 * @return
	 */
	@GetMapping("/getfavoriteproducts")
	public List<ProductRef> getFavoriteProductRefs() {
		return this.productRefService.getFavoriteProductRefs();
	}
	
	/**
	 * Retourne le produit de référence associé à l'article idItem
	 * @return
	 */
	@GetMapping("/getproductrefassociatetoiditem/{idItem}")
	public ProductRef getProductRef(@PathVariable Integer idItem) {
		return this.productService.getProductRefByIdItem(idItem);
	}
	
	/**
	 * Ajoute un produit dans la commande du username
	 * @param idCommand
	 * @param idWatchCategory
	 * @param username
	 * @return
	 */
	@PostMapping("/addproduct/{idCommand}/{idProductRef}/{quantityItem}")
	public ResponseEntity<?> addWatch(@PathVariable Integer idCommand, @PathVariable Integer idProductRef, @PathVariable Integer quantityItem) {

		try { 
			return ResponseEntity.status(HttpStatus.OK).body(this.productService.addProduct(idCommand, idProductRef, quantityItem));
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	
	
}
