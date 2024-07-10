import { _decorator, Camera, Component, log, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    onLoad() {
        this.resetPos();
    }

    setPos(y: number) {
        let newPos = this.node.getPosition();
        newPos.y = y;
        this.node.setPosition(newPos);
    }

    resetPos() {
        let newPos = new Vec3(0, 0, 0);
        this.node.setPosition(newPos);
    }

    update(deltaTime: number) {
        
    }
}

