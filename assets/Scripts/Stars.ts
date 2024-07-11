import { _decorator, Component, Node, Vec3, screen, find, UITransform, director, Canvas, Collider2D, BoxCollider2D, PolygonCollider2D, tween, Animation, AnimationState, AnimationClip } from 'cc';
const { ccclass, property } = _decorator;
import { Fzd } from './Fzd';
import { Results } from './Results';

const random = (min, max) => {
    return Math.random() * (max - min) + min;
}

let numOfStars = 0;

export function resetNimOfStars() {
    numOfStars = 0;
}

let highestStarY = 0;

export function resetHighestStarY() {
    highestStarY = 0;
}

let curScore = 0;
export function setCurScore(curScore_: number) {
    curScore = curScore_;
}

@ccclass('Stars')
export class Stars extends Component {
    @property({
        type: Node,
        tooltip: 'star'
    })
    public star1: Node; 

    public tempStartLocationStar1: Vec3 = new Vec3(0, 0, 0); // the higher score, the less stars

    public game;

    public starAnimation: Animation;

    public collisionHandled: boolean;

    // public screenSize = screen.windowSize;
    public screenSize = {height: 960, width: 640};
    public constPotion = this.screenSize.height / 8;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        this.initPos(numOfStars);
        numOfStars++;
        // console.log("numofStars: ", numOfStars);
        this.starAnimation = this.star1.getComponent(Animation);
    }

    initPos(starsNum) {
        let randomY;
        const collisionWid = 80;
        //console.log("screenSize", this.screenSize);
        let randomX = random( - this.screenSize.width / 2 + collisionWid, this.screenSize.width / 2 - collisionWid);
        let halfScreenSizeY = this.screenSize.height / 2;

        if (starsNum <= 5) {
            randomY = random(- halfScreenSizeY + (3 + starsNum) * this.constPotion, - halfScreenSizeY + (4 + starsNum) * this.constPotion);
        }
        else {
            let minRandom = Math.min(40 + 250 * curScore / 100, 350)
            randomY = random(minRandom, 351);
            randomY = highestStarY + randomY;
        }

        this.tempStartLocationStar1.x = randomX;
        this.tempStartLocationStar1.y = randomY;
        highestStarY = Math.max(highestStarY, randomY);
        // console.log("star created, numOfStars:", this.tempStartLocationStar1, numOfStars);
        this.star1.setPosition(this.tempStartLocationStar1);
    }

    // getWidth() {
    //     let points = this.getComponentInChildren(PolygonCollider2D).points;
    //     let left = points[0].x;
    //     let right = points[0].x;
    //     for (let i = 1; i < points.length; i++) {
    //         left = points[i].x < left ? points[i].x : left;
    //         right = points[i].x > right ? points[i].x : right;
    //     }
    //     return right - left;
    // }

    start() {
        this.starAnimation.play();
    }


    update(deltaTime) {
        // if (!this.starAnimation.isPlaying) {
        //     this.starAnimation.play();
        //     this.animating = false;
        // }
        //this.starAnimation.play();
    }
}

