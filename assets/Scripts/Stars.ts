import { _decorator, Component, Node, Vec3, screen, find, UITransform, director, Canvas, Collider2D, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

let numOfStars = 0;

@ccclass('Stars')
export class Stars extends Component {
    @property({
        type: Node,
        tooltip: 'star'
    })
    public star1: Node; 

    public tempStartLocationStar1: Vec3 = new Vec3(0, 0, 0); // the higher score, the less stars

    public game;

    public screenSize = screen.windowSize;
    public constPotion = this.screenSize.height / 6;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.initPos(numOfStars);
        numOfStars++;
        console.log("numofStars: ", numOfStars);
    }

    initPos(starsNum) {
        let randomY;
        const collisionSize = this.getComponentInChildren(BoxCollider2D).size;
        let randomX = random( - this.screenSize.width / 2, this.screenSize.width / 2 - collisionSize.width);

        if (starsNum <= 5) {
            // const lowestY = 250;
            // let randomX = this.screenSize.width / 2;
            // let randomY = this.screenSize.height / 2;
            // this.tempStartLocationStar1.x = -320;// according to difficult level
            // this.tempStartLocationStar1.y = -480;
            // this.tempStartLocationStar1.x = random(- randomX, randomX - collisionSize.width);
            // this.tempStartLocationStar1.y = random(-randomY + 150, randomY);

            randomY = random(- this.screenSize.height / 2 + starsNum * this.constPotion, - this.screenSize.height / 2 + (1 + starsNum) * this.constPotion);
        }
        else {
            randomY = random(this.screenSize.height / 2, this.screenSize.height / 2 + 100);
        }

        this.tempStartLocationStar1.x = randomX;
        this.tempStartLocationStar1.y = randomY;
        console.log("star created:", this.tempStartLocationStar1);
        this.star1.setPosition(this.tempStartLocationStar1);
    }

    update(deltaTime) {
        // this.tempSpeed = this.starSpeed * deltaTime;
        // this.tempStartLocationStar1 = this.star1.position;
        // this.tempStartLocationStar1.y -= this.tempSpeed;
        // this.star1.setPosition(this.tempStartLocationStar1);

        // if(touched) {
        //     this.game.getStar();
        //     this.destroy();
        // }

        if(this.star1.getPosition().y <= 0) {
            this.destroy();
        }

    }
// maybe should write destroy function
}

