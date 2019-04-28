import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductRef } from 'src/app/models/product-ref.model';
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
    public listProductRefs: ProductRef [] = [] ;
    public listNameProductRefs: string [] = [] ;
    public productCategoryAssociateToProductRef: ProductCategory = null;

    listProductCategories$: BehaviorSubject<ProductCategory[]> = new BehaviorSubject(null);
    listNameProductCategories$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    listProductRefs$: BehaviorSubject<ProductRef[]> = new BehaviorSubject(null);
    listNameProductRefs$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    productCategoryAssociateToProductRef$ = new BehaviorSubject(null);
   
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

    public getProductRefs(): Observable<ProductRef[]> {
      return this.httpClient.get<ProductRef[]>('http://localhost:8080/productrefctrl/getproductrefs', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getNameProductRefs(): Observable<string[]> {
      return this.httpClient.get<string[]>('http://localhost:8080/productrefctrl/getnameproductrefs', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getProductCategoryAssociateToProductRef(idProductRef: number): Observable<ProductCategory> {
      return this.httpClient.get<ProductCategory>('http://localhost:8080/productrefctrl/getproductcategoryassociatetoproductref/' + idProductRef, 
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

    public publishProductRefs() {
      this.getProductRefs().subscribe(
        productRefsList => {
          this.listProductRefs = productRefsList;
          this.listProductRefs$.next(this.listProductRefs);
        });
    }

    public publishNameProductRefs() {
      this.getNameProductRefs().subscribe(
        productRefsList => {
          this.listNameProductRefs = productRefsList;
          this.listNameProductRefs$.next(this.listNameProductRefs);
        });
      }

    public publishProductCategoryAssociateToProductRef(idProductRef: number) {
      this.getProductCategoryAssociateToProductRef(idProductRef).subscribe(
        productCategory => {
          this.productCategoryAssociateToProductRef = productCategory;
          this.productCategoryAssociateToProductRef$.next(this.productCategoryAssociateToProductRef);
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

  /**
   * Cette fonction permet de trouver une entité ProductRef dans la liste des productCategories grâce à son ID.
   * @param idProductRef l'id qu'il faut rechercher dans la liste. 
   */
  public findProductRef(idProductRef: number): Observable<ProductRef> {
    if (idProductRef) {
      if (!this.listProductRefs) {
        return this.getProductRefs().pipe(map(productRefs => productRefs.find(productRef => productRef.idProductRef === idProductRef)));
      }
      return of(this.listProductRefs.find(productRef => productRef.idProductRef === idProductRef));
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

  public addProductRef(idProductCategory: number, productRef: ProductRef, isRouting: boolean){
    this.httpClient.post<ProductRef>('http://localhost:8080/productrefctrl/addproductref/' + idProductCategory, productRef, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (addedProductRef) =>{ 
          if(isRouting){
            setTimeout(() => this.router.navigate(['product-ref-listing']), 150);
          }
        },
        (error) => { 
          console.log("add ProductRef pb : ", error); 
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

  public updateProductRef(productRef: ProductRef, idProductCategory: number, isRouting: boolean){
    this.httpClient.put<ProductRef>('http://localhost:8080/productrefctrl/updateproductref/' + idProductCategory, productRef, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (updatedProductRef) =>{ 
          console.log("update ProductRef OK : ", updatedProductRef);
          let index = this.listProductRefs.findIndex(pr => pr.idProductRef === productRef.idProductRef);
          this.listProductRefs[index].nameProductRef = productRef.nameProductRef;
          this.listProductRefs$.next(this.listProductRefs);
          this.listNameProductRefs = [];
          for(let i = 0; i< this.listProductRefs.length; i++){
            this.listNameProductRefs.push(this.listProductRefs[i].nameProductRef);
          }
          this.listNameProductRefs$.next(this.listNameProductRefs);
          if(isRouting){
            setTimeout(() => this.router.navigate(['product-ref-listing']), 150);
          }
         },
        (error) => { 
          console.log("update ProductRef pb : ", error); 
          this.router.navigate(['error-page']);
        }
    );
  }

  public deleteProductRef(idProductRef: number){
      
    this.httpClient.delete('http://localhost:8080/productrefctrl/deleteproductref/' + idProductRef,
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ console.log("suppression idProductRef OK : ",idProductRef);
            },
        (error) => console.log("suppression idProductRef pb : ", error) 
    );
  }


}
