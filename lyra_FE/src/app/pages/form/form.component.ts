import { Component } from '@angular/core';
import {DropdownModule} from 'primeng/dropdown';
import { FormBuilder, FormGroup, FormsModule, NgForm} from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { ReportService } from '../../services/report/report.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Categories } from '../../model/Categories';
import { Report } from '../../model/Report';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-form',
  imports: [DropdownModule,FormsModule, TranslateModule, ButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  SERVER_URL = environment.apiBaseUrl;
  addForm!: FormGroup;
  projectToken!: String;
  langToken!:string;
  file:any;

  selectedCategory!: Categories;
  categories!: Categories[];


  constructor(private reportservice: ReportService, private formBuilder: FormBuilder, private httpClient: HttpClient, public translate: TranslateService, private route: ActivatedRoute) {
    translate.addLangs(['en', 'it']);
    this.route.queryParams.subscribe(params =>{
      this.langToken=params['lang']
    })

    translate.setDefaultLang('en');
    if(this.langToken=="en"){
      translate.use('en')
    }
    if(this.langToken=="it"){
      translate.use('it')
    }
    this.route.queryParams.subscribe(params => {
      this.projectToken = params['token'];
    });
    

    this.categories = [
      { category: "Richiesta Commerciale" },
      { category: "Assistenza tecnica" },
      { category: "Maggiori informazioni" },
      { category: "Altro" }
    ]
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      profile: ['']
    });

  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  openModalConfirm() {
    document.getElementById('openModalButton')!.setAttribute('data-bs-target', '#confirmModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  OpenModalError() {
    document.getElementById('openModalButton')!.setAttribute('data-bs-target', '#errorModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.addForm.get('profile')!.setValue(this.file);
    }
  }

  public reset(addForm: NgForm): void {
    addForm.resetForm();
    document.getElementById('submit-button')!.click();
    
  }

  public onAddReport(addForm: NgForm): void {

    if(this.projectToken=="efwfefce"){
      addForm.value.project="Lyra";
    }
    if(this.projectToken=="cwxqw3io"){
      addForm.value.project="International";
    }
    if(this.projectToken=="op21w88"){
      addForm.value.project="Larine";
    }
    console.log(addForm.value);
    this.reportservice.addReport(addForm.value).subscribe(
      (response: Report) => {
        this.openModalConfirm();
        console.log(response)

        const formData = new FormData();
        formData.append('file', this.addForm.get('profile')!.value);
        this.reportservice.addImage(formData, response.id).subscribe(
          (response: any) => {
            this.addForm.get('profile')!.setValue(null);
          },
          (error:HttpErrorResponse) => {
            console.log(error);
            this.addForm.get('profile')!.setValue(null);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.OpenModalError();
      }
    );
    addForm.resetForm();
    this.file=null    
  }

}
