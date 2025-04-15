  import { NgFor, NgIf, NgStyle } from '@angular/common';
  import { Component,OnInit  } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { Router } from '@angular/router';


  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [FormsModule,NgIf,NgFor,NgStyle],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
  })
  export class DashboardComponent implements OnInit {
    dropdown = false;
    activeitem: string | null = null;
    username: string = '';
    password: string = '';
    projects: any[] = [];
    paginationpage: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 5;

    constructor(private router: Router) {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        this.username = parsedUser.name;
      } else {
        this.router.navigate(['/']);
      }
    }
    ngOnInit() {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          if (!response.ok) {
            throw new Error('response not ok');
          }
          return response.json();
        })
        .then(data => {
          this.projects = data;
          console.log(data)
          this.updatepage();
        })
        .catch(error => {
          console.error('error', error);
        });
    }
    updatepage() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginationpage = this.projects.slice(start, end);
    }    
    goToPage(page: number) {
      if (page >= 1 && page <= 3) {  
        this.currentPage = page;
        this.updatepage();
      }
    }    
    Dropdown() {
      this.dropdown = !this.dropdown;
    }
    onLogout() {
      localStorage.removeItem('authUser');
      this.router.navigate(['/']);
    }
    select(item: string) {
      this.activeitem = this.activeitem === item ? null : item;
    }
  }
  
