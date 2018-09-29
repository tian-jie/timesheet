export class CycleObject {
    private year;
    private month;
    private cycle;  // 01. 02

    constructor(date: Date) {
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.cycle = (date.getDate() < 15 ? '01' : '02');
    }

    /**
     * 将自己调整到前一个cycle
     */
    toPreviousCycle() {
        if (this.cycle == '02') {
            this.cycle = '01';
        } else {
            this.cycle = '02';
            this.month--;
            if (this.month == 0) {
                this.month = 12;
                this.year--;
            }
        }
    }

    /**
     * 将自己调整到后一个cycle
     */
    toNextCycle() {
        if (this.cycle == '01') {
            this.cycle = '02';
        } else {
            this.cycle = '01';
            this.month++;
            if (this.month == 13) {
                this.month = 1;
                this.year++;
            }
        }
    }

    /**
     * 可以任意上下调整几个轮次
     * @param cycles 想要调整几个轮次
     */
    nextCycles(cycles: number): CycleObject {
        var factor = 1;
        if (cycles < 0) {
            factor = -1;
        }
        for (var i = 0; i < cycles * factor; i++) {
            if (factor > 0) {
                this.toNextCycle();
            } else if (factor < 0) {
                this.toPreviousCycle();
            }
        }

        return this;
    }

    toString() {
        return this.year + (this.month > 9 ? '' : '0') + this.month + (this.cycle);
    }

}