// 1. Despot some money
// 2. Determine number of line to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again
// 8. Học JS =))

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};


const deposit = () =>{
    while(true){
        const depositAmount = prompt("Nhập số lượng đầu vào:  ");
        const numberDepositAmount = parseFloat(depositAmount);
    
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Số lượng không đúng, vui lòng thử lại!");
        }else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Nhập số lượng đặt kèo theo hàng(1-3):  ");
        const numberOfLines = parseFloat(lines);
    
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Số lượng hàng ngang không đúng, vui lòng thử lại!");
        }else{
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Số lần đặt cược cho 1 lần:  ");
        const numberBet = parseFloat(bet);
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Số lần đặt cược không đúng, vui lòng thử lại!");
        }else{
            return numberBet;
        }
    }
};


const spin = () => {
    const symbols = [];
    for (const [symbol, count]  of Object.entries(SYMBOLS_COUNT)){
        for(let i  = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};


const transpose = (reels) =>{
    const rows = [];

    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}



const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
}

const game = () =>{
    let balance = deposit();

    while(true){
        console.log("Bạn hiện có: " + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("Bạn đã chiến thắng, $" +  winnings.toString());
        if (balance <= 0){
            console.log("Bạn hết tiền rồi! Nạp thêm để chơi tiếp");
            break;
        }

        const playAgain = prompt("Bạn có muốn chơi lại không? (y/n)?");

        if(playAgain != "y") break;
        
    }
}

game();





