export interface CabinsProps{
  id: number,
  name: string,
  maxCapacity: number,
  regularPrice: number,
  discount: number,
  image: string
}
export interface UserProps{
  fullName:string
  email:string
  nationality:string
  countryFlag:string
  nationalID:string
}