import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Recette} from './Recette.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlavorShareserviceService {
private apiurl="http://localhost:3000/Recette";
 

 Recettes: Recette[] = [];
constructor(private http: HttpClient) {}


getrecette():Observable<Recette[]>{
  return this.http.get<Recette[]>(this.apiurl);
}

addrecette(recette:Recette):Observable<Recette>{
  return this.http.post<Recette>(this.apiurl,recette);
}
updateRecette(id:number ,recette:Recette): Observable<Recette>{
  return this.http.put<Recette>(`${this.apiurl}/${id}`, recette)
}
deleteRecette(id: number): Observable<any> {
  return this.http.delete(`${this.apiurl}/${id}`);
}

getRecetteById(id: number): Observable<Recette> {
  const url = `${this.apiurl}/${id}`;
  console.log('Requête envoyée à :', url);
  return this.http.get<Recette>(url);
}}












  

