use crate::main;

fn random_bytes32(seed: u8) -> [u8; 32] {
    let mut arr = [seed; 32];
    dep::std::hash::keccak256(arr, 32)
}

#[test]
fn test_works_1() {
    let pub_x_key = [];
    let pub_y_key = [];
    let signature = [];
    let hash = [];
    main();
}

#[test]
fn test_works_2() {}

#[test(should_fail)]
fn test_fails() {}
