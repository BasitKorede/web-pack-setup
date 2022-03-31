import checkTask from './task-survey.js';
import descriptionOnFocus from './focus-functionality.js';
import {
  addNewItem, clearAll, updateInput, removeItem,
} from './add-remove-implementation.js';
import './style.css';

// SET TODO ARR
let toDoArr = [];
export const setToDoArr = () => {
  if (JSON.parse(localStorage.getItem('myToDos'))) {
    toDoArr = JSON.parse(localStorage.getItem('myToDos'));
  } else {
    toDoArr = [];
  }
};
setToDoArr();
const listWrap = document.querySelector('.todo-list-wrap');
// IMPLEMENT TO DO ITEMS TO SCREEN
export const implementToDoItems = (arr) => {
  arr.forEach((item) => {
    let isCompleted = '';
    let completedClass = '';
    if (item.completed) {
      isCompleted = 'checked';
      completedClass = 'completed-item';
    }
    listWrap.innerHTML += `<li class="list-item ${completedClass}" data-key="${item.index}" draggable="true">
      <div class="list-item-check-name">
         <input type="checkbox" class="check-item" data-key="${item.index}" ${isCompleted}>
  <input class="description-input" data-key="${item.index}" type="text" value="${item.description}">
      </div>
      <button type="button" data-key="${item.index}" class="move-item"><i class="fas fa-ellipsis-v"></i></button>
      <button type="button" data-key="${item.index}" class="remove-item"><i class="far fa-trash-alt"></i></button>
    </li>`;
  });
};
implementToDoItems(toDoArr);
// CHECK ITEMS
const toDoChecksInputs = [...document.querySelectorAll('.list-item .check-item')];
toDoChecksInputs.forEach((item) => item.addEventListener('change', () => checkTask(item)));
// FOCUS ITEMS
const toDoDescriptionsInputs = [...document.querySelectorAll('.list-item .description-input')];
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusin', (event) => descriptionOnFocus(event, item)));
toDoDescriptionsInputs.forEach((item) => item.addEventListener('focusout', (event) => descriptionOnFocus(event, item)));
const toDoItems = [...document.querySelectorAll('.list-item')];

// ADD ITEM
const addNewButton = document.querySelector('.add-new-btn');
addNewButton.addEventListener('click', (event) => addNewItem(event, toDoArr, toDoItems, listWrap));
// CLEAR ALL
const clearAllBtn = document.querySelector('.clear-all');
clearAllBtn.addEventListener('click', () => clearAll(listWrap));
// UPDATE ITEMS
toDoDescriptionsInputs.forEach((item) => item.addEventListener('input', () => updateInput(item)));
// REMOVE ITEM
const removeBtns = document.querySelectorAll('.remove-item');
removeBtns.forEach((item) => item.addEventListener('click', () => removeItem(item, toDoArr, listWrap)));