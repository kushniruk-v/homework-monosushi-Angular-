import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category-interface';
import {ref, Storage, percentage, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {

  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public isOpen = false;
  public isModal =false;
  public editStatus = false;
  private currentCategoryId = 0;

public uploadPercent!: number;
public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage
  ) { }
  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }
  addCategory():void{
    this.isOpen =!this.isOpen
    if(this.isOpen){
      this.isModal =true
   
    }
else{
  this.isModal =false

}
this.uploadPercent = 0;

  
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(data => {
      this.adminCategories = data;
    })
  }

  
  editCategory(category:ICategoryResponse):void{
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });

    this.currentCategoryId = category.id;
    this.editStatus = true;
    this.isModal =true;
   
this.isUploaded = true;

this.uploadPercent = 0;
  }
  saveCategory():void{
    if(this.editStatus){
  
      this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadCategories();
       
      })
      this.isModal =false
    }
 else{
  this.categoryService.create(this.categoryForm.value).subscribe(() => {
    this.loadCategories();
  })
 }
 this.categoryForm.reset();
 this.editStatus = false;
 this.isUploaded = false;

 this.uploadPercent = 0;
}
  
  deleteCategory(category:ICategoryResponse):void{
    this.categoryService.delete(category.id).subscribe(() => {
      this.loadCategories();
    })

  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }
  
   async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if(file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }
  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      })
    })
  }
  
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
