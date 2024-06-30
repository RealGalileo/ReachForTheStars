import { _decorator, Component, Node, UITransform, Vec3, director, Canvas, Collider2D } from 'cc';
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

    public bgHeight1: number;
    public bgHeight2: number;

    public tempStartLocation1 = new Vec3;
    public tempStartLocation2 = new Vec3;

    public gameCtrlSpeed = new GameCtrl;
    public gameSpeed: number; // should bind with the character

    onLoad() {
        this.startUp();
    }

    startUp(){
        this.bgHeight1 = this.bg1.getComponent(UITransform).height;
        this.bgHeight2 = this.bg2.getComponent(UITransform).height;

        this.tempStartLocation1.x = 0;
        this.tempStartLocation2.x = 0;
        this.tempStartLocation1.y = 0;
        this.tempStartLocation2.y = this.bgHeight1;

        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);

    }


    update(deltaTime: number) {

        this.gameSpeed = this.gameCtrlSpeed.speed;

        this.tempStartLocation1 = this.bg1.position;
        this.tempStartLocation2 = this.bg2.position;

        this.tempStartLocation1.y -= this.gameSpeed * deltaTime;
        this.tempStartLocation2.y -= this.gameSpeed * deltaTime;

        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);


        if (this.tempStartLocation1.y <= (0 - this.bgHeight1)) {
            this.tempStartLocation1.y = canvas.getComponent(UITransform).height;
        }

        if (this.tempStartLocation2.y <= (0 - this.bgHeight2)) {
            this.tempStartLocation2.y = canvas.getComponent(UITransform).height;
        }

        this.bg1.setPosition(this.tempStartLocation1);
        this.bg2.setPosition(this.tempStartLocation2);
    }
}

