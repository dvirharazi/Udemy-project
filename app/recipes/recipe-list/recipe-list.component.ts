import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy { 
    recipes: Recipe[];
    subscription:Subscription
  constructor(private recipesService:RecipesService , private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
      this.subscription = this.recipesService.recipesChanged
      .subscribe(
          (recipes:Recipe[])=>{
            this.recipes = recipes
          }
      )
      this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'] , {relativeTo:this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

