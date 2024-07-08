import { _decorator, Component, Node, Animation, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Hero')
export class Hero extends Component {
    @property({
        type: Node
    })
    public hero: Node;

    public heroAnim: Animation;
    public isLeft: boolean = true;
    public jmpLeft;
    public jmpRight;
    public turnRight;
    public turnLeft;
    public heroPos;
    
    onLoad() {
        this.heroAnim = this.hero.getComponent(Animation);
        [this.jmpLeft, this.jmpRight, this.turnRight, this.turnLeft] = this.heroAnim.clips;
    }

    resetHero() {
        this.heroPos = new Vec3(0, -338, 0);

        this.node.setPosition(this.heroPos);
    }

    turnAround(turnleft: boolean) {
        if (this.isLeft) {
            this.heroAnim.play(this.turnRight.name);
        }
        else {
            this.heroAnim.play(this.turnLeft.name);
        }
        this.isLeft = !this.isLeft;
    }

    update(deltaTime: number) {
        
    }
}

