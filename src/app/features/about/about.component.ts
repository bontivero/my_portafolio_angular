import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { PersonalInfo } from '../../core/models/personal-info.model';
import { Education } from '../../core/models/education.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  personalInfo$: Observable<PersonalInfo>;
  education$: Observable<Education[]>;

  constructor(private dataService: DataService) {
    this.personalInfo$ = this.dataService.getPersonalInfo();
    this.education$ = this.dataService.getEducation();
  }
}
