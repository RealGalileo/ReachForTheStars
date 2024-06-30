import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { Stars } from './Stars';

@ccclass('StarPool')
export class StarPool extends Component {
    @property({
        type: Prefab
    })
    public prefabStars = null;

    @property({
        type: Node
    })
    public starPoolHome;

    public pool = new NodePool;
    public createStar;

    initPool() {
        let initCount = 3;

        for (let i = 0; i < initCount; i++) {
            this.createStar = instantiate(this.prefabStars);

            if (i == 0) {
                this.starPoolHome.addChild(this.createStar);
            }
            else {
                this.pool.put(this.createStar);
            }
        }
    }

    addPool() {
        if (this.pool.size() > 0) {
            this.createStar = this.pool.get();
        }
        else{
            this.createStar = instantiate(this.prefabStars);
        }

        this.starPoolHome.addChild(this.createStar);
    }

    resetPool() {
        this.starPoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }

}

