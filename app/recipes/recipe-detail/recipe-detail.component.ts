import { Component, OnInit} from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
     recipe:Recipe;
     id:number;
  constructor(private recipesService:RecipesService , private route:ActivatedRoute , 
    private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params:Params)=>{
           this.id = +params['id'];
           this.recipe = this.recipesService.getRecipe(this.id);
        }
    )
  }

  addToShoppingList(){
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'] , {relativeTo:this.route});
    // this.router.navigate(['../' , this.id , 'edit'] , {relativeTo:this.route})
  }
  onDelete(){
      this.recipesService.deleteRecipe(this.id);
      this.router.navigate(['/recipes'])
  }
}
