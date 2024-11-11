import {Car} from "./car"
import {Book} from "./books"
import {Task} from "./tasks"

export type StateObject<T> = {
    label: string;
    state: T;
    setState: React.Dispatch<React.SetStateAction<T>>;
};

export type CRUDProps<T extends Car | Task | Book, CreateT> = {
    getItems: () => Promise<{ data: T[] }>;
    createItem: (item: CreateT) => Promise<void>;
    updateItem: (item: CreateT, id: string) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    itemStates: StateObject<string>[]; 
    itemsList: T[];                    
    setItemsList: (items: T[]) => void;
};
