import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'app/models/kanban/board.model';
import { Column } from 'app/models/kanban/column.model';
import { IRequest, RequestState, RequestType } from 'app/interfaces/Request';
import { RequestService } from 'app/_services/request.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  tasks: IRequest[] = []
  public waiting: IRequest[] = [
    {
      id: 1,
      name: 'Demande de certificat de scolarité',
      state: RequestState.WAITING,
      type: RequestType.CERTIFICAT_SCOLARITE
    },
    {
      id: 2,
      name: 'Demande de certificat de scolarité',
      state: RequestState.WAITING,
      type: RequestType.CERTIFICAT_SCOLARITE
    }
  ]
  private inProgess: IRequest[] = [
    {
      id: 3,
      name: 'Demande de certificat de scolarité',
      state: RequestState.IN_PROGRESS,
      type: RequestType.CERTIFICAT_SCOLARITE
    },
    {
      id: 4,
      name: 'Demande de certificat de scolarité',
      state: RequestState.IN_PROGRESS,
      type: RequestType.CERTIFICAT_SCOLARITE
    }
  ]

  private done: IRequest[] = [
    {
      id: 5,
      name: 'Demande de certificat de scolarité',
      state: RequestState.DONE,
      type: RequestType.CERTIFICAT_SCOLARITE
    },
    {
      id: 6,
      name: 'Demande de certificat de scolarité',
      state: RequestState.DONE,
      type: RequestType.CERTIFICAT_SCOLARITE
    }
  ]
  private delivered: IRequest[] = [
    {
      id: 7,
      name: 'Demande de certificat de scolarité',
      state: RequestState.DELIVERED,
      type: RequestType.CERTIFICAT_SCOLARITE
    },
    {
      id: 8,
      name: 'Demande de certificat de scolarité',
      state: RequestState.DELIVERED,
      type: RequestType.CERTIFICAT_SCOLARITE
    }
  ]

  public board: Board = new Board('Demandes de documents administratifs', [
    new Column('Demandes', '0', this.waiting),
    new Column('En cours de traitement', '1', this.inProgess),
    new Column('Fini', '2', this.done),
    new Column('Livré', '3', this.delivered),
  ]);

  constructor(private requestService: RequestService) { }

  public async ngOnInit(): Promise<void> {
    this.tasks = await this.requestService.get();
    console.log(this.board);
  }

  public dropGrid(event: CdkDragDrop<IRequest[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);

  }

  public drop(event: CdkDragDrop<IRequest[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // console.log("mylog", event.previousIndex, event.currentIndex);
    } else {
      console.log("mylog", typeof event.container.id);
      let state: RequestState = null
        switch (event.container.id) {
          case '0':
            state= RequestState.WAITING;
          case '1':
            state= RequestState.IN_PROGRESS;
          case '2':
            state= RequestState.DONE;
          case '3':
            state= RequestState.DELIVERED;
        }
      
      const request = {
        ...event.previousContainer.data[event.previousIndex],
        state
      }
      this.requestService.update(request).then((result)=>{
        console.log(result)
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }).catch((e)=> {
        console.log(e)
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        // transferArrayItem(event.previousContainer.data,
        //   event.previousContainer.data,
        //   event.previousIndex,
        //   event.previousIndex);
      })
    }
  }

}
