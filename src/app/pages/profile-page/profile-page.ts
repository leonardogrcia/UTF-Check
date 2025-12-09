import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupervisorService } from '../../services/supervisor.service';
import { Supervisor } from './interface.supervisor';
import { SidebarComponent } from "../../components/sidebar/sidebar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile-page.html',
  imports: [SidebarComponent]
})
export class ProfileComponent implements OnInit {

  supervisor!: Supervisor;

  constructor(private supervisorService: SupervisorService, private router: Router) {}

  ngOnInit(): void {
    this.supervisorService.getSupervisor()
      .subscribe((data: any) => this.supervisor = data);
  }

  editarPerfil() {
    alert('Em desenvolvimento!');
  }

  handleSidebarClick(title: string) {
    this.router.navigate(['/dashbord'], { state: { openModalTitle: title } });
  }
}
