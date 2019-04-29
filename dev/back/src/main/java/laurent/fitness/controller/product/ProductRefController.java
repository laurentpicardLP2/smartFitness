package laurent.fitness.controller.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.ProductCategory;
import laurent.fitness.model.ProductRef;
import laurent.fitness.model.Room;
import laurent.fitness.services.ProductCategoryService;
import laurent.fitness.services.ProductRefService;

@RestController
@RequestMapping("/productrefctrl")
@CrossOrigin("http://localhost:4200")
public class ProductRefController {
	
	private ProductRefService productRefService;
	private ProductCategoryService productCategoryservice;
	
	public ProductRefController(ProductRefService productRefService, ProductCategoryService productCategoryservice) {
		this.productRefService = productRefService;
		this.productCategoryservice = productCategoryservice;
	}
	
	/**
	 * Retourne la liste des références de produit
	 * @return
	 */
	@GetMapping("/getproductrefs")
	public List<ProductRef> getProductRefs() {
		return this.productRefService.getAllProductRef();
	}
	
	/**
	 * Retourne la liste des noms des références de produit
	 * @return
	 */
	@GetMapping("/getnameproductrefs")
	public List<String> getNameProductRefs() {
		return this.productRefService.getListNameProductRef();
	}
	
	/**
	 * Retourne la liste des cinq premières références de produit
	 * @return
	 */
	@GetMapping("/getfavoriteproductrefs")
	public List<ProductRef> getFavoriteProductRefs() {
		return this.productRefService.getFavoriteProductRefs();
	}
	
	/**
	 * Fonction retournant la catégorie associée à une référence de produit
	 * @param idProductRef
	 * @return
	 */
	@GetMapping("/getproductcategoryassociatetoproductref/{idProductRef}")
	public ProductCategory getProductCategoryAssociateToProductRef(@PathVariable Integer idProductRef) {
		return this.productCategoryservice.getProductCategoryAssociateToProductRef(idProductRef);			
	}
	
	/**
	 * Crée une référence de produit
	 * @param nameWatch
	 * @param priceWatch
	 * @param descriptionWatch
	 * @param imageWatch
	 * @return
	 */
	@PostMapping("/addproductref/{idProductCategory}")
	public ResponseEntity<?> addWatchCategory(@RequestBody ProductRef productRef, @PathVariable Integer idProductCategory) {
		try {
		return ResponseEntity.status(HttpStatus.OK).body(this.productRefService.saveProductRef(productRef, idProductCategory));
		
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	/**
	 * Modifie la fiche d'une référence d'un produit
	 * @param idProductRef
	 * @param nameProductRef
	 * @param priceProductRef
	 * @param descriptionProductRef
	 * @param imageProductRef
	 * @param idProductCategory
	 * @return
	 */
	@PutMapping("/updateproductref/{nameProductCategory}")
	public ResponseEntity<?> updateWatchCategory(@RequestBody ProductRef productRef, @PathVariable String nameProductCategory) {
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(this.productRefService.updateProductRef(productRef, nameProductCategory));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	/**
	 * Supprime la référence du produit idProductRef
	 * @param idProductRef
	 * @return
	 */
	@DeleteMapping("/deleteproductref/{idProductRef}")
	public ResponseEntity<?> deleteProductRef(@PathVariable Integer idProductRef){
		try {
			this.productRefService.deleteProductRef(this.productRefService.findByIdProductRef(idProductRef));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}

}
