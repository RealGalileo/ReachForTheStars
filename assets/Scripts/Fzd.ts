import { _decorator, CCFloat, Component, Node, Vec3, Vec2, Animation, tween, easing, Canvas, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fzd')
export class Fzd extends Component {
    @property({
        type: CCFloat,
        tooltip: 'how high fzd can fly' 
    })
    public jumpHeight: number = 350;

    @property({
        type: CCFloat,
        tooltip: 'how long fzd can fly' 
    })
    public jumpDuration: number = 5;

    @property({
        type: CCFloat,
        tooltip: 'horizonal move speed' 
    })
    public horizonalSpeed: number = 10;

    public fzdAnimation: Animation;
    public fzdLocation: Vec3;
    public hitGround: boolean;
    public jmpLeft;
    public jmpRight;
    public turnRight;
    public turnLeft;
    public isLeft: boolean = true;

    onLoad() {
        this.resetFzd();

        this.fzdAnimation = this.getComponent(Animation);
        [this.jmpLeft, this.jmpRight, this.turnRight, this.turnLeft] = this.fzdAnimation.clips;
    }

    resetFzd() {
        this.fzdLocation = new Vec3(0, -336, 0);
        this.node.setPosition(this.fzdLocation);
        this.hitGround = false;
    }

    fly() {
        this.fzdAnimation.stop();

        let fzdBody = this.node.getComponent(RigidBody2D);
        fzdBody.applyLinearImpulseToCenter(new Vec2(0, 300), true);

        this.fzdAnimation.play();
    }

    moveTo(destination: number) {
        this.fzdAnimation.stop();

        tween(this.node.position)
            .to(this.jumpDuration, new Vec3(destination, this.node.position.y, 0), 
            {
                easing:'cubicInOut',
                onUpdate:(target: Vec3, ratio: number)=>{
                    this.node.position = target; // add
                }
            })
            .start();
    }

}

