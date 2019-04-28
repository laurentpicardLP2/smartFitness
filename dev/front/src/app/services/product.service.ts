import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private token: TokenStorageService) { }

    public listProductCategories: ProductCategory [] = [] ;
    public listNameProductCategories: string [] = [] ;

    listProductCategories$: BehaviorSubject<ProductCategory[]> = new BehaviorSubject(null);
    listNameProductCategories$: BehaviorSubject<string[]> = new BehaviorSubject(null);
   
    public getProductCategories(): Observable<ProductCategory[]> {
      return this.httpClient.get<ProductCategory[]>('http://localhost:8080/productcategoryctrl/getproductcategories', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getNameProductCategories(): Observable<string[]> {
      return this.httpClient.get<string[]>('http://localhost:8080/productcategoryctrl/getnameproductcategories', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public publishProductCategories() {
      this.getProductCategories().subscribe(
        productCategoriesList => {
          this.listProductCategories = productCategoriesList;
          this.listProductCategories$.next(this.listProductCategories);
        });
    }

    public publishNameProductCategories() {
      this.getNameProductCategories().subscribe(
        productCategoriesList => {
          this.listNameProductCategories = productCategoriesList;
          this.listNameProductCategories$.next(this.listNameProductCategories);
        });
      }

  /**
   * Cette fonction permet de trouver une entité ProductCategory dans la liste des productCategories grâce à son ID.
   * @param idProductCategory l'id qu'il faut rechercher dans la liste. 
   */
  public findProductCategory(idProductCategory: number): Observable<ProductCategory> {
    if (idProductCategory) {
      if (!this.listProductCategories) {
        return this.getProductCategories().pipe(map(productCategories => productCategories.find(productCategory => productCategory.idProductCategory === idProductCategory)));
      }
      return of(this.listProductCategories.find(productCategory => productCategory.idProductCategory === idProductCategory));
    } 
  }

  public addProductCategory(nameProductCategory: string){
    this.httpClient.post<ProductCategory>('http://localhost:8080/productcategoryctrl/addproductcategory/' + nameProductCategory , null, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (addedProductCategory) =>{ 
          this.router.navigate(['product-category-listing']);
        },
        (error) => { 
          console.log("add ProductCategory pb : ", error); 
          this.router.navigate(['error-page'])
        }
    );
  }

  public updateProductCategory(idProductCategory:number, nameProductCategory: string){
    this.httpClient.put<ProductCategory>('http://localhost:8080/productcategoryctrl/updateproductcategory/' + idProductCategory + '/' + nameProductCategory, null, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (updatedProductCategory) =>{ 
          console.log("update ProductCategory OK : ", updatedProductCategory);
          let index = this.listProductCategories.findIndex(productCategory => productCategory.idProductCategory === idProductCategory);
          this.listProductCategories[index].nameProductCategory = nameProductCategory;
          this.listProductCategories$.next(this.listProductCategories);
          this.listNameProductCategories = [];
          for(let i = 0; i< this.listProductCategories.length; i++){
            this.listNameProductCategories.push(this.listProductCategories[i].nameProductCategory);
          }
          this.listNameProductCategories$.next(this.listNameProductCategories);
          this.router.navigate(['product-category-listing']);
        },
        (error) => { 
          console.log("update ProductCategory pb : ", error); 
          this.router.navigate(['error-page']);
        }
    );
  }
}
