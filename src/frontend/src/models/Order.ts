import type Address from './Address.ts'
import type CartItem from './CartItem.ts'

export default interface Order {
  address: Address
  userID: number
  items: CartItem[]
  totalPrice: number
}
