interface Point{
    x:number
}
interface Bear extends Point{
    y:string
}


const b:Bear={
    x:23,
    y:'123'
}

console.log(b.x);
