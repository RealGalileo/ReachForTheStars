import { _decorator, Component, Node,CCInteger, Label } from 'cc';
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

    maxScore: number = 0;
    currentScore: number;

    updateScore(num: number) {
        this.currentScore = num;

        this.curLabel.string = ('' + this.currentScore);
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
}

