function timeDiffCalc(jsonDate) {

  let dateFuture = new Date(jsonDate);
  let dateNow = new Date();

  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  diffInMilliSeconds -= 19750;

  const days = Math.floor(diffInMilliSeconds / 86400);

  diffInMilliSeconds -= days * 86400;

  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

  diffInMilliSeconds -= hours * 3600;

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  
  diffInMilliSeconds -= minutes*60;
  diffInMilliSeconds = Math.ceil(diffInMilliSeconds);

  if(days>0){
    return `${days} day`
  }

  if(hours>0){
    return `${hours} hour`
  }

  if(minutes > 0){
    return `${minutes} minutes`
  }

  return `${diffInMilliSeconds} seconds`
}

export default timeDiffCalc;