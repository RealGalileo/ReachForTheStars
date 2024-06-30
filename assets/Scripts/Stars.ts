import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Stars')
export class Stars extends Component {
    @property({
        type: Node,
        tooltip: 'star'
    })
    public star1: Node; // node in vector?

    public tempStartLocationStar1: Vec3 = new Vec3(0, 0, 0); // the higher score, the less stars
    public scene = screen.windowSize;

    public game;
    public starSpeed: number; // star speed, always the same as the fzd speed
    public tempSpeed: number;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.starSpeed = this.game.starsSpeed;
        this.initPos();
    }

    initPos() {
        this.tempStartLocationStar1.x = random(0, this.scene.width);//according to difficult level
        this.tempStartLocationStar1.y = random(0, this.scene.height);
        console.log("star created");
        console.log(this.tempStartLocationStar1);

        this.star1.setPosition(this.tempStartLocationStar1);
    }

    update(deltaTime) {
        this.tempSpeed = this.starSpeed * deltaTime;
        this.tempStartLocationStar1 = this.star1.position;
        this.tempStartLocationStar1.y -= this.tempSpeed;
        this.star1.setPosition(this.tempStartLocationStar1);

        // if(touched) {
        //     this.game.getStar();
        //     this.destroy();
        // }

        if(this.star1.position.y <= 0) {
            this.destroy();
        }

    }
}

