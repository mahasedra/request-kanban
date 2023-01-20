import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'app/models/kanban/board.model';
import { Column } from 'app/models/kanban/column.model';
import { IRequest, RequestState, RequestType } from 'app/interfaces/Request';
import { RequestService } from 'app/_services/request.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActService } from 'app/_services/act.service';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  tasks: any
  process: any
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
  public board!: Board


  constructor(private requestService: RequestService, private actService: ActService, private _snackBar: MatSnackBar) { }

  public async ngOnInit(): Promise<void> {
    this.tasks = await this.requestService.get();
    this.tasks.results.forEach(async (element, index) => {
      this.tasks.results[index].document_type = await this.actService.getAct(element.act).then((result) => {
        return (result.document_type)
      })
        .catch(e => { return null });
    });
    console.log("ACT", this.tasks.results)
    const requests = this.tasks.results.filter(el => !el.treatment)
    const process = this.tasks.results.filter(el => el.treatment && el.treatment !== "")
    this.board = new Board('Demandes de documents administratifs', [
      new Column('Demandes', '0', requests ? requests : this.waiting),
      new Column('En cours de traitement', '1', process ? process : this.inProgess),
      new Column('Fini', '2', this.done),
      new Column('Livré', '3', this.delivered),
    ]);
  }

  public dropGrid(event: CdkDragDrop<IRequest[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<IRequest[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // console.log("mylog", event.previousIndex, event.currentIndex);
    } else {
      const request = event.previousContainer.data[event.previousIndex]
      console.log("mylog", request)
      switch (event.container.id) {
        case '0':
        case '1':
          this.requestService.moveToInProcess(request).then((result) => {
            console.log(result)
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            this.openSnackBar("Document en cours de traitement", "bg-success")
          }).catch((e) => {
            console.log(e)
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            this.openSnackBar("Une erreur est survenu", "bg-danger")
          })
        case '2':

        case '3':

      }
    }
  }
  openSnackBar(message: string, panelClass: string | string[]) {
    this._snackBar.open(message, "Fermer", {
      duration: 3000,
      panelClass: panelClass
    });
  }

}
