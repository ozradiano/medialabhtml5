var lastLine
function get() {
    $.ajax({
        url: 'http://clashers.milab.idc.ac.il/php/milab_get_chat_room.php',
        method: 'GET',
        success: function (data) {
            var jason = JSON.parse(data);
            if (jason.success == 1) {
                buildPage(jason.users);
                document.getElementById("chatContainer").scrollTop = 99999;
            }
            
        },
        error: function () {
            alert("error");
         }
     });
}
    
function buildPage(allLine) {
    var len = allLine.length;
    var table = document.getElementById("chatTable");
    table.innerHTML = "";
    for (var i = 0; i < len; i++) {
        var tr = document.createElement("tr");
        
        var tdName = document.createElement("td");
        tdName.className = "name";
        tdName.innerHTML = allLine[i].name + ":";
        
        var tdText = document.createElement("td");
        tdText.className = "text";
        tdText.innerHTML = allLine[i].text;
        
        var tdTime = document.createElement("td");
        tdTime.className = "time";
        tdTime.innerHTML = allLine[i].time;

        tr.appendChild(tdName);
        tr.appendChild(tdText);
        tr.appendChild(tdTime);
        table.appendChild(tr);
    }
}


$(document).ready(function() {
    function post() {
        $.ajax({
            url: 'http://clashers.milab.idc.ac.il/php/milab_send_message.php',
            method: 'POST',
            data: { 
                name: $("#name").val(), 
                text: $("#text").val() 
            },
            success: function (data) {
                var jason = JSON.parse(data);
                if (jason.success == 1) {
                    get();    
                }
            },
            error: function () {
              alert("error");
             }
         });
         $("#text").val("");
    }
    
    
    $("#submit").click(post);
    
    $("#name").focus(function() {
        $("#name").val("");
    });
    $("#text").focus(function() {
        $("#text").val("");
    });
    
    
    
    get();
    setInterval("get()", 5000);
});







