import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DataService } from '../../../core/services/data.service';
import { PersonalInfo } from '../../../core/models/personal-info.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  personalInfo$: Observable<PersonalInfo>;
  currentYear = new Date().getFullYear();

  constructor(private dataService: DataService) {
    this.personalInfo$ = this.dataService.getPersonalInfo();
  }
}
