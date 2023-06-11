import { Component } from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {FileUploadService} from "../services/file-upload.service";
import {FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Image} from "../models/image";

@Component({
  selector: 'app-share-images',
  templateUrl: './share-images.component.html',
  styleUrls: ['./share-images.component.css']
})
export class ShareImagesComponent {
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos$: Observable<Image>;

  idFormControl = new FormControl('', [Validators.required]);

  constructor(private uploadService: FileUploadService, private snackBar: MatSnackBar) {

  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    const imageId = this.idFormControl.getRawValue();

    const image = {
      id: imageId,
      images: this.previews
    };

    this.uploadService.create(image);

    this.snackBar.open('Images uploaded', 'OK', {
      duration: 2000,
    });
  }

  searchFiles() {
    const imageId = this.idFormControl.getRawValue();
    this.imageInfos$ = this.uploadService.getImages(imageId);
  }
}
