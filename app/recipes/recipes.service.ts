import { Recipe } from "../models/recipe";
import {  Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipesService{
   recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] =[
        new Recipe('Testy Shnitzel' ,
         'A super-testy shnitzel - just awesome' ,
         'https://media.blueapron.com/recipes/1454/square_newsletter_images/20151123-2051-23-9427/FP_111715_5_ChickenSchnitzel_20-_209140_20SQ_hi_res.jpg',
         [
             new Ingredient('Chiken' , 1),
             new Ingredient('French Fries' , 20),
             new Ingredient('Breadcrumbs' , 1)
         ])
         ,
         new Recipe('Big fat burger' ,
          'What else you need to say?' ,
         'https://img.buzzfeed.com/video-api-prod/assets/53125c5621bf480d8ae4f02b1cf4ea78/BFV8045_BlackBeanBurgers-Thumb1080B.jpg',
         [
             new Ingredient('Meat' , 1),
             new Ingredient('Buns' , 2),
             new Ingredient('tomato slices' , 3)
         ])
    ];
    constructor(private shoppingListService:ShoppingListService){}
    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index:number){
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())

    }
    updateRecipe(index:number , newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
    }
    deleteRecipe(index:number){
        this.recipes.splice(index , 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}