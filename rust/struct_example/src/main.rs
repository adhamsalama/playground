#[derive(Debug)]
struct Person {
    name: &'static str,
    age: i32,
}

fn main() {
    let adhom = Person {
        name: "adhom",
        age: 23
    };
    println!("{:?}", adhom);
    println!("Name: {}, Age: {}", adhom.name, adhom.age);
}
