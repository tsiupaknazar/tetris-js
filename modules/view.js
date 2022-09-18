import { SIZE_BLOCK, COLUMNS, ROWS } from "../app.js";
import { Game } from "./game.js";

export class View {
    constructor(container) {
        this.container = container;

        this.preview();
    }

    colors = {
        J: 'FireBrick',
        I: 'CadetBlue',
        O: 'Gold',
        L: 'SlateBlue',
        2: 'RoyalBlue',
        T: 'Indigo',
        S: 'MediumSeaGreen',
    };

    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');

    preview() {
        this.container.textContent = '';
        const preview = document.createElement('div');
        preview.classList.add('preview');
        preview.innerHTML = `Press "ENTER" <br /> to start`


        this.container.append(preview);
    }

    init() {
        this.container.textContent = '';
        this.canvas.style.gridArea = 'game';

        this.canvas.classList.add('game-area');
        this.canvas.width = SIZE_BLOCK * COLUMNS;
        this.canvas.height = SIZE_BLOCK * ROWS;

        this.container.append(this.canvas);
    }

    createBlockScore() {
        const scoreBlock = document.createElement('div');
        scoreBlock.classList.add('score-block');

        const linesElem = document.createElement('p');
        const scoreElem = document.createElement('p');
        const levelElem = document.createElement('p');
        const recordElem = document.createElement('p');

        scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);

        this.container.append(scoreBlock);

        return (lines, score, level, record) => {
            linesElem.textContent = `lines: ${lines}`
            scoreElem.textContent = `score: ${score}`
            levelElem.textContent = `level: ${level}`
            recordElem.textContent = `record: ${record}`
        }
    }
    createNextTetromino() {
        const tetrominoBlock = document.createElement('div');
        tetrominoBlock.classList.add('next-block');

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        tetrominoBlock.append(canvas);

        this.container.append(tetrominoBlock);

        return (tetromino) => {
            canvas.width = SIZE_BLOCK * tetromino.length
            canvas.height = SIZE_BLOCK * tetromino.length
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < tetromino.length; y++) {
                const line = tetromino[y];

                for (let x = 0; x < line.length; x++) {
                    const block = line[x];
                    if (block !== 'o') {
                        context.fillStyle = this.colors[block];
                        context.strokeStyle = '#73ff00';
                        context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
                        context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
                    }
                }
            }
        }
    }

    showArea(area) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let y = 0; y < area.length; y++) {
            const line = area[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];
                if (block !== 'o') {
                    this.context.fillStyle = this.colors[block];
                    this.context.strokeStyle = '#73ff00';
                    this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
                    this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK)
                }
            }
        }
    }
    static gameOver(score) {
            const gameOverPanel = document.querySelector(".game-over-container")
            gameOverPanel.style.display = "block";

            const scoreLabel = document.querySelector(".final-score");
            scoreLabel.textContent = `Final score: ${score}`

            const reloadBtn = document.querySelector(".reload-button");
            reloadBtn.addEventListener('click', function(){
                location.reload();
            })
        }
}