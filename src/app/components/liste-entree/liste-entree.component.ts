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
  selectedFile: File | undefined;

  search :string = "";

  constructor(private entree: EntreeService,public formBuilder: FormBuilder,public router: Router) {
    this.entreeForm = this.formBuilder.group({
      titre : [''],
      descr :[''],
      contenu :[''],
      cover : [''],
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
    const formData = new FormData();
    formData.append('titre', this.entreeForm.get('titre')!.value);
    formData.append('descr', this.entreeForm.get('descr')!.value);
    formData.append('contenu', this.entreeForm.get('contenu')!.value);
    formData.append('cover', this.selectedFile!);

    this.entree.addEntree(formData).subscribe(res=>{
      this.getAllArticles();
      this.entreeForm.reset();
      this.selectedFile = undefined;
    })
  }

  send(event:string){
    if(event == "refresh")
      this.getAllArticles()
  }

  onSearch(event: KeyboardEvent){}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  //   this.entreeForm.patchValue({ cover: this.selectedFile });
  }
}
