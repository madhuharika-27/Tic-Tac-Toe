let boxes=document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newBtn=document.querySelector('#new');
let msg=document.querySelector('#msg');
let msgContainer=document.querySelector(".msg-container");

let turn0 = true;
let count=0;

const winnerPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if (turn0){
            box.innerText="O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;

        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
        gameDraw();
        }

    });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};


const disableBoxes = () => {
    for ( box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for ( box of boxes) {
        box.disabled = false;
        box.innerText="";
    }
}


const checkWinner = () => {
    for(let pattern of winnerPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;
  

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val===pos2Val && pos2Val===pos3Val){
                console.log("winner",pos1Val);
                disableBoxes();
                showWinner(pos1Val);
                return true;
                
            }
        }
    }
};

const showWinner = (winner) => {
    msg.innerText=`Yippe! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const resetGame= () => {
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");   
}

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame); 