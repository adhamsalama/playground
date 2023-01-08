use std::fmt;
struct Person {
    name: String,
    age: i32,
}

impl fmt::Display for Person {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Name: {}, Age: {}.", self.name, self.age)
    }
}
impl Person {
    // This is like a class method is Python
    fn empty() -> Self {
        Self {
            name: String::from(""),
            age: 0,
        }
    }
}
fn main() {
    let mut user1 = Person {
        name: String::from("adhom"),
        age: 23,
    };
    let user2 = Person { age: 33, ..user1 };
    user1.name = String::from("Other name");
    let user3 = Person::empty();
    println!("{}", user1);
    println!("{}", user2);
    println!("{}", user3);
}
