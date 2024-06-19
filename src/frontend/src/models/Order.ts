import Address from "./Address.ts";
import CartItem from "./CartItem.ts";

export default interface Order {
    address: Address,
    userID: number,
    items: CartItem[],
    totalPrice: number
}