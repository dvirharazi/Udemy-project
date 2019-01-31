import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

    @ViewChild('f') editedForm:NgForm

    subscription:Subscription
    editMode = false;
    editItemIndex:number;
    editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService ) { }

  ngOnInit() {
      this.subscription = this.shoppingListService.startedEditing
      .subscribe((index:number)=>{
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.editedForm.setValue({
            'name': this.editedItem.name,
            'amount': this.editedItem.amount
        })
      })
  }
  onSubmitItem(form:NgForm){
      const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if(this.editMode){
        this.shoppingListService.updateIngredient(this.editItemIndex , newIngredient)
    }
    else{
    this.shoppingListService.addIngredient(newIngredient);
  }
  this.editMode = false;
  this.editedForm.reset();
  }
  onClear(){
    this.editedForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editItemIndex)
    this.onClear();
  }
  ngOnDestroy(){

  }
}
