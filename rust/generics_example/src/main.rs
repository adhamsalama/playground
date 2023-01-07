fn main() {
    let a = [1, 2, 3];
    let b = array_to_vec(&a);
    println!("{:?}", b);
    let s = [String::from("a"), String::from("b")];
    let ss = array_to_vec(&s);
    println!("{:?}", ss);
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
