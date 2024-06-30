import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, easing, Canvas } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fzd')
export class Fzd extends Component {
    @property({
        type: CCFloat,
        tooltip: 'how high fzd can fly' // maybe can add how high he can fly
    })
    public jumpHeight: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'how long fzd can fly' 
    })
    public jumpDuration: number = 3.5;

    @property({
        type: CCFloat,
        tooltip: 'horizonal move speed' 
    })
    public horizonalSpeed: number = 200;

    public fzdAnimation: Animation;
    public fzdLocation: Vec3;
    public hitGround: boolean;

    onLoad() {
        this.resetFzd();

        this.fzdAnimation = this.getComponent(Animation);
    }

    resetFzd() {
        this.fzdLocation = new Vec3(0, 0, 0);

        this.node.setPosition(this.fzdLocation);
        this.hitGround = false;
    }

    fly() {
        this.fzdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0), {easing: 'smooth', 
                onUpdate: (target: Vec3, ratio: number)=> {
                    this.node.position = target;
                }
            })
            .start();
        
            this.fzdAnimation.play();
    }

    moveTo(destination: number) {
        console.log("location: ", this.node.position);
        this.fzdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(destination, this.node.position.y, 0), 
            {
                easing:'smooth',
                onUpdate:(target: Vec3, ratio: number)=>{
                    this.node.position = target;
                }
            })
            .start();
    }

    moveHorizonal(direction: number) {
        // console.log("location: ", this.fzdLocation);
        this.fzdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(this.node.position.x + direction * this.horizonalSpeed, this.node.position.y, 0), {easing: 'smooth', 
                onUpdate: (target: Vec3, ratio: number)=> {
                    this.node.position = target;
                }
            })
            .start();
    }
}

