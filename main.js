//Draw The hangman with canvas 

//Set main variables
let canvas = document.getElementById("hangman_canvas");
let context = canvas.getContext("2d");

const draws = ["base", "stand", "hang", "rope", "head", "body", "left_hand",
    "right_hand", "left_leg", "right_leg"];

// Object Of Words + Categories
const words = {
    cities: ["Alexandria", "Cairo", "Minia", "Assuit", "Sohag"],
    colors: ["Red", "green", "Blue", "Black", "Yellow", "White"],
    fruits: ["Orange", "Mango", "Banana", "Strawberry", "Apple"],
    animals: ["Caw", "rabbit", "Lion", "Zebra", "Elephant", "Goat"],
};

//set correct letters 
let correct_letter = 0;

//Define Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//get Letters Container
let letters_container = document.querySelector('.letters');

//Set wrong attemps 
let wrong_attemps = 0;

//Get restart game button
let restart_button = document.querySelector('.restart_button');

//Declare container for category word 
var word_value;

//Clear Canvas 
function clear_canvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

//Draw the stand and the man 
Draw = (part) => {
    switch (part) {

        case "base":
            //draw base
            context.strokeStyle = '#444';
            context.lineWidth = 10;

            context.beginPath();

            context.moveTo(30, 330);
            context.lineTo(150, 330);

            context.closePath();
            context.stroke();
            break;

        case "stand":
            //Draw the stand
            context.beginPath();

            context.moveTo(90, 330);
            context.lineTo(90, 50);

            context.closePath();
            context.stroke();
            break;

        case "hang":
            //Draw the hang
            context.beginPath();

            context.moveTo(90, 50);
            context.lineTo(180, 50);
            context.moveTo(180, 50);
            context.lineTo(180, 80);

            context.closePath();
            context.stroke();
            break;

        case "rope":
            //Draw the rope 
            context.lineWidth = 3;

            context.beginPath();

            context.arc(180, 110, 30, 0, 2 * Math.PI);

            context.closePath();
            context.stroke();
            break;

        case "head":
            //Draw the head 
            context.beginPath();

            context.arc(180, 110, 25, 0, 2 * Math.PI);

            context.closePath();
            context.stroke();
            break;

        case "body":
            //Draw the body  
            context.beginPath();

            context.moveTo(180, 133);
            context.lineTo(180, 260);

            context.closePath();
            context.stroke();
            break;

        case "left_hand":
            //Draw the left hand
            context.beginPath();

            context.moveTo(180, 180);
            context.lineTo(150, 160);

            context.closePath();
            context.stroke();
            break;


        case "right_hand":
            //Draw the right hand
            context.beginPath();

            context.moveTo(180, 180);
            context.lineTo(210, 160);

            context.closePath();
            context.stroke();
            break;

        case "left_leg":
            //Draw the left leg
            context.beginPath();

            context.moveTo(180, 260);
            context.lineTo(160, 280);

            context.closePath();
            context.stroke();
            break;

        case "right_leg":
            //Draw the left leg
            context.beginPath();

            context.moveTo(180, 260);
            context.lineTo(200, 280);

            context.closePath();
            context.stroke();
            break;


    }
}

function add_alphabet_letters() {

    const letters_array = Array.from(letters);

    letters_container.innerHTML = "";

    letters_array.forEach(letter => {

        //Create span for each letter 
        let letter_span = document.createElement('span');

        //create text node for each span
        letter_span.appendChild(document.createTextNode(letter));
        letter_span.className = 'letter-box';
        letters_container.appendChild(letter_span);
    });
}


function get_random_word() {


    let keys = Object.keys(words);

    //Get random Category  index  
    let random_category_index = Math.floor(Math.random() * keys.length);

    //Get Category name
    let category_name = keys[random_category_index];

    //Get the elements of category 
    let category_elements = words[category_name];

    // Change the name of category in the page 
    document.querySelector('.game_category span').innerHTML = category_name;

    //Get random word  of random chosen category 
    let random_word_index = Math.floor(Math.random() * category_elements.length);
    word_value = category_elements[random_word_index];

    //Turn the word to array to generate empty spans to guess letters 
    array_of_word = Array.from(word_value.toLowerCase());

    //get letters container to add letters
    let guess_container = document.querySelector('.guess_letters');
    guess_container.innerHTML = "";
    //looping in word to generate span for each letter
    array_of_word.forEach(letter => {
        let empty_span = document.createElement('span');
        guess_container.appendChild(empty_span);

    });
}

document.addEventListener('click', (e) => {

    //set status 
    let status = false;

    if (e.target.className === 'letter-box') {

        e.target.classList.add('clicked');

        let clicked_letter = e.target.innerHTML.toLowerCase();
        let guess_letters_spans = document.querySelectorAll('.guess_letters span');

        array_of_word.forEach((word_letter, letter_index) => {
            if (clicked_letter === word_letter) {

                status = true;
                guess_letters_spans.forEach((span, span_index) => {
                    if (letter_index === span_index) {

                        span.innerHTML = clicked_letter;
                        correct_letter++;

                    }
                });
            }

        });

        if (correct_letter == document.querySelectorAll('.guess_letters span').length) {
            end_game("success");
        }

        if (status != true) {
            Draw(draws[wrong_attemps]);
            wrong_attemps++;

            //Play fail sound
            document.getElementById('fail').play();

            if (wrong_attemps == 10) {
                end_game("fail");
                letters_container.classList.add('finished');
            }
        }

        else {
            //Play success sound
            document.getElementById('success').play();

        }
    }
});

function end_game(sucess_or_fail) {
    let pop_up = document.createElement('div');

    if (sucess_or_fail === "fail") {
        pop_up.appendChild(document.createTextNode(`Game Over, The Word Is ${word_value}`));
    }
    else {
        pop_up.appendChild(document.createTextNode(`Game Over, You are successed`));
    }

    pop_up.className = "pop_up";
    document.querySelector('.main_container').classList.add('blur');
    document.body.appendChild(pop_up);

    let restart_game = document.createElement('button');
    restart_game.className = "restart_button";
    restart_game.appendChild(document.createTextNode("Restart"));
    pop_up.appendChild(restart_game);

}

document.addEventListener('click', function (e) {
    if (e.target.className == 'restart_button') {

        e.target.parentNode.remove();
        document.querySelector('.main_container').classList.remove('blur');
        letters_container.classList.remove('finished');

        wrong_attemps = 0;

        correct_letter = 0;

        add_alphabet_letters();

        get_random_word();

        clear_canvas();

    }
});


add_alphabet_letters();
get_random_word();
