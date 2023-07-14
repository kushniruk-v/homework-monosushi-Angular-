import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category-interface';
import {
  ref,
  Storage,
  percentage,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from '@angular/fire/storage';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent {
  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public isOpen = false;
  public isModal = false;
  public editStatus = false;
  private currentCategoryId!: number |string;

  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private ImageService: ImageService
  ) {}
  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }
  addCategory(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isModal = true;
    } else {
      this.isModal = false;
    }
    this.uploadPercent = 0;
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: ['', Validators.required],
    });
  }

  loadCategories(): void {
    // this.categoryService.getAll().subscribe((data) => {
    //   this.adminCategories = data;
    // });
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
    });
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    });

    this.currentCategoryId = category.id as number;
    this.editStatus = true;
    this.isModal = true;

    this.isUploaded = true;

    this.uploadPercent = 0;
  }
  saveCategory(): void {
    if (this.editStatus) {
      // this.categoryService
      //   .update(this.categoryForm.value, this.currentCategoryId)
      //   .subscribe(() => {
      //     this.loadCategories();
      //   });
      this.categoryService
      .updateFirebase(this.categoryForm.value, this.currentCategoryId as string)
      .then(() => {
        this.loadCategories();
      });
      this.isModal = false;
    }
    //  else {
    //   this.categoryService.create(this.categoryForm.value).subscribe(() => {
    //     this.loadCategories();
    //   });
    // }
    else {
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
      });
    }
    this.categoryForm.reset();
    this.editStatus = false;
    this.isUploaded = false;

    this.uploadPercent = 0;
  }

  deleteCategory(category: ICategoryResponse): void {
    // this.categoryService.delete(category.id as number).subscribe(() => {
    //   this.loadCategories();
    // });
    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories();
    });
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageService.uploadFile('images', file.name, file)
      .then((data) => {
        this.categoryForm.patchValue({
          imagePath: data,
        });
        this.isUploaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteImage(): void {
    this.ImageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
