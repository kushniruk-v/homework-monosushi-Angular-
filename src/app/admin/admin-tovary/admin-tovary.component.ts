import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category-interface';
import { ITovaryResponse } from 'src/app/shared/interfaces/tovary/tovary-interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { TovaryService } from 'src/app/shared/services/tovary/tovary.service';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-tovary',
  templateUrl: './admin-tovary.component.html',
  styleUrls: ['./admin-tovary.component.scss'],
})
export class AdminTovaryComponent {
  public adminTovary: Array<ITovaryResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public tovaryForm!: FormGroup;
  public isOpen = false;
  public isModal = false;
  public editStatus = false;
  private currentTovaryId!: number |string;;

  public uploadPercent!: number;
  public isUploaded = false;
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private tovaryService: TovaryService,
    private ImageService: ImageService
  ) {}
  ngOnInit(): void {
    this.initTovaryForm();
    this.loadTovary();
    this.loadCategories();
  }

  addTovary(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.isModal = true;
    } else {
      this.isModal = false;
    }
    this.uploadPercent = 0;
  }

  initTovaryForm(): void {
    this.tovaryForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
    });
  }
  loadCategories(): void {
    // this.categoryService.getAll().subscribe((data) => {
    //   this.adminCategories = data;
    //   this.tovaryForm.patchValue({
    //     category: this.adminCategories[0].id,
    //   });
    // });
    this.categoryService.getAllFirebase().subscribe((data) => {
      this.adminCategories = data as ICategoryResponse[];
      this.tovaryForm.patchValue({
        category: this.adminCategories[0].id,
      });
    });
  }
  loadTovary(): void {
    // this.tovaryService.getAll().subscribe((data) => {
    //   this.adminTovary = data;
    // });
    this.tovaryService.getAllFirebase().subscribe((data) => {
      this.adminTovary = data as ITovaryResponse[];
    });
  }

  saveTovary(): void {
    if (this.editStatus) {
      // this.tovaryService
      //   .update(this.tovaryForm.value, this.currentTovaryId)
      //   .subscribe(() => {
      //     this.loadTovary();
      //     this.isModal = false;
      //   });
      this.tovaryService
      .updateFirebase(this.tovaryForm.value, this.currentTovaryId as string)
      .then(() => {
        this.loadTovary();
        this.isModal = false;
      });
    } else {
      // this.tovaryService.create(this.tovaryForm.value).subscribe(() => {
      //   this.loadTovary();
      // });
      this.tovaryService.createFirebase(this.tovaryForm.value).then(() => {
        this.loadTovary();
      });
    }
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.tovaryForm.reset();
  }

  editTovary(tovary: ITovaryResponse): void {
    this.tovaryForm.patchValue({
      category: tovary.category,
      name: tovary.name,
      path: tovary.path,
      description: tovary.description,
      weight: tovary.weight,
      price: tovary.price,
      imagePath: tovary.imagePath,
    });

    this.currentTovaryId = tovary.id as number;
    this.editStatus = true;
    this.isModal = true;
    this.isUploaded = true;
    this.uploadPercent = 0;
  }
  deleteTovary(tovary: ITovaryResponse): void {
    // this.tovaryService.delete(tovary.id).subscribe(() => {
    //   this.loadTovary();
    // });
    this.tovaryService.deleteFirebase(tovary.id as string).then(() => {
      this.loadTovary();
    });
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.ImageService.uploadFile('images', file.name, file)
      .then((data) => {
        this.tovaryForm.patchValue({
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
        this.tovaryForm.patchValue({ imagePath: null });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  valueByControl(control: string): string {
    return this.tovaryForm.get(control)?.value;
  }
}
