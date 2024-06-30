import { _decorator, CCInteger, Component, UITransform, input, Node, Input, EventKeyboard, KeyCode, director, Contact2DType, Collider2D, IPhysics2DContact, Canvas, PhysicsSystem2D, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;
import { Background } from './Background';
import { Results } from './Results';
import { Fzd } from './Fzd';
import { StarPool } from './StarPool';

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public starsSpeed: number = 200;//the same as fzd

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

    onLoad() {
        this.initListener();

        this.result.resetScore();
        this.isOver = true;
        director.pause();
    }

    initListener() {
        //input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        this.node.on(Node.EventType.TOUCH_START, ()=> {

            // if (this.isOver == true) {
            //     this.resetGame();
            //     this.fzd.resetFzd();
            //     this.startGame();
            // }
            if (this.isOver == false) {
                this.fzd.fly();
            }
            // todo: move
        })

        this.node.on(Node.EventType.TOUCH_MOVE, (e)=>{
            if (this.isOver == true) {
                this.resetGame();
                this.fzd.resetFzd();
                this.startGame();
            }
            else {
                const scene = director.getScene();
                const canvas = scene.getComponentInChildren(Canvas);
                let mouseX = e.touch.getLocationX() - (canvas.getComponent(UITransform).width / 2);
                console.log("locationX: ", mouseX);
                // if (mouseX > this.fzd.fzdLocation.x) {
                //     this.fzd.moveHorizonal(10);
                // }
                // else if (mouseX < this.fzd.fzdLocation.x){
                //     this.fzd.moveHorizonal(-10);
                // }
                this.fzd.moveTo(Math.max(Math.min(mouseX, canvas.getComponent(UITransform).width / 2), - canvas.getComponent(UITransform).width / 2));
            }
        })
    }

    // onKeyDown(event: EventKeyboard) {
    //     switch(event.keyCode){
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //         break;
    //         case KeyCode.KEY_P:
    //             this.result.addScore();
    //         break;
    //         case KeyCode.KEY_Q:
    //             this.resetGame();
    //             this.fzd.resetFzd();
    //     }
    // }

    gameOver() {
        this.result.showResults();
        this.isOver = true;
        director.pause();
    }

    resetGame() {
        this.result.resetScore();
        this.starQueue.resetPool();
        this.isOver = false;
        this.startGame();
    }

    startGame() {
        this.result.hideResults();
        director.resume();
    }

    getStar() {
        this.result.addScore;
        this.fzd.fly();
    }

    createStar() {
        this.starQueue.addPool();
    }

    contact() {
        let collider= this.fzd.getComponent(Collider2D);

        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        
        if (otherCollider.tag == 1) {
            this.fzd.hitGround = true;
        }
    }

    fzdStruck() {
        this.contact();

        if (this.fzd.hitGround == true) {
            this.gameOver();
        }
    }

    update() {
        if (this.isOver == false) {
            this.fzdStruck();
        }
    }
}


export function getCollisionManager() {
    throw new Error('Function not implemented.');
}

