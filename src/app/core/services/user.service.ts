import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = `${environment.apiUrl}/users`;
    constructor(private http: HttpClient) {}

    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.apiUrl);
    }
}
