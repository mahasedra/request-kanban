import { IRequest } from "app/interfaces/Request";

export class Column {
    constructor(public name: string, public id: string, public tasks: IRequest[]) { }
}
