import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FlavorShareserviceService } from '../flavor-shareservice.service';
import { Recette } from '../Recette.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  recette: Recette | undefined;
  errorMessage: string | undefined;
  recetteForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private flavorService: FlavorShareserviceService,
    private location: Location,
    private fb: FormBuilder,
    private router: Router
  ) {

    
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
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadRecette(id);
    } else {
      this.errorMessage = 'ID de recette invalide.';
    }
  }

  loadRecette(id: number): void {
    this.flavorService.getRecetteById(id).subscribe({
      next: (data: Recette) => {
        this.recette = data;
        this.errorMessage = undefined;
        console.log('Recette chargée :', this.recette);
      },
     
    });
  }

  openEditModal(): void {
    if (this.recette) {
     
      this.recetteForm.patchValue({
        id: this.recette.id,
        nom: this.recette.nom,
        ingredient: this.recette.ingredient,
        etapes: this.recette.etapes,
        image: this.recette.image,
        category: this.recette.category
      });
      const modal = document.getElementById('editRecetteModal');
      if (modal) {
        const modalInstance = new (window as any).bootstrap.Modal(modal);
        modalInstance.show();
      }
    }
  }

  closeEditModal(): void {
    const modal = document.getElementById('editRecetteModal');
    if (modal) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
      modalInstance?.hide();
    }
    this.recetteForm.reset();
  }

  onUpdate(): void {
    if (this.recetteForm.valid) {
      const updatedRecette: Recette = this.recetteForm.value;
      this.flavorService.updateRecette(updatedRecette.id, updatedRecette).subscribe({
        next: () => {
          this.loadRecette(updatedRecette.id); 
          this.closeEditModal();
        
          this.router.navigate(['/home', updatedRecette.id]);
        },
      
      });
    }
  }

  deleterecette(id: number): void {
    this.flavorService.deleteRecette(id).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
   
    });
  }

  goBack(): void {
    this.location.back();
  }
}