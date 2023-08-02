import { Component } from '@angular/core';
import { throwError,Observable,catchError } from 'rxjs';
import { EntreeService } from 'src/app/services/entree.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-entree',
  templateUrl: './liste-entree.component.html',
  styleUrls: ['./liste-entree.component.css']
})
export class ListeEntreeComponent {

  articles: any[];

  entreeForm : FormGroup;

  search :string = "";

  constructor(private entree: EntreeService,public formBuilder: FormBuilder,public router: Router) {
    this.entreeForm = this.formBuilder.group({
      titre : [''],
      descr :[''],
      contenu :['']
    })
  }

  ngOnInit(){
    this.getAllArticles();
  }

  getAllArticles(){
    this.entree.findArticles().subscribe(result => {
      this.articles = result;
    })
  }


  insertEntree(){
    this.entree.addEntree(this.entreeForm.value).subscribe(res=>{
      this.getAllArticles();
      this.entreeForm.reset();
    })
  }

  send(event:string){
    if(event == "refresh")
      this.getAllArticles()
  }

  onSearch(event: KeyboardEvent){}
}
