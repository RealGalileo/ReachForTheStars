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
        // this.curLabel.node.active = true;
    }

    addScore() {
        console.log("addScore: ", this.currentScore);
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        
        this.topScore.string = 'High Score: ' + this.maxScore;
        let camPosY = this.camera.node.getPosition().y;

        let newTopScorePos = this.topScore.node.getPosition();
        newTopScorePos.y = camPosY;
        this.topScore.node.setPosition(newTopScorePos);

        let newTryAgainPos = this.resultEnd.node.getPosition();
        newTryAgainPos.y = camPosY - 100;
        this.resultEnd.node.setPosition(newTryAgainPos);

        this.resultEnd.node.active = true;
        this.topScore.node.active = true;
    }

    hideResults() {
        this.topScore.node.active = false;
        this.resultEnd.node.active = false;
    }

    update() {
        let screenSize = screen.windowSize;
        // let curPosY = Math.max(screenSize.y / 2 - 30, this.camera.node.getPosition().y + screenSize.y / 2 - 30);
        let curPosY = this.camera.node.getPosition().y + 500;
        let newPos = this.curLabel.node.getPosition();
        newPos.y = curPosY;
        this.curLabel.node.setPosition(newPos);
        // console.log("curlabel position, isActive: ", newPos, this.curLabel.node.active)
    }
}

