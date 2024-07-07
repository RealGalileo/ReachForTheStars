import { _decorator, Component, Node, UITransform, Vec3, director, Canvas, Collider2D, screen, Camera } from 'cc';
const { ccclass, property } = _decorator;

import { GameCtrl } from './GameCtrl';

@ccclass('Background')
export class Background extends Component {

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
        type: Camera
    })
    public camera: Camera;

    public bgHeight1: number;
    public bgHeight2: number;
    public bgHeight3: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;
    public tempStartLocation3 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number; // should bind with the character

    onLoad() {
        this.startUp();
    }

    startUp(){
        // this.bgHeight1 = this.bg1.getComponent(UITransform).height;
        // this.bgHeight2 = this.bg2.getComponent(UITransform).height;
        this.bgHeight1 = this.bg1.getComponent(UITransform).height;
        this.bgHeight2 = this.bg2.getComponent(UITransform).height;
        this.bgHeight3 = this.bg3.getComponent(UITransform).height;

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

        //this.gameSpeed = this.gameCtrlSpeed.speed;
        let cameraBaseline = this.camera.node.getPosition().y;

        this.tempStartLocation1 = this.bg1.position;
        this.tempStartLocation2 = this.bg2.position;
        this.tempStartLocation3 = this.bg3.position;
        const screenSize = screen.windowSize;
        const halfScreenSizeY = screenSize.y / 2;
        // const diff = (screenSize.height - this.bgHeight1) / 2;
        const diff = cameraBaseline - halfScreenSizeY;
        // console.log("cameraBaseline, screenSize: ", cameraBaseline, screenSize);
        

        // this.tempStartLocation1.y -= this.gameSpeed * deltaTime;
        // this.tempStartLocation2.y -= this.gameSpeed * deltaTime;
        // this.tempStartLocation3.y -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);


        if (this.tempStartLocation1.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight1)) {
            this.tempStartLocation1.y = this.bgHeight2 + this.bgHeight3 - diff;
            console.log("resetbg1", this.tempStartLocation1);
        }

        if (this.tempStartLocation2.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight2)) {
            this.tempStartLocation2.y = this.bgHeight1 + this.bgHeight3 - diff;
            console.log("resetbg2", this.tempStartLocation2);
        }

        if (this.tempStartLocation3.y <= (cameraBaseline - halfScreenSizeY - this.bgHeight3)) {
            this.tempStartLocation3.y = this.bgHeight1 + this.bgHeight2 - diff;
            console.log("resetbg3", this.tempStartLocation3);
        }

        // console.log("bgs: ", this.tempStartLocation1, this.tempStartLocation2, this.tempStartLocation3);

        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
        this.bg3.setPosition(this.tempStartLocation3);
    }
}

