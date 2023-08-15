/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  
  let sum = 0;
  for(let each of data){
    sum += each.amount;
  }
  
  postMessage(Math.floor(sum/data.length));
});
