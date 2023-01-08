use std::{fmt, vec};

fn main() {
    // ? Rust allows 1 mutable reference, or many immutable references of the same variable, BUT NOT BOTH AT THE SAME TIME!
    // * Vecs
    let v = vec![1, 2, 3, 4, 5];
    print_vec(&v); // this function call took the ownership
    print_vec(&v); // so this can't take it anymore, aaaaaah!
                   // ? To fix, change the function to take the reference
                   // let mut u = [1, 2, 3];
                   // let y = u;
                   // u[0] = 4;
                   // println!("{:?}", u);
                   // y[0] = 66;
                   // println!("{:?}", y);

    // * Arrays
    let mut arr1 = [1, 2, 3];
    let arr2 = arr1;
    arr1[0] = 69;
    // * Strings
    let mut s1 = String::from("adhom");
    push(&mut s1);
    println!("{}", s1);
    push(&mut s1);
    println!("{}", s1);
    let mut s = String::from("hello");

    let r1 = &s; // no problem
    let r2 = &s; // no problem
    println!("{} and {}", r1, r2);
    // variables r1 and r2 will not be used after this point

    let r3 = &mut s; // no problem
    println!("{}", r3);
    let mut a = 69;
    let b = &mut a;
    *b = 420;
    let implicit_pointer_dereference = b.clone();
    let explicit_pointer_dereferrnce = (*b).clone();
    println!(
        "{}",
        implicit_pointer_dereference == explicit_pointer_dereferrnce
    );
}
fn push(s: &mut String) {
    s.push_str("ooo");
}
fn str(s: String) {}
fn print_arr(arr: &[i32]) {
    for i in 0..arr.len() {
        print!("{},  ", arr[i]);
    }
    println!();
}

fn print_vec(v: &Vec<i32>) {
    println!("arg = {:?}", v);
}
