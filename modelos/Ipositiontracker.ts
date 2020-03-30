import {  ICoordinates } from './coordenads';

export interface Ipositiontracker {
    subscribe( onNewPosition: (coord:ICoordinates) => void):void;
}