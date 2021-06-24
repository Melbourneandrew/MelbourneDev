var createTimer = function(){
  return {
    ms: 0,
    clock: 0,
    start: function(){
      //start incrimenting ms every millisecond
      this.clock = setInterval(() => {this.ms += 10;}, 10);
    },
    stop: function(){clearInterval(this.clock)},
    clear: function(){this.ms = 0;},
    time: function(){

      //work out time units
      var milliseconds = this.ms;
      var seconds = Math.floor(milliseconds / 1000);
      milliseconds = milliseconds - (seconds*1000);

      var minutes = Math.floor(seconds / 60);
      seconds = seconds - (minutes * 60);

      var hours = Math.floor(minutes / 60);
      minutes = minutes - (hours * 60);

      //force two or three digits
      hours = hours.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      minutes = minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      seconds = seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      milliseconds = milliseconds.toLocaleString('en-US', {
        minimumIntegerDigits: 3,
        useGrouping: false
      })

      //return time string
      return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }
  }
}
