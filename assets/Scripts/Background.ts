import { _decorator, Component, Node, UITransform, Vec3, director, Canvas, Collider2D, screen, Camera } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { cameraCtrl } from './CameraCtrl';

@ccclass('Background')
export class Background extends Component {
    @property({
        type: Ground
    })
    public ground: Ground

    @property({
        type: Node,
        tooltip: 'bg 1'
    })
    public bg1: Node;

    @property({
        type: Node,
        tooltip: 'bg 2'
    })
    public bg2: Node

    @property({
        type: Node,
        tooltip: 'bg 3'
    })
    public bg3: Node

    @property({
        type: cameraCtrl
    })
    public camera: cameraCtrl;

    public bgHeight1: number;
    public bgHeight2: number;
    public bgHeight3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    onLoad() {
        this.startUp();
    }

    startUp(){
        // this.bgHeight1 = this.bg1.getComponent(UITransform).height;
        // this.bgHeight2 = this.bg2.getComponent(UITransform).height;
        this.bgHeight1 = this.bg1.getComponent(UITransform).height;
        this.bgHeight2 = this.bg2.getComponent(UITransform).height;
        this.bgHeight3 = this.bg3.getComponent(UITransform).height;
        console.log("bgHeight: ", this.bgHeight1);

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = 0;
        this.tempStartLocation3.x = 0;
        this.tempStartLocation1.y = 0;
        this.tempStartLocation2.y = this.bgHeight1;
        this.tempStartLocation3.y = - this.bgHeight1;


        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
        this.bg3.setPosition(this.tempStartLocation3);

    }


    update(deltaTime: number) {

        let cameraBaseline = this.camera.node.getPosition().y;
        let isReset: boolean = false;

        this.tempStartLocation1 = this.bg1.getPosition();
        this.tempStartLocation2 = this.bg2.getPosition();
        this.tempStartLocation3 = this.bg3.getPosition();
        const screenSize = screen.windowSize;
        const halfScreenSizeY = screenSize.y / 2;
        const diff = Math.floor(cameraBaseline - halfScreenSizeY);
        const moveUp = this.bgHeight1 + this.bgHeight2 + this.bgHeight3;
        //console.log("cameraBaseline, screenSize: ", cameraBaseline, screenSize);


        if (this.tempStartLocation1.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight1)) {
            this.tempStartLocation1.y += moveUp;
            console.log("resetbg1", this.tempStartLocation1);
            isReset = true;
        }

        if (this.tempStartLocation2.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight2)) {
            this.tempStartLocation2.y += moveUp;
            console.log("resetbg2", this.tempStartLocation2);
            isReset = true;
        }

        if (this.tempStartLocation3.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight3)) {
            this.tempStartLocation3.y += moveUp;
            console.log("resetbg3", this.tempStartLocation3);
            isReset = true;
        }

        if (isReset) {
            this.ground.setPos(cameraBaseline - halfScreenSizeY);
            isReset = false;
        }

        // console.log("bgs: ", this.tempStartLocation1, this.tempStartLocation2, this.tempStartLocation3);

        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
        this.bg3.setPosition(this.tempStartLocation3);
    }
}

