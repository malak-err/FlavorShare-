import { Component, OnInit } from '@angular/core';
import { FlavorShareserviceService } from '../flavor-shareservice.service';
import { Recette } from '../Recette.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recettes: Recette[] = [];
  recetteForm: FormGroup;

  constructor(private recetteService: FlavorShareserviceService, private fb: FormBuilder) {
    this.recetteForm = this.fb.group({
      id: ['', Validators.required],
      nom: ['', Validators.required],
      ingredient: ['', Validators.required],
      etapes: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRecettes();
  }

  loadRecettes(): void {
    this.recetteService.getrecette().subscribe({
      next: (data) => {
        this.recettes = data;
      },
     
    });
  }

  openModal(): void {
    const modal = document.getElementById('addRecetteModal');
    if (modal) {
      const modalInstance = new (window as any).bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  onSubmit(): void {
    if (this.recetteForm.valid) {
      const recette: Recette = this.recetteForm.value;
      this.recetteService.addrecette(recette).subscribe({
        next: () => {
          this.loadRecettes();
          this.recetteForm.reset();
          this.closeModal();
        },
      
      });
    }
  }

  closeModal(): void {
    const modal = document.getElementById('addRecetteModal');
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
  }
}