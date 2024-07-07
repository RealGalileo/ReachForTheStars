import { _decorator, Component, misc, Node, Vec3 } from 'cc';
import { Fzd } from './Fzd';
const { ccclass, property } = _decorator;

@ccclass('cameraCtrl')
export class cameraCtrl extends Component {
    @property({
        type: Fzd
    })
    public fzd: Fzd;

    update(deltaTime: number) {
        let targetPos = this.fzd.node.getPosition();
        let currentPos = this.node.getPosition();
        //let targetPos = new Vec3(0, 0, 0);
        targetPos.x = 0;
        targetPos.y = Math.max(0, targetPos.y);
        targetPos.z = 1000;

        currentPos.lerp(targetPos, 0.1);
        // console.log(currentPos);

        this.node.setPosition(currentPos);
    }
}

