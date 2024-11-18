import { Injectable, inject } from '@angular/core';
import { IUser } from '../types/users.interfase';
import { UsersApiService } from './users-api.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorageJwtService } from './local-storage-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private usersApi = inject(UsersApiService);
  private localStore = inject(LocalStorageJwtService);

  private subjectUsers = new BehaviorSubject<IUser[]>([]);
  public users$ = this.subjectUsers.asObservable();

  private subjectUser = new Subject<IUser>();
  public user$ = this.subjectUser.asObservable();

  public loadUsers() {
    this.usersApi.getUsers().subscribe((users:IUser[]) => {
      this.subjectUsers.next(users);
      this.localStore.setItem(JSON.stringify(users));
    });
  }

  public getUser(id:number) {
    this.usersApi.getUserById(id).subscribe((user:IUser) => {
      this.subjectUser.next(user);
    });
  }

  public loadUsersLocalStorage(users:IUser[]) {
    this.subjectUsers.next(users)
  }

  public deleteUsers(id: number) {
    this.usersApi.deleteUser(id).subscribe(() => {
      this.subjectUsers.next(this.subjectUsers.value.filter(user => user.id !== id));
  });
  }

  public addUser(newUser:IUser) {
    this.usersApi.createUser(newUser).subscribe((user:IUser) => {
      this.subjectUsers.next([...this.subjectUsers.value,user]);
      this.localStore.setItem(JSON.stringify(this.subjectUsers.value));
    })
  }

  public editUser(user:IUser) {
    this.usersApi.updateUser(user.id, user).subscribe((user: IUser) => {
      this.subjectUsers.next(this.subjectUsers.value.map(el=> el.id === user.id ? user : el));
      this.localStore.setItem(JSON.stringify(this.subjectUsers.value));
    })
  }

  public filterUsers(value: string) {
    const filteredUsers = this.subjectUsers.value.filter(user => 
      user.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    this.subjectUsers.next(filteredUsers);
  }
}
