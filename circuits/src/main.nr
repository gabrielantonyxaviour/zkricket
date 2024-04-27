use dep::std;
use dep::ecrecover;

fn main(a: u8, b: u8) -> pub u8 {
    assert(a != b);
    a + b
}
