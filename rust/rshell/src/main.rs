use std::env;
use std::fs;

fn main() {
    let args: Vec<String> = env::args().collect();

    for arg in args.iter().skip(1) {
        let file = fs::read_to_string(arg).expect("Couldn't read file");
        println!("{}", file);
    }
}
