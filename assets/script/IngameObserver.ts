export interface Observer {
    /** 파라미터는 객체 안에 넣어서 전달할 것 */
    notify(objs): void;
}

export class IngameObserver {
    private observers: Array<Observer> = [];

    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    deleteObserver(observer: Observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
    }

    notify(objs) {
        for (let i = this.observers.length; i--;) {
            this.observers[i].notify && this.observers[i].notify(objs);
        }
    }
}