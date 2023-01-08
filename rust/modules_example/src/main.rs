use garden::submodule1::file1;

pub mod garden;
struct SS {
    s: garden::submodule1::S1,
}
fn main() {
    file1::print_garden();
    let _a = garden::submodule1::S1 { a: 5 };
    garden::submodule2::file1::print_garden();
    let _b = SS {
        s: garden::submodule1::S1 { a: 6 },
    };
}
