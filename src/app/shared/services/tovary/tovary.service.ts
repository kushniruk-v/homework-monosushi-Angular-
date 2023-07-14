import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ITovaryRequest, ITovaryResponse } from '../../interfaces/tovary/tovary-interface';
import { ActivatedRouteSnapshot,  RouterStateSnapshot } from '@angular/router';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData
} from "@angular/fire/firestore";
import { DocumentData, collection } from "@firebase/firestore"


@Injectable({
  providedIn: 'root'
})
export class TovaryService {
  private url = environment.BACKEND_URL;
  private api = { tovary: `${this.url}/tovary` };
  private tovaryCollection!: CollectionReference <DocumentData>
  constructor(private http:HttpClient,
    private AngularFireStorage:Firestore ) {
      this.tovaryCollection = collection(AngularFireStorage, 'tovary');
    }

  getAll(): Observable<ITovaryResponse[]> {
    return this.http.get<ITovaryResponse[]>(this.api.tovary);
  }
  getAllByCategory(name: string): Observable<ITovaryResponse[]> {
    return this.http.get<ITovaryResponse[]>(`${this.api.tovary}?tovary.path=${name}`);
  }

  getOne(id: number): Observable<ITovaryResponse> {
    return this.http.get<ITovaryResponse>(`${this.api.tovary}/${id}`);
  }
  create(tovar: ITovaryRequest): Observable<ITovaryResponse> {
    return this.http.post<ITovaryResponse>(this.api.tovary, tovar);
  }

  update(tovar: ITovaryRequest, id: number): Observable<ITovaryResponse> {
    return this.http.patch<ITovaryResponse>(`${this.api.tovary}/${id}`, tovar);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.tovary}/${id}`);
  }


    // ..........................................Firebase//
    getAllFirebase() {
      return collectionData(this.tovaryCollection, {idField:'id'})
   
    }
    getAllByCategoryFirebase(){
      return collectionData(this.tovaryCollection, {idField: 'id'});
    }
    getOneFirebase(id: string){
      const tovarDocumentReferens =doc(this.AngularFireStorage,`tovary/${id}`);
      return docData(tovarDocumentReferens,{idField:'id'});
    }
  createFirebase(tovar: ITovaryRequest){
      return addDoc(this.tovaryCollection,tovar);
    }
    updateFirebase(action: ITovaryRequest, id: string) {
      const tovarDocumentReferens =doc(this.AngularFireStorage,`tovary/${id}`);
      return updateDoc(tovarDocumentReferens,{...action});
    }
    deleteFirebase(id: string) {
      const tovarDocumentReferens =doc(this.AngularFireStorage,`tovary/${id}`);
      return deleteDoc(tovarDocumentReferens);
    }

}
