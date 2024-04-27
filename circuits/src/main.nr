mod tests;
use dep::std;
use dep::ecrecover;

global MERKLE_DEPTH = 4;
fn main(leaf: [u8; 32], leaf_index: u8, proof: [[u8; 32]; MERKLE_DEPTH], hash: [u8; 32]) {
    let mut computed_hash: [u8; 32] = [0; 32];
    computed_hash=leaf;
    for i in 0..MERKLE_DEPTH {
        if leaf_index % 2 == 0 {
            computed_hash = std::hash::keccak256(concatenate_leafs(computed_hash, proof[i]), 64);
        } else {
            computed_hash = std::hash::keccak256(concatenate_leafs(proof[i], computed_hash), 64);
        }
    }
    assert(computed_hash == hash);
}

fn ecdsa_verification(
    signer_pub_x_key: [u8; 32],
    signer_pub_y_key: [u8; 32],
    signature: [u8; 64],
    hash: pub [u8; 32]
) {
    let computedAddress: Field = ecrecover::secp256k1::PubKey::from_xy(signer_pub_x_key, signer_pub_y_key).to_eth_address(); // Compute address from public key
    let recoveredAddress = ecrecover::ecrecover(signer_pub_x_key, signer_pub_y_key, signature, hash);

    println(f"Computed address: {computedAddress}");
    println(f"Recovered address: {recoveredAddress}");
    assert(computedAddress == recoveredAddress);
}

fn concatenate_leafs(leaf1: [u8; 32], leaf2: [u8; 32]) -> [u8; 64] {
    let mut arr: [u8; 64] = [0; 64];
    for i in 0..32 {
        arr[i] = leaf1[i];
        arr[i + 32] = leaf2[i];
    }
    arr
}
