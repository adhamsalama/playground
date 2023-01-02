use std::fmt;
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
    reverse_array(&mut arr);
    print_arr(&mut arr);
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
