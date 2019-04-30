import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductRef } from 'src/app/models/product-ref.model';
import { Product } from 'src/app/models/product.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private token: TokenStorageService,
    private commandService: CommandService) { }

    public listProductCategories: ProductCategory [] = [] ;
    public listNameProductCategories: string [] = [] ;
    public listProductRefs: ProductRef [] = [] ;
    public listProducts: ProductRef [] = [] ;
    public listFavoriteProducts: ProductRef [] = [] ;
    public listNameProductRefs: string [] = [] ;
    public productCategoryAssociateToProductRef: ProductCategory = null;
    public productRefAssociateToIdItem: ProductRef = null;

    listProductCategories$: BehaviorSubject<ProductCategory[]> = new BehaviorSubject(null);
    listNameProductCategories$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    listProductRefs$: BehaviorSubject<ProductRef[]> = new BehaviorSubject(null);
    listProducts$: BehaviorSubject<ProductRef[]> = new BehaviorSubject(null);
    listFavoriteProducts$: BehaviorSubject<ProductRef[]> = new BehaviorSubject(null);
    listNameProductRefs$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    productCategoryAssociateToProductRef$ = new BehaviorSubject(null);
    productRefAssociateToIdItem$ = new BehaviorSubject(null);

    command: Command;
   
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

    public getProducts(): Observable<ProductRef[]> {
      return this.httpClient.get<ProductRef[]>('http://localhost:8080/productctrl/getproducts', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getFavoriteProducts(): Observable<ProductRef[]> {
      return this.httpClient.get<ProductRef[]>('http://localhost:8080/productctrl/getfavoriteproducts', 
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


    public getProductRefAssociateToIdItem(idItem: number): Observable<ProductRef> {
      return this.httpClient.get<ProductRef>('http://localhost:8080/productctrl/getproductrefassociatetoiditem/' + idItem, 
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

    public publishProducts() {
      this.getProducts().subscribe(
        productsList => {
          this.listProducts = productsList;
          this.listProducts$.next(this.listProducts);
        });
    }

    public publishFavoriteProducts() {
      this.getFavoriteProducts().subscribe(
        favoriteProductsList => {
          this.listFavoriteProducts = favoriteProductsList;
          this.listFavoriteProducts$.next(this.listFavoriteProducts);
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


    public publishProductRefAssociateToIdItem(idItem: number) {
      this.getProductRefAssociateToIdItem(idItem).subscribe(
        productRef => {
          this.productRefAssociateToIdItem = productRef;
          this.productRefAssociateToIdItem$.next(this.productRefAssociateToIdItem);
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
   * Cette fonction permet de trouver une entité ProductRef dans la liste des productRefs grâce à son ID.
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

  /**
   * Cette fonction permet de trouver une entité Product dans la liste des product grâce à son ID.
   * @param idProductRef l'id qu'il faut rechercher dans la liste. 
   */
  public findProduct(idProductRef: number): Observable<ProductRef> {
    if (idProductRef) {
      if (!this.listProducts) {
        return this.getProducts().pipe(map(products => products.find(product => product.idProductRef === idProductRef)));
      }
      return of(this.listProducts.find(product => product.idProductRef === idProductRef));
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

  public updateProductRef(productRef: ProductRef, nameProductCategory: string, isRouting: boolean){
    this.httpClient.put<ProductRef>('http://localhost:8080/productrefctrl/updateproductref/' + nameProductCategory, productRef, 
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

  public deleteProductCategory(idProductCategory: number, nameProductCategory: string){
      
    this.httpClient.delete('http://localhost:8080/productcategoryctrl/deleteproductcategory/' + idProductCategory,
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ console.log("suppression idProductCategory OK : ",idProductCategory);
          this.listProductCategories.slice(this.listProductCategories.findIndex(productCategory => productCategory.idProductCategory === idProductCategory), 1);
          this.listNameProductCategories.slice(this.listNameProductCategories.findIndex(name => name === nameProductCategory), 1);
          this.publishNameProductRefs();
          this.publishProductRefs();
     },
        (error) => console.log("suppression idProductCategory pb : ", error) 
    );
  }

  public deleteProductRef(idProductRef: number, nameProductRef: string){
      
    this.httpClient.delete('http://localhost:8080/productrefctrl/deleteproductref/' + idProductRef,
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ console.log("suppression idProductRef OK : ",idProductRef);
          this.listProductRefs.slice(this.listProductRefs.findIndex(productRef => productRef.idProductRef === idProductRef), 1);
          this.listNameProductRefs.slice(this.listNameProductRefs.findIndex(name => name === nameProductRef), 1);
     },
        (error) => console.log("suppression idProductRef pb : ", error) 
    );
  }


  public addProductToCommand(command: Command,  idProductRef: number, nbItems: string, totalPriceCommand: number, quantityItem: number){
    this.httpClient.post<Product>('http://localhost:8080/productctrl/addproduct/' + command.idCommand + '/' + idProductRef + '/' + quantityItem , null, 
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
      }).subscribe(
        (product) =>{ 
          command.items.push(product); 
          this.commandService.setCommandSubject(command); 
          if(nbItems==null || nbItems==undefined || nbItems=="") {
            nbItems = "0"; 
          }
          this.commandService.setNbItemsSubject((parseInt(nbItems, 10) + 1).toString());

          totalPriceCommand += product.price * quantityItem;
          //command.items[command.items.findIndex((item)=> item.idItem == watch.idItem)].price += watch.price;
          this.commandService.setTotalPriceCommandSubject(totalPriceCommand);
          this.commandService.setCommandSubject(command);
          this.commandService.setUpdateStatusAndPriceToCommand(command, totalPriceCommand);
          this.commandService.setListCommandItemsSubject(command.items);
          this.router.navigate(['']);
        },
        (error) => { 
          console.log("add watch pb : ", error);
          this.router.navigate(['error-page']);
        }
    );
  }

}
