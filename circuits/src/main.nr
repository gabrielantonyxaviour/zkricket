mod tests;
use dep::std;
use dep::ecrecover;

fn main(
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
