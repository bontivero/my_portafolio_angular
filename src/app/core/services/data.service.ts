import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';

import { Award } from '../models/award.model';
import { Certification } from '../models/certification.model';
import { Education } from '../models/education.model';
import { Experience } from '../models/experience.model';
import { PersonalInfo } from '../models/personal-info.model';
import { Project } from '../models/project.model';
import { SkillCategory } from '../models/skill.model';

// --- Tipos auxiliares para las traducciones ---
//type TranslatedRecord = Record<string, unknown>;

interface PersonalTranslated {
  JOB_TITLE: string;
  ADDRESS: string;
  NATIONALITY: string;
  SUMMARY: string;
}

interface ExperienceTranslated {
  position: string;
  company: string;
  location: string;
  tasks: string[];
}

interface EducationTranslated {
  degree: string;
  institution: string;
  location: string;
}

interface CertificationTranslated {
  name: string;
  issuer: string;
  mode: string;
}

interface ProjectTranslated {
  title: string;
  description: string;
  highlight: string;
}

interface AwardTranslated {
  title: string;
}

interface SkillsTranslated {
  BACKEND: string;
  FRONTEND: string;
  DATA: string;
  DEVOPS: string;
  ERP: string;
  PROFESSIONAL: string;
  PROFESSIONAL_ITEMS: string[];
}

const common = {
  email: 'beatrizontivero@gmail.com',
  phone: '(+34) 624 204 790',
  linkedin: 'beatriz-ontivero-b52125350',
  photoUrl: 'assets/images/profile/profile-placeholder.jpg',
};

const experienceMeta = [
  { id: 1, startDate: '01/05/2025', endDate: '30/06/2026' },
  { id: 2, startDate: '01/01/2024', endDate: '30/04/2025' },
  { id: 3, startDate: '01/01/2023', endDate: '31/12/2023' },
  { id: 4, startDate: '01/09/2018', endDate: '31/12/2022' },
];

const educationMeta = [{ id: 1, startDate: '01/09/2013', endDate: '18/07/2018' }];

const certificationMeta = [
  {
    id: 1,
    date: '06/10/2021',
    url: 'https://drive.google.com/file/d/1lD30Y1S-sG10LWe7kha-MqBzb0pfv5sD/view?usp=drive_link',
    iconClass: 'fa-brands fa-python',
  },
  {
    id: 2,
    date: '07/04/2022',
    url: 'https://drive.google.com/file/d/10mgCccuUxdTllccMW75zsicxYRtIsDWw/view?usp=drive_link',
    iconClass: 'fa-solid fa-globe',
  },
  {
    id: 3,
    date: '12/07/2026',
    url: 'https://drive.google.com/file/d/1A1V-RufBK6_iPj55Iqkzy9uNOJJEQYJo/view?usp=drive_link',
    iconClass: 'fa-solid fa-database',
  },
  {
    id: 4,
    date: '09/08/2026',
    url: 'https://drive.google.com/file/d/174q7y_NvxmM7L8W9zjKHkE4viNAWsSa0/view?usp=drive_link',
    iconClass: 'fa-solid fa-diagram-project',
  },
];

const projectMeta = [
  { id: 1, technologies: ['Angular', 'Firebase', 'TypeScript'] },
  {
    id: 2,
    technologies: ['PySpark', 'Spark MLlib', 'FastAPI', 'MLflow', 'GitHub Actions'],
    url: 'https://github.com/bontivero/spark-ml-ci-cd.git',
  },
  { id: 3, technologies: ['Odoo', 'Python', 'PostgreSQL', 'QWeb'] },
  {
    id: 4,
    technologies: ['Python', 'Bash', 'Linux', 'Windows'],
    url: 'https://github.com/bontivero/limpieza_ficheros.git',
  },
  {
    id: 5,
    technologies: ['Python', 'Bash', 'PL/SQL'],
    url: 'https://github.com/bontivero/cdr_report_tool.git',
  },
];

const awardMeta = [
  { id: 1, date: '12/07/2026', issuer: 'FUNDAE' },
  { id: 2, date: '30/12/2024', issuer: 'ETECSA' },
  { id: 3, date: '30/12/2023', issuer: 'ETECSA' },
  { id: 4, date: '12/06/2023', issuer: 'ETECSA y HUAWEI' },
];

const technicalSkills = {
  BACKEND: [
    'Python',
    'Django',
    'Django REST Framework',
    'FastAPI',
    'Java',
    'JavaEE',
    'C',
    'C++',
    'Scala',
    'PHP',
    'PL/SQL',
    'Bash',
  ],
  FRONTEND: [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS',
    'Bootstrap',
    'AJAX',
    'XML',
    'UML',
  ],
  DATA: [
    'Oracle',
    'PostgreSQL',
    'MySQL',
    'SQLite',
    'SQLAlchemy',
    'ETL',
    'PySpark',
    'Spark MLlib',
    'Big Data',
    'MLflow',
    'NumPy',
    'Pandas',
    'Matplotlib',
    'Keras',
    'Pytest',
  ],
  DEVOPS: [
    'Docker',
    'Git',
    'GitHub',
    'GitHub Actions',
    'Linux',
    'Windows',
    'Windows Server',
    'Nginx',
    'Proxmox',
    'VS Code',
    'NetBeans',
    'Eclipse',
    'IntelliJ',
    'PyCharm',
  ],
  ERP: [
    'Odoo ERP',
    'QWeb',
    'Hexadecimal binary files',
    'REST APIs',
    'Firebase',
    'Tkinter',
    'SOLID principles',
    'Clean Code',
    'Clean Architecture',
    'Scrum',
    'Kanban',
  ],
};

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private readonly translate: TranslateService) {}

  getPersonalInfo(): Observable<PersonalInfo> {
    return this.translate.stream('DATA.PERSONAL').pipe(
      map((data: PersonalTranslated) => ({
        ...common,
        fullName: 'Beatriz Ontivero González',
        yearsOfExperience: 8,
        jobTitle: data.JOB_TITLE,
        address: data.ADDRESS,
        nationality: data.NATIONALITY,
        summary: data.SUMMARY,
      })),
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.translate
      .stream('DATA.EXPERIENCE')
      .pipe(
        map((items: ExperienceTranslated[]) =>
          items.map((item, index) => ({ ...experienceMeta[index], ...item })),
        ),
      );
  }

  getEducation(): Observable<Education[]> {
    return this.translate
      .stream('DATA.EDUCATION')
      .pipe(
        map((items: EducationTranslated[]) =>
          items.map((item, index) => ({ ...educationMeta[index], ...item })),
        ),
      );
  }

  getCertifications(): Observable<Certification[]> {
    return this.translate.stream('DATA.CERTIFICATIONS').pipe(
      map((items: CertificationTranslated[]) =>
        items.map((item, index) => ({
          ...certificationMeta[index],
          ...item,
          date: certificationMeta[index].date,
        })),
      ),
    );
  }

  getProjects(): Observable<Project[]> {
    return this.translate
      .stream('DATA.PROJECTS')
      .pipe(
        map((items: ProjectTranslated[]) =>
          items.map((item, index) => ({ ...projectMeta[index], ...item })),
        ),
      );
  }

  getAwards(): Observable<Award[]> {
    return this.translate
      .stream('DATA.AWARDS')
      .pipe(
        map((items: AwardTranslated[]) =>
          items.map((item, index) => ({ ...awardMeta[index], ...item })),
        ),
      );
  }

  getSkills(): Observable<SkillCategory[]> {
    return this.translate.stream('DATA.SKILLS').pipe(
      map((data: SkillsTranslated) => [
        { category: data.BACKEND, items: technicalSkills.BACKEND },
        { category: data.FRONTEND, items: technicalSkills.FRONTEND },
        { category: data.DATA, items: technicalSkills.DATA },
        { category: data.DEVOPS, items: technicalSkills.DEVOPS },
        { category: data.ERP, items: technicalSkills.ERP },
        { category: data.PROFESSIONAL, items: data.PROFESSIONAL_ITEMS },
      ]),
    );
  }
}
