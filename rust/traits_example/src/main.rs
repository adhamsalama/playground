struct Article {
    content: String,
    author: String,
}

struct Tweet {
    content: String,
    username: String,
}

trait Summary {
    fn summarize(&self) -> String;
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("Article: {}, by Author: {}", (self).content, self.author)
    }
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("Tweet: {}, by User: {}", (self).content, self.username)
    }
}

fn print_summarizable(s: &impl Summary) {
    println!("{}", s.summarize());
}
fn main() {
    let article = Article {
        content: "Hello, world!".to_string(),
        author: "Adhom".to_string(),
    };
    let tweet = Tweet {
        content: "Normalize systems programming languages!".to_string(),
        username: "Elon Musk".to_string(),
    };
    print_summarizable(&article);
    print_summarizable(&tweet);
}
