import { _decorator, Component, Node, Vec3 } from 'cc';
import { cameraCtrl } from './CameraCtrl';
const { ccclass, property } = _decorator;

@ccclass('AirWall')
export class AirWall extends Component {
    @property({
        type: cameraCtrl
    })
    public camera: cameraCtrl;

    @property({
        type: Node
    })
    public leftWall: Node;

    @property({
        type: Node
    })
    public rightWall: Node;

    onLoad() {
        this.updatePos();
    }

    updatePos() {
        let newPosLeft = this.leftWall.getPosition();
        let newPosRight = this.rightWall.getPosition();
        let camPos = this.camera.node.getPosition();
        newPosLeft.y = camPos.y;
        newPosRight.y = camPos.y;
        this.leftWall.setPosition(newPosLeft);
        this.rightWall.setPosition(newPosRight);
    }

    update(deltaTime: number) {
        this.updatePos();
    }
}

