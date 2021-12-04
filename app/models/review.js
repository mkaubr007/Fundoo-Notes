//write a program to generate an array of 300 random even number.Use reduce method of the sum of same array

const array=[]
for(i=0;i<=300;i++){
    array.push(i)
}
console.log(array)
const evenNumber=array.filter(ele=>ele%2==0)
console.log(evenNumber)
const total=evenNumber.reduce((a,b)=>a+b,0)
console.log(total)
   
   

