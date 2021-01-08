import {Countries, Player } from "./player";

export interface Team{
    $key ?:string;
    name:string;
    country:Countries;
    players:Player[]|null; //agregue la posibilidad de ser null porque sino tiraba error en teamtablecomponent.ts
}