use std::{fmt, vec};
#[derive(Debug)]
struct Person {
    name: &'static str,
    age: i32,
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Name: {}, Age: {}.", self.name, self.age)
    }
}
fn main() {
    let adhom = Person {
        name: "adhom",
        age: 23,
    };
    println!("{}", adhom);
    println!("Name: {}, Age: {}", adhom.name, adhom.age);
    let mut arr: [i32; 7] = [1, 2, 3, 4, 5, 6, 0];
    print_arr(&mut arr);
    let cc: () = reverse_array(&mut arr);
    print_arr(&mut arr);
    // let mut counter = 0;

    // let result = loop {
    //     counter += 1;

    //     if counter == 10 {
    //         break counter * 2;
    //     }
    // };
    // println!("The result is {}", result);

    // ? Rust allows 1 mutable reference, or many immutable references of the same variable, BUT NOT BOTH AT THE SAME TIME!
    let a = vec![1, 2, 3, 4, 5];
    // print_vec(a); // this function call took the ownership
    // print_vec(a); // so this can't take it anymore, aaaaaah!
    // To fix, change the function to take the reference
    // let mut u = [1, 2, 3];
    // let y = u;
    // u[0] = 4;
    // println!("{:?}", u);
    // y[0] = 66;
    // println!("{:?}", y);
    let mut vec1 = [1, 2, 3];
    let vec2 = vec1;
    vec1[0] = 1;
}

fn reverse_array(arr: &mut [i32]) {
    let n = arr.len() - 1;
    for i in 0..arr.len() / 2 {
        let temp = arr[i];
        arr[i] = arr[n - i];
        arr[n - i] = temp;
    }
}

fn print_arr(arr: &[i32]) {
    for i in 0..arr.len() {
        print!("{},  ", arr[i]);
    }
    println!();
}

fn print_arro(arr: [i32; 3]) {
    println!("{:?}", arr);
}
fn print_vec(a: Vec<i32>) {
    println!("arg = {:?}", a);
}
