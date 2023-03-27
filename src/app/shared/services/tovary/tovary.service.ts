import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ITovaryRequest, ITovaryResponse } from '../../interfaces/tovary/tovary-interface';


@Injectable({
  providedIn: 'root'
})
export class TovaryService {
  private url = environment.BACKEND_URL;
  private api = { tovary: `${this.url}/tovary` };
  constructor(private http:HttpClient) {}

  getAll(): Observable<ITovaryResponse[]> {
    return this.http.get<ITovaryResponse[]>(this.api.tovary);
  }
  getAllByCategory(name: string): Observable<ITovaryResponse[]> {
    return this.http.get<ITovaryResponse[]>(`${this.api.tovary}?category.path=${name}`);
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
}
