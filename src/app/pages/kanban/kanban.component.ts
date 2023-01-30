import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'app/models/kanban/board.model';
import { Column } from 'app/models/kanban/column.model';
import { RequestService } from 'app/_services/request.service';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActService } from 'app/_services/act.service';
// import { MatDialog } from '@angular/material/dialog';
// import { ConfirmModalComponent } from 'app/components/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  tasks: any
  process: any
  public board!: Board


  constructor(private requestService: RequestService, private actService: ActService, private _snackBar: MatSnackBar,
    ) { }

  public async ngOnInit(): Promise<void> {
    this.tasks = await this.requestService.get();
    this.tasks.results.forEach(async (element, index) => {
      this.tasks.results[index].document_type = await this.actService.getAct(element.act).then((result) => {
        return (result.document_type)
      })
        .catch(e => { return null });
    });
    console.log("TASKS", this.tasks.results)
    let requests = this.tasks.results.filter(el => !el.treatment)
    let process = this.tasks.results.filter(el => el.treatment && el.treatment !== "" && !el.finished && !el.delivered)
    let finished = this.tasks.results.filter(el => el.finished && (!el.delivered))
    let delivered = this.tasks.results.filter(el => el.finished && el.delivered)
    this.board = new Board('Demandes de documents administratifs', [
      new Column('Demandes', '0', requests),
      new Column('En cours de traitement', '1', process),
      new Column('Fini', '2', finished),
      new Column('Livré', '3', delivered),
    ]);
  }

  public dropGrid(event: CdkDragDrop<any>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const request = event.previousContainer.data[event.previousIndex]
      console.log("mylog", request)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let notError = true
      const action = (event.container.id).toString()
      switch (action) {
        case "0":
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
          break
        case "1":
          this.requestService.moveToInProcess(request).then((result) => {
            console.log(result)
            this.openSnackBar("Document en cours de traitement", "bg-success")
          }).catch((e) => {
            notError = false
            this.openSnackBar("Une erreur est survenu", "bg-danger")
          })
          break
        case "2":
          this.requestService.moveToFinished(request).then((result) => {
            console.log(result)
            this.openSnackBar("Document fini", "bg-success")
          }).catch((e) => {
            notError = false
            this.openSnackBar("Une erreur est survenu", "bg-danger")
          })
          break
        case "3":
          this.requestService.moveToDelivered(request).then((result) => {
            console.log(result)
            this.openSnackBar("Document livré", "bg-success")
          }).catch((e) => {
            notError = false
            this.openSnackBar("Une erreur est survenu", "bg-danger")
          })
          break
      }
      if (!notError) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
  public openSnackBar(message: string, panelClass: string | string[]) {
    this._snackBar.open(message, "Fermer", {
      duration: 3000,
      panelClass: panelClass
    });
  }

  // public openDetail(item: any) {
  //   const dialogRef = this.dialog.open(ConfirmModalComponent, {
  //     panelClass: '',
  //     data: {
  //       message: `Etes vous sur de supprimer l'espace de travail ${item.id}?`,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((inv: any) => {
  //     console.log(inv);
  //     if (inv) {
  //       // TODO if true:
  //     }
  //   });
  // }

}
