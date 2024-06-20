export type CategoryType = 'CARPET' | 'BEER'

export default interface Item {
  id: number,
  name: string,
  price: number,
  category: CategoryType,
  description: string,
  imgUrl?: string,
}