import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

import { DataService } from './data.service';

const es = {
  DATA: {
    PERSONAL: {
      JOB_TITLE: 'Ingeniera / Desarrolladora',
      ADDRESS: 'Madrid, España',
      NATIONALITY: 'Cubana · residencia y permiso de trabajo en España',
      SUMMARY: 'Resumen en español',
    },
    EXPERIENCE: [
      {
        position: 'Puesto ES',
        company: 'Empresa ES',
        location: 'Madrid, España',
        tasks: ['Tarea ES'],
      },
    ],
    EDUCATION: [
      {
        degree: 'Ingeniería en Ciencias Informáticas',
        institution: 'UCI',
        location: 'La Habana, Cuba',
      },
    ],
    CERTIFICATIONS: [{ name: 'Certificación ES', issuer: 'FUNDAE', mode: 'En línea' }],
    PROJECTS: [{ title: 'Proyecto ES', description: 'Descripción ES', highlight: 'Destacado ES' }],
    AWARDS: [{ title: 'Premio ES' }],
    SKILLS: {
      BACKEND: 'Backend ES',
      FRONTEND: 'Frontend ES',
      DATA: 'Datos ES',
      DEVOPS: 'DevOps ES',
      ERP: 'ERP ES',
      PROFESSIONAL: 'Competencias ES',
      PROFESSIONAL_ITEMS: ['Trabajo en equipo'],
    },
  },
};

const en = {
  DATA: {
    PERSONAL: {
      JOB_TITLE: 'Engineer / Developer',
      ADDRESS: 'Madrid, Spain',
      NATIONALITY: 'Cuban · residence and work permit in Spain',
      SUMMARY: 'Summary in English',
    },
    EXPERIENCE: [
      {
        position: 'Position EN',
        company: 'Company EN',
        location: 'Madrid, Spain',
        tasks: ['Task EN'],
      },
    ],
    EDUCATION: [
      {
        degree: 'Computer Science Engineering',
        institution: 'UCI',
        location: 'Havana, Cuba',
      },
    ],
    CERTIFICATIONS: [{ name: 'Certification EN', issuer: 'FUNDAE', mode: 'Online' }],
    PROJECTS: [{ title: 'Project EN', description: 'Description EN', highlight: 'Highlight EN' }],
    AWARDS: [{ title: 'Award EN' }],
    SKILLS: {
      BACKEND: 'Backend EN',
      FRONTEND: 'Frontend EN',
      DATA: 'Data EN',
      DEVOPS: 'DevOps EN',
      ERP: 'ERP EN',
      PROFESSIONAL: 'Professional skills EN',
      PROFESSIONAL_ITEMS: ['Teamwork'],
    },
  },
};

describe('DataService', () => {
  let service: DataService;
  let translate: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TranslateModule.forRoot()] });
    translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', es);
    translate.setTranslation('en', en);
    translate.use('es');
    service = TestBed.inject(DataService);
  });

  it('should expose the expected personal information', async () => {
    const personalInfo = await firstValueFrom(service.getPersonalInfo());

    expect(personalInfo.fullName).toBe('Beatriz Ontivero González');
    expect(personalInfo.yearsOfExperience).toBe(8);
    expect(personalInfo.email).toBe('beatrizontivero@gmail.com');
  });

  it('should expose all CV projects', async () => {
    const projects = await firstValueFrom(service.getProjects());

    expect(projects).toHaveLength(1);
    expect(projects[0].title).toBe('Proyecto ES');
  });

  it('should expose all certifications and awards', async () => {
    const certifications = await firstValueFrom(service.getCertifications());
    const awards = await firstValueFrom(service.getAwards());

    expect(certifications).toHaveLength(1);
    expect(awards).toHaveLength(1);
  });

  it('should update translated content when the language changes', async () => {
    const projectsPromise = firstValueFrom(service.getProjects());
    expect((await projectsPromise)[0].title).toBe('Proyecto ES');

    translate.use('en');
    const projectsInEnglish = await firstValueFrom(service.getProjects());
    const personalInfoInEnglish = await firstValueFrom(service.getPersonalInfo());

    expect(projectsInEnglish[0].title).toBe('Project EN');
    expect(personalInfoInEnglish.jobTitle).toBe('Engineer / Developer');
    expect(personalInfoInEnglish.summary).toBe('Summary in English');
  });
});
