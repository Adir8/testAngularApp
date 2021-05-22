import { Action } from '@ngrx/store';
import { AppState } from './app.state';
import {dataModel} from './data.model';

export const UPDATE_DATA = 'UPDATE_DATA';

export const initialState = {
    lines: [],
    bars: [],
    bubbles: []
};

export function updateDataReducer(state: dataModel = initialState, action : any) {
  switch (action.type) {
    case UPDATE_DATA:
        return action.payload;
    default:
        return state;
    }
 }