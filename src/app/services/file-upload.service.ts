import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {addDoc, collection, collectionData, doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {Image} from "../models/image";
import {debounceTime, last, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {


  constructor(private store: Firestore) {
  }

  create(image: Image) {
    return setDoc(doc(this.store, 'images', image.id), image);
  }

  getImages(id: string) {
    const imagesDocumentReference = doc(this.store, `images/${id}`);
    const data = docData(imagesDocumentReference) as Observable<Image>;

    return data;
  }
}
