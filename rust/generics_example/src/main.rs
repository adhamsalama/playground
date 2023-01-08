fn main() {
    let a = [1, 2, 3];
    let b = array_to_vec(&a);
    println!("{:?}", b);
    let s = [String::from("a"), String::from("b")];
    let ss = array_to_vec(&s);
    println!("{:?}", ss);
    let a = Pair { x: 1, y: 1 };
}

fn array_to_vec<T>(arr: &[T]) -> Vec<T>
where
    T: Clone,
{
    let mut myvec: Vec<T> = vec![];
    for i in arr.iter() {
        myvec.push(i.clone());
    }
    myvec
}
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self { x, y }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
