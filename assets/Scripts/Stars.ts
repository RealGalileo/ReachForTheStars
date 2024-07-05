import { _decorator, Component, Node, Vec3, screen, find, UITransform, director, Canvas, Collider2D, BoxCollider2D } from 'cc';
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

    public game;
    public starSpeed: number; // star speed, always the same as the fzd speed
    public tempSpeed: number;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.starSpeed = this.game.starsSpeed;
        this.initPos();
    }

    initPos() {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const collisionSize = this.getComponentInChildren(BoxCollider2D).size;
        let randomX = canvas.getComponent(UITransform).width / 2;
        let randomY = canvas.getComponent(UITransform).height / 2;
        // this.tempStartLocationStar1.x = 80;// according to difficult level
        // this.tempStartLocationStar1.y  = 50;
        this.tempStartLocationStar1.x = random(- randomX, randomX - collisionSize.width);
        this.tempStartLocationStar1.y = random(-randomY, randomY);
        console.log("star created:", this.tempStartLocationStar1);

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
// maybe should write destroy function
}

