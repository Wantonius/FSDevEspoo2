window.onload = function() {

    let src = new EventSource("/sse_events");
    src.onopen = function(event) {
        console.log("event stream open");
        console.log(event);
    }
    src.onmessage = function(event) {
        document.getElementById("timeslot").innerHTML = event.data
    }
}
