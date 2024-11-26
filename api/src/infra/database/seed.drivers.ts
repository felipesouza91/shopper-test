import { DriverModel } from "../../domain/models/driver.model"


type Driver = {
  id: number
  name: string
  description: string
  vehicle: string
  rating: number
  comment: string
  tax: number
  minKm: number
} 

const driver: Driver[] = [
  {
    id: 1,
    name: "Homer Simpson",
    description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
    vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
    rating: 2,
    comment: "Motorista simpático,mas errou o caminho 3vezes. O carro cheira adonuts.",
    tax: 2.50,
    minKm: 1
  },
  {
    id: 2,
    name: "Dominic Toretto",
    description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
    vehicle: "Dodge Charger R/T 1970 modificado",
    rating: 4,
      comment: "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
    tax: 5,
    minKm: 5
  },
  {
    id: 3,
    name: "James Bond",
    description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
    vehicle: "Aston Martin DB5 clássico",
    rating: 5,
    comment: "Serviço impecável! Omotorista é a própria definição de classe e o carro é simplesmente magnífico. Umaexperiência digna de um agente secreto.",
    tax: 10,
    minKm: 10
    
  }
]
 

export function seedDriver() {
  driver.forEach(async item => {
    await DriverModel.findOrCreate({
      where: {
        id: item.id
      },
      defaults: {
        ...item
      }
    })
  })
}