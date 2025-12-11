import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CharactersList} from './components/characters-list/characters-list';
import {CharacterService} from './shared/services/character';
import {Characters} from './shared/models/characters.model';
import {ContinentsService} from './shared/services/continents-service';
import {Continents} from './shared/models/continents.model';
import {ContinentsList} from './components/continents-list/continents-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CharactersList, ContinentsList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  // On injecte les services précédemment créé.
  private charactersService = inject(CharacterService);
  private continentsService = inject(ContinentsService);
  private cdr = inject(ChangeDetectorRef);

  // On stock tous les personnages dans un tableau.
  protected charactersToGiveToChild!: Characters[];
  protected continentsToGiveToChild!: Continents[];
  protected filteredCharacters!: Characters[];

  // On subscribe() uniquement sur les Observables.
  ngOnInit() {
    this.getCharactersInTemplate();
    this.getAllContinentsInTemplate();
  }

  protected onSearch(term: string) : void {
    this.filteredCharacters = this.charactersToGiveToChild.filter((character: Characters) => {
      const fullName = character.fullName ?? '';
      return fullName.toLowerCase().includes(term.toLowerCase())
    })
  }

  private getAllContinentsInTemplate () {
    this.continentsService.getAllContinents().subscribe((continentsFromApi: Continents[]) => {
      this.continentsToGiveToChild = continentsFromApi;
      this.cdr.detectChanges();
    })
  }

  private getCharactersInTemplate () {
    this.charactersService.getCharacters().subscribe((charactersFromApi: Characters[]) => {
      this.charactersToGiveToChild = charactersFromApi;
      this.filteredCharacters = charactersFromApi;
      this.cdr.detectChanges();
    })
  }
}
