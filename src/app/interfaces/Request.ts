export enum RequestType{
    CERTIFICAT_SCOLARITE= "Certificat de Scolarité",
    RELEVE_NOTE="Relevé de notes"
}
export enum RequestState{
    WAITING= "WAITING",
    IN_PROGRESS= "IN_PROGRESS",
    DONE= "DONE",
    DELIVERED= "DELIVERED",
}
export interface IUserClient{
    email: string,
    name?: string,
    profile?: string,
}
export interface IRequest {
    id: number,
    name: string,
    type: RequestType,
    state: RequestState,
    owner?: IUserClient,
}
