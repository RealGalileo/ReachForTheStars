import { _decorator, CCInteger, Component, UITransform, input, Node, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact, Canvas, PhysicsSystem2D, BoxCollider2D, Sprite, Camera, isValid } from 'cc';
const { ccclass, property } = _decorator;
import { Background } from './Background';
import { Results } from './Results';
import { Fzd } from './Fzd';
import { StarPool } from './StarPool';
import { resetNimOfStars, resetHighestStarY, setCurScore, Stars } from './Stars';
import { Ground } from './Ground';
import { cameraCtrl } from './CameraCtrl';


@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: Ground
    })
    public ground: Ground;

    @property({
        type: Background
    })
    public bg: Background;

    @property({
        type: cameraCtrl
    })
    public cam: cameraCtrl;

    @property({
        type: CCInteger
    })
    public starsSpeed: number = 200;

    @property({
        type: Fzd
    })
    public fzd: Fzd;

    @property({
        type: StarPool,
    })
    public starQueue: StarPool

    @property({
        type: Results,
        tooltip: 'results'
    })
    public result: Results

    public isOver: boolean;
    public firstJump: boolean;

    onLoad() {
        this.initListener();

        this.result.resetScore();
        this.isOver = true;
        this.firstJump = false;
        director.pause();
    }

    initListener() {

        input.on(Input.EventType.TOUCH_START, (e)=> {

            if (this.isOver == true) {
                this.resetGame();
                this.fzd.resetFzd();
                this.startGame();
                this.fzd.fly();
            }
            else {
                const scene = director.getScene();
                const canvas = scene.getComponentInChildren(Canvas);
                let mouseX = e.touch.getLocationX() - (canvas.getComponent(UITransform).width / 2);
                //console.log("locationX: ", mouseX);
                let fzdCurPosX = this.fzd.node.getPosition().x;
                //console.log("mouseX, fzdPosX: ", mouseX, fzdCurPosX);
                this.fzd.moveTo(Math.max(Math.min(mouseX, canvas.getComponent(UITransform).width / 2), - canvas.getComponent(UITransform).width / 2));
            }
        })

        input.on(Input.EventType.TOUCH_MOVE, (e)=>{
            if (this.isOver == true) {
                this.resetGame();
                this.fzd.resetFzd();
                this.startGame();
                this.fzd.fly();
            }
            else {
                const scene = director.getScene();
                const canvas = scene.getComponentInChildren(Canvas);
                let mouseX = e.touch.getLocationX() - (canvas.getComponent(UITransform).width / 2);
                let fzdCurPosX = this.fzd.node.getPosition().x;
                //console.log("mouseX, fzdPosX: ", mouseX, fzdCurPosX);
                this.fzd.moveTo(Math.max(Math.min(mouseX, canvas.getComponent(UITransform).width / 2), - canvas.getComponent(UITransform).width / 2));
            }
        })
    }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        resetNimOfStars();
        resetHighestStarY();
        setCurScore(0);
        this.ground.resetPos();
        this.bg.startUp();
        this.cam.resetPos()
        this.starQueue.resetPool();
        this.isOver = false;
        this.firstJump = false;
        this.startGame();
    }

    startGame() {
        this.result.hideResults();
        director.resume();
    }

    createStar() {
        console.log("createStar");
        let numOfNewStar = Math.random() > 0.9 ? 2 : 1;
        while (numOfNewStar > 0) {
            this.starQueue.addPool();
            numOfNewStar--;
        }
    }

    contact() {
        let collider= this.fzd.getComponent(Collider2D);

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        console.log("onBeginContact");
        if (otherCollider.node.isValid){
            let colliderTag = otherCollider.tag;
            if (colliderTag == 1) { // ground
                this.fzd.hitGround = true;
            }
            else if (colliderTag == 2){ //star
                //this.collisionNotHandled = true;
                //console.log("collider node: ", otherCollider.node.isValid);
                let starObj = otherCollider.node.getParent().getComponent(Stars);
                if (starObj.collisionHandled) {
                    return;
                }
                starObj.collisionHandled = true;
                setTimeout(function() {
                    starObj.collisionHandled = false;
                    if (otherCollider && otherCollider.node && otherCollider.node.isValid) {
                        console.log("destroy node");
                        otherCollider.node.destroy();
                        this.fzd.fly();
                        this.createStar();
                    }
                }.bind(this), 0);
                this.result.addScore();
                setCurScore(this.result.currentScore);
            }
        }
    }

    fzdStruck() {
        this.contact();

        if (this.fzd.hitGround == true) {
            this.gameOver();
        }
    }

    update() {
        //console.log(this.fzd.node.getPosition());
        if (this.isOver == false) {
            this.fzdStruck();
        }
    }
}


export function getCollisionManager() {
    throw new Error('Function not implemented.');
}

