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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.ProductCategory;
import laurent.fitness.services.ProductCategoryService;

@RestController
@RequestMapping("/productcategoryctrl")
@CrossOrigin("http://localhost:4200")
public class ProductCategoryController {
	
	private ProductCategoryService productCategoryService;
	
	public ProductCategoryController(ProductCategoryService productCategoryService) {
		this.productCategoryService = productCategoryService;
	}
	
	/**
	 * Retourne la liste des categories de produits
	 * @return
	 */
	@GetMapping("/getproductcategories")
	public List<ProductCategory> getProductCategories() {
		return this.productCategoryService.getAllProductCategories();
	}
	
	/**
	 * Retourne la liste des noms de categories de produits
	 * @return
	 */
	@GetMapping("/getnameproductcategories")
	public List<String> getNameProductCategories() {
		return this.productCategoryService.getListNameProductCategories();
	}
	
	/**
	 * Crée une categorie de produit @param nameProductCategory
	 * @param nameProductCategory
	 * @return
	 */
	@PostMapping("/addproductcategory/{nameProductCategory}")
	public ResponseEntity<?> addProductCategory(@PathVariable String nameProductCategory) {
		try {;
		return ResponseEntity.status(HttpStatus.OK).body(this.productCategoryService.saveProductCategory(new ProductCategory(nameProductCategory)));
		
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	/**
	 * Modifie le nom d'une categorie de produit
	 * @param idProductCategory
	 * @param nameProductCategory
	 * @return
	 */
	@PutMapping("/updateproductcategory/{idProductCategory}/{nameProductCategory}")
	public ResponseEntity<?> updateWatchCategory(@PathVariable Integer idProductCategory, @PathVariable String nameProductCategory) {
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(this.productCategoryService.updateProductCategory(idProductCategory, nameProductCategory));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	/**
	 * Supprime une categorie de produit
	 * @param idWatchCategory
	 * @return
	 */
	@DeleteMapping("/deletewatchcategory/{idWatchCategory}")
	public ResponseEntity<?> deleteProductCategory(@PathVariable Integer idProductCategory){
		try {
			this.productCategoryService.deleteProductCategory(this.productCategoryService.findByIdProductCategory(idProductCategory));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}

}
