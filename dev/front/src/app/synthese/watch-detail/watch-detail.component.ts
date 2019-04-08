
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';


import { ManagerService } from 'src/app/services/manager.service';
import { OffresService } from 'src/app/services/offres.service';
import { Router, ActivatedRoute } from '@angular/router';


import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent implements OnInit {

  watchCategoryForm: FormGroup;
  idWatchCategory: number;
  nameWatch: string;
  priceWatch: number;
  descriptionWatch: string;
  imageWatch: string;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private managerService: ManagerService,
    private offresService: OffresService,
    private router: Router) { }

  ngOnInit() {
    this.idWatchCategory = +this.route.snapshot.params.idWatchCategory;
    console.log("idWatchCategory : ", this.idWatchCategory);
     this.offresService.publishWatchCategories();

    setTimeout(()=> this.offresService.findwatchCategory(this.idWatchCategory).subscribe(watchCategory => {
      this.idWatchCategory = watchCategory.idWatchCategory;
      this.nameWatch = watchCategory.nameWatch;
      this.priceWatch = watchCategory.priceWatch;
      this.descriptionWatch = watchCategory.descriptionWatch; 
      this.imageWatch = watchCategory.imageWatch;      
    }), 100);

    

  }

}
