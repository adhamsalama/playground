// https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html
use rand::Rng;
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    let mut guess = String::new();
    let guess_int: i32;
    match io::stdin().read_line(&mut guess) {
        Ok(_n) => {
            println!("{_n} bytes read");
            guess_int = guess.trim().parse().unwrap(); // or let guess_int = guess.trim().parse::<i32>().unwrap();
        }
        Err(error) => {
            println!("error: {error}");
            std::process::exit(1);
        }
    }

    println!("You guessed: {guess_int}");
    println!("Secret number is {secret_number}");
    if guess_int == secret_number {
        println!("You guessed right!");
    } else {
        println!("You guessed wrong!");
    }
}
