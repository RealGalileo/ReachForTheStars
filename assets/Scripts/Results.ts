import { _decorator, Component, Node,CCInteger, Label, math, screen, Vec3, Camera } from 'cc';
import { Fzd } from './Fzd';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label
    })
    public curLabel: Label;

    @property({
        type: Label
    })
    public topScore: Label;

    @property({
        type: Label
    })
    public resultEnd: Label;

    @property({
        type: Camera
    })
    public camera: Camera;

    maxScore: number = 0;
    currentScore: number;

    updateScore(num: number) {
        this.currentScore = num;

        this.curLabel.string = ('✨: ' + this.currentScore);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        
        this.topScore.string = 'High Score: ' + this.maxScore;

        this.resultEnd.node.active = true;
        this.topScore.node.active = true;
    }

    hideResults() {
        this.topScore.node.active = false;
        this.resultEnd.node.active = false;
    }

    update() {
        let screenSize = screen.windowSize;
        let curPosY = Math.max(screenSize.y / 2 - 30, this.camera.node.getPosition().y + screenSize.y / 2 - 30)
        let newPos = this.curLabel.node.getPosition();
        newPos.y = curPosY;
        this.curLabel.node.setPosition(newPos);
    }
}

