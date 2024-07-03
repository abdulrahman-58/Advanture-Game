#! /usr/bin/env node
import inquirer from "inquirer";
// _ _ _ _ _ _ _ _ _ _ _ _ games variable _ _ _ _ _ _ _ _ _ _ _ _
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttachDamageToHero = 25;
// _ _ _ _ _ _ _ _ _ _ _ _ _ player variable _ _ _ _ _ _ _ _ _ _ _ _ _
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealthAmount = 30;
let healthPotionDropChance = 50;
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ while loop condition _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
let gameRunning = true;
console.log("Welcome to DeadZone");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`# ${enemy} has appeared # /n`);
    while (enemyHealth > 0) {
        console.log(`Your Health: ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "Answer",
            type: "list",
            message: "what would you like to do?",
            choices: ["1. Attack", "2. Take Health Potion", "3. Run"]
        });
        if (options.Answer === "1. Attack") {
            let attackDamageToEnemy = 50;
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttachDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`You strike the ${enemy} for ${damageToEnemy}`);
            console.log(`${enemy} strike you for ${damageToHero} damage.`);
            if (heroHealth < 1) {
                console.log("You have taken too much damage. You are too weak to continue.");
                break;
            }
        }
        else if (options.Answer === "2. Take Health Potion") {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealthAmount;
                numHealthPotion--;
                console.log(`You use health potion for ${healthPotionHealthAmount}`);
                console.log(`You now have ${heroHealth} health`);
                console.log(`You have ${numHealthPotion} health potions left.`);
            }
            else {
                console.log("You have no health potions left. Defeat enemy for a chance to get health potion");
            }
        }
        else if (options.Answer === "3. Run") {
            console.log(`You run away from ${enemy}`);
            continue Game;
        }
    }
    if (heroHealth < 1) {
        console.log("You are out of battle. You are too weak");
        break;
    }
    console.log(`${enemy} was defeated!`);
    console.log(`You have ${heroHealth} health.`);
    let randomNum = Math.floor(Math.random() * 100 + 1);
    if (randomNum < healthPotionDropChance) {
        numHealthPotion++;
        console.log("Enemy give you health potion.");
        console.log(`Your health is ${heroHealth}`);
        console.log(`Your health potion is ${numHealthPotion}`);
    }
    let userOption = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: "What would you like to do now?",
        choices: ["1. Continue", "2. Exit"]
    });
    if (userOption.ans === "1. Continue") {
        console.log("You are continue on your advanture");
    }
    else {
        console.log("You sucessfuly Exit from DeadZone");
        break;
    }
    console.log("Thank you for playing.\n");
}
