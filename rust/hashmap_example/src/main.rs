use std::collections::HashMap;

fn main() {
    let mut map: HashMap<String, i32> = HashMap::new();
    map.insert(String::from("adhom"), 23);
    map.insert(String::from("sasa"), 22);
    let adhom_age = map.get(&String::from("adhom")).unwrap();
    println!("{}", adhom_age);
}
