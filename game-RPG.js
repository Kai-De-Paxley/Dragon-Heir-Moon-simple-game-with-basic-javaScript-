let xp = 0;
let gold = 100;
let health = 100;
let currentWeapon = 0;
let inventory = ["Stick"];
let serang;
let monsterHealth;

// const 
const name = document.getElementById("name");
const start = document.getElementById("newGame");

const store = document.getElementById("storeImg");
const dungeon = document.getElementById("dungeonImg")
const deadImg = document.getElementById("deadImg")

const early = document.getElementById("early")
const container = document.getElementById('container')

const character = document.getElementById("character")

const xpPoint = document.getElementById('xpPoint');
const goldPoint = document.getElementById('goldPoint');
const healthPoint = document.getElementById('healthPoint');

const button1 = document.getElementById('store');
const button2 = document.getElementById('dungeon');
const button3 = document.getElementById('Boss');

const wareWolfImg = document.getElementById('image');
const orcImg = document.getElementById('image2');
const dragonImg = document.getElementById('image3');

const monsterStat = document.getElementById('monsterStat')
const monsterName = document.getElementById('monsterName');
const monsterHealthText = document.getElementById('monsterHealth');
const monsterLevel = document.getElementById('monsterLevel');

const text = document.getElementById('text')


start.onclick = openGame;
button1.onclick = goStore;
button2.onclick = goDungeon;
button3.onclick = fightBoss;

function openGame() {
    container.style.display = "block";
    early.style.display = "none"
}


// pertama bikin array yang berisi object untuk menyimpan data inti 
const core = [
    {
        name: "town",
        "button text": ["Go to store", "Go to dungeon", "Fight FAFNIR"],
        "button function": [goStore, goDungeon, fightBoss],
        text: "You are in the center of the city, prepare yourself to defeat FAFNIR and become the hero of the world"
    },{
        // ini untuk yang function go store
        name: "store",
        "button text": ["Buy 18 Health (12 gold)", "Buy a weapon (35 gold)", "Back to town square"],
        "button function": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },{
        name:"dungeon",
        "button text": ["Fight WareWolf", "Fight Orc", "Go to town square"],
        "button function": [wareWolf, Orc, goTown],
        text: "You enter the dungeon and see some monsters. Dare to fight them?"
    },{
        name: "lawan monster",
        "button text": ["Attack", "Dodge", "Run"],
        "button function": [attack, dodge, goTown],
        text: "Beat him ☠️ and get great prizes 💰"
    },{
        name: "Mengalahkan mosnter",
        "button text": ["Back to town square", "Go to store", "Fight another monster"],
        "button function": [goTown, goStore, goDungeon],
        text: " Has been killed! you got some xp and gold"
    }, {
        name: "kalah",
        "button text": ["RESTART?", "RESTART?", "RESTART?"],
        "button function": [restart, restart, restart],
        text: "You got killed ☠️ want to start all over again? \n"
    }, {
        name: "Defeat fafnir",
        "button text": ["Play again?","Play again?","Play again?"],
        "button function": [restart, restart, restart],
        text: "You win the game and be the greats hero in the world! おめでとう ✨✨"
    }
];

// ini array untuk menyimpan data senjata
const weapon =[
    {name: "Stick", power: 24},
    {name: "Bow", power: 34},
    {name: "Spear", power: 44},
    {name: "Dagger", power: 54},
    {name: "Sword", power: 94},
];

const monsterList = [
    {name: "WareWolf", health:"150", level:"8"},
    {name: "Orc", health:"210", level:"10"},
    {name: "Fafnir", health:"500", level:"50"},
];

const monsterAttack = [
    {name : "Claws"},
    {name : "Scythe Of Vyse"},
    {name: "Fire bursts"}
]

// ke dua membuat function utama untuk sub function (main itu parameternya) jadi sama seperti function inti memanggin diri sendiri
function inti(main) {
    // ini untuk action tombol di semua function
    wareWolfImg.style.display = "none";
    orcImg.style.display = "none";
    dragonImg.style.display = "none";
    monsterStat.style.display = "none";
    character.style.display = "none";
    name.style.display = "none"
    store.style.display = "none"
    dungeon.style.display = "none"
    deadImg.style.display = "none"

    button1.innerText = main["button text"][0];
    button2.innerText = main["button text"][1];
    button3.innerText = main["button text"][2];

    button1.onclick = main["button function"][0];
    button2.onclick = main["button function"][1];
    button3.onclick = main["button function"][2];

    text.innerText = main.text;
}

function goTown() {
    inti(core[0])
    character.style.display = "block";
    name.style.display = "block"
    name.innerText = "You as warrior"
}

function goStore() {
    inti(core[1])
    store.style.display = "block"
}

function goDungeon() {
    inti(core[2])
    dungeon.style.display = "block"
}

function fightBoss() {
    serang = 2;
    fight()
    dragonImg.style.display = "block"
    text.innerText = " Defeat FAFNIR the king of all creatures in the underworld. Earn the king's respect and become a legend of the world"
}

function buyHealth() {
    if(health < 160) {
        if(gold >= 12 ) {
            gold -= 12
            health += 18
            goldPoint.innerText = gold;
            healthPoint.innerText = health;
            text.innerText = "health + 12"
        } else {
            text.innerText = "Not enough money"
        } 
    } else{
        text.innerText = "Your health alredy " + health + "\n";
        text.innerText += "Your health should not be more than 160"
    }
}

function buyWeapon() {
    if(currentWeapon < weapon.length - 1) {
        if(gold >= 35) {
            gold -= 35;
            currentWeapon += 1;
            goldPoint.innerText = gold;
            
            let newWeapon = weapon[currentWeapon].name;
    
            text.innerText = "You buy a: " + newWeapon + "." + "\n";

            inventory.push(newWeapon);

            text.innerText += " Your inventory: " + inventory + "."; 
        } else {
            text.innerText = "Not enough money! Farm first";
        }
    } else {
        text.innerText = "Your storage is full, sell it if you don't need it anymore";
        button2.innerText = "Sell a weapon (8 Gold)";
        button2.onclick = sellWeapon;
    }

}

function sellWeapon() {
    if(inventory.length > 1) {
        gold += 15;
        goldPoint.innerText = gold;
        let currentWeapon = inventory.shift()
        text.innerText = "You sell a " + currentWeapon + "\n";
        text.innerText += "Your item in inventory: " + inventory;
    } else {
        text.innerText = "You can't sell it, because there is only 1 "
    }
}

function wareWolf() {
    serang = 0;
    fight()
    wareWolfImg.style.display = "block"
}

function Orc() {
    serang = 1;
    fight()
    orcImg.style.display = "block"
}

function fight() {
    inti(core[3]);
    monsterStat.style.display = "block"

    monsterName.innerText = monsterList[serang].name;
    monsterHealth = monsterList[serang].health;
    monsterLevel.innerText = monsterList[serang].level;

    monsterHealthText.innerText = monsterHealth
}

function dodge() {
    text.innerText = "You successfully dodged a " + monsterList[serang].name + " " +monsterAttack[serang].name;
    if(health <= 25) {
        health += 10
        healthPoint.innerText = health;
    }
}

function attack() {
    text.innerText = "Your attack " + monsterList[serang].name + " with " + weapon[currentWeapon].name + ".\n ";
    text.innerText += monsterList[serang].name + " replying to attack with " + monsterAttack[serang].name + ".\n";

    health -= Math.floor(Math.random() * monsterList[serang].level) + 5;
    healthPoint.innerText = health;

    if(isMonsterHit()) {
        monsterHealth -= weapon[currentWeapon].power + Math.floor(Math.random() * xp) + 10;
    } else {
        text.innerText += " Your attack miss "
    }

    monsterHealthText.innerText = monsterHealth;

    if(Math.random() < .2 && inventory.length !== 1) {
        text.innerText = inventory.pop() + " Broke\n";
        text.innerText += monsterList[serang].name + " Broke your " + weapon[currentWeapon].name ;
        currentWeapon--
    } 

    if(monsterHealth <= 0) {
        serang === 2 ? winGame() : defeatMonster();
    } else if (health < 1) {
        lose()
    }
}

function isMonsterHit () {
    return Math.random() > .2 || health < 20;  // artinya player akan hit jika lebih dari 0.2 tau darah dkurang dari 20 
}   

function defeatMonster () {
    gold += Math.floor(Math.random() * monsterList[serang].level) + 25;
    goldPoint.innerText = gold;

    xp += Math.floor(Math.random() * monsterList[serang].level) + 8;
    xpPoint.innerText = xp

    health += 5;
    healthPoint.innerText = health;

    inti(core[4]);

    deadImg.style.display = "block"
    text.innerText = monsterList[serang].name + " Has been killed! You got some exp, health and gold"
    name.innerText = monsterList[serang].name + " Dead"
    name.style.display = "block"
}


function lose() {
    inti(core[5]);
    deadImg.style.display = "block"
    name.innerText = "You are dead"
    name.style.display = "block"

    text.innerText += " Tips 1: U need a sword to win this game easily \n"
    text.innerText += " Tips 2: More xp make your damage weapon increased\n"
    text.innerText += " Tips 3: fight monster dungeon is the best way to get Gold and xp\n"
}

function restart() {
    xp = 0;
    gold = 100;
    health = 100;
    currentWeapon = 0;
    inventory = ["Stick"]
    name.innerText = "You as a warriors"

    xpPoint.innerText = xp;
    goldPoint.innerText = gold;
    healthPoint.innerText = health;

    text.innerText = "You are now in the center of the Heinbergt capital of the Reyvornia kingdom, you were given a task by King Eisz BerN Okstania IV to defeat FAFNIR the king of all creatures in the underworld, you were given 100 gold to buy preparations and an arrow before fighting the evil dragon.";

    goTown()
}

function winGame() {
    inti(core[6]);

}