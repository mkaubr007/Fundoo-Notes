//write a program to print pattern of below no
const num=5
let n1=0,n2=1,nexterm;
for(let i=1;i<=num;i++){
    nexterm=n1+n2;
    n1=n2;
    n2=nexterm;
    console.log(n1);
}