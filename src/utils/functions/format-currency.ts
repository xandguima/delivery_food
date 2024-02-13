export function formatCurerncy(value:number){
  return value.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL",
  })
}