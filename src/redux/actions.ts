import { AnyAction, Dispatch } from "redux";
import { ActionTypes } from "./actionTypes";
import { CalendarItemModel } from "../models/CalendarItemModel";
import { database } from '../database/dataconnection';

export function doLoadCalendar(yearMonthId: number) {
    return (dispatch: Dispatch) => {
        return database.ref(`calendars/${yearMonthId}`)
            .once('value')
            .then((snapshot: firebase.database.DataSnapshot) => {
                let items: any[] = [];
                snapshot.forEach((childSnapshot: firebase.database.DataSnapshot) => {
                    items.push(childSnapshot.val());
                });
                dispatch(loadCalendar(items, yearMonthId));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}

export function doSaveCalendar(calendarItem: CalendarItemModel, yearMonthId: number) {
    return (dispatch: Dispatch) => {
        return database.ref(`calendars/${yearMonthId}`)
            .update({ [calendarItem.id]: calendarItem })
            .then(() => {
                dispatch(saveCalendar(calendarItem));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }
}

function loadCalendar(items: any[], yearMonthId: number): AnyAction {
    return {
        type: ActionTypes.LOAD_CALENDARITEMS,
        yearMonthId,
        items
    }
}

function saveCalendar(item: CalendarItemModel): AnyAction {
    return {
        type: ActionTypes.SAVE_CALENDARITEM,
        item
    }
}

export function updateFilter(yearMonthId: number): AnyAction {
    return {
        type: ActionTypes.UPDATE_FILTER,
        yearMonthId
    }
}