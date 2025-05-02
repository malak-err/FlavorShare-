import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FlavorShareserviceService } from '../flavor-shareservice.service';
import { Recette } from '../Recette.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  recette: Recette | undefined;
  errorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private flavorService: FlavorShareserviceService,
    private location: Location
  ) {}

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
      error: (error) => {
        console.error('Erreur lors du chargement de la recette :', error);
        this.errorMessage = error.status === 404
          ? 'Recette non trouvée. Vérifiez l\'ID.'
          : 'Une erreur s\'est produite lors du chargement de la recette.';
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}