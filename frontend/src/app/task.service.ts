import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private WebRequestService: WebRequestService) { }

  createList(title: string){
  //we want to send a web request  to create a list
  return this.WebRequestService.post('lists',{ title });
  }

  getLists(){
    return this.WebRequestService.get('lists');

  }

  getTasks(listId: string){
    return this.WebRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string){
    //we want to send a web request  to create a list
    return this.WebRequestService.post(`lists/${listId}/tasks`,{ title });
    }

    complete(task: Task){
      return this.WebRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
        completed: !task.completed
      });
    }
}
