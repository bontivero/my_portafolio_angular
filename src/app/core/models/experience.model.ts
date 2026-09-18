// Modelo de una experiencia laboral
export interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  startDate: string; // formato dd/mm/aaaa
  endDate: string; // formato dd/mm/aaaa o 'Actualidad'
  tasks: string[]; // logros y tareas como lista de puntos
}
