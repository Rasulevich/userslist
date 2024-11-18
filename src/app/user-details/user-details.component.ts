import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  private usersService = inject(UsersService);
  public readonly user$ = this.usersService.user$;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId !== null) {
        this.usersService.getUser(+userId);
    } else {
        console.error('userId is null');
    }
  }

  public goBack(): void {
    this.router.navigate(['/']); 
  }
}
