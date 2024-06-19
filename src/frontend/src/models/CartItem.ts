import Item from "./Item.ts";

export default interface CartItem {
    item: Item,
    quantity: number,
}