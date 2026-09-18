import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { Certification } from '../../core/models/certification.model';
import { Award } from '../../core/models/award.model';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, CarouselModule],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  certifications$: Observable<Certification[]>;
  awards$: Observable<Award[]>;

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 16,
    nav: true,
    navText: ['<', '>'],
    dots: true,
    autoplay: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  };

  constructor(private dataService: DataService) {
    this.certifications$ = this.dataService.getCertifications();
    this.awards$ = this.dataService.getAwards();
  }
}
