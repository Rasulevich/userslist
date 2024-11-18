import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { IUser } from '../types/users.interfase';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private readonly http = inject(HttpClient)
  private readonly url = inject(API_URL);

  public getUsers():Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + 'users')
  }
  public getUserById(id: number):Observable<IUser> {
    return this.http.get<IUser>(this.url + `users/${id}`)
  }
  public createUser(user: IUser):Observable<IUser> {
    return this.http.post<IUser>(this.url + 'users', user);
  }
  public updateUser(id: number, user: IUser):Observable<IUser> {
    return this.http.put<IUser>(this.url + `users/${id}`, user);
  }
  public deleteUser(id: number) {
    return this.http.delete(this.url + `users/${id}`);
  }
}
