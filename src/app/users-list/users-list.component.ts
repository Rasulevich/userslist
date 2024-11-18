import { Component, OnInit, inject } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { IUser } from '../types/users.interfase';
import { LocalStorageJwtService } from '../services/local-storage-jwt.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [UserCardComponent,CommonModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  private usersService = inject(UsersService);
  private dialog = inject(MatDialog);
  private localStore = inject(LocalStorageJwtService);
  public readonly users$ = this.usersService.users$;
  public filterFormControl = new FormControl('');

  ngOnInit(): void {
    this.initializeUsers()
    this.filterFormControl.valueChanges.subscribe((inputValue) => {
      inputValue ? this.usersService.filterUsers(inputValue) : this.initializeUsers();
    })
  }
  
  initializeUsers(): void {
    const localStorageUsers = this.localStore.getItem();
    localStorageUsers ? this.usersService.loadUsersLocalStorage(JSON.parse(localStorageUsers)) : this.usersService.loadUsers();
  }

  deleteUser(id:number) {
    this.usersService.deleteUsers(id);
  }

  openDialog(user?:IUser) {
    const isEdit = Boolean(user);
    const dialogRef = this.dialog.open(CreateEditUserComponent, {data: {user,isEdit}});

    dialogRef.afterClosed().subscribe((user:IUser) => {
      if(!user) return;
      isEdit ? this.usersService.editUser(user) : this.usersService.addUser(user);
    });
  }
}
