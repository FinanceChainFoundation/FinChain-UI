import BaseStore from "./BaseStore";
import alt from "alt-instance";
import Immutable from "immutable";

class PresaleStore extends BaseStore {
    constructor() {
        super();

        this.presales = Immutable.Map();
    }
}

export default alt.createStore(PresaleStore, "PresaleStore");