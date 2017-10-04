(function(){



var body = document.body;
var button = document.createElement('button');
button.innerHTML = "Test";
button.addEventListener('click',function(e){
    SendAjax('GET','/obj',function(result){
        var obj = JSON.parse(result);
        var elem = JPage2HTML(obj,'content');
        body.appendChild(elem);
        
    });
});
body.appendChild(button);



function SendAjax(method,url,callback){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        callback && callback( this.responseText );
        }
    };
    xhttp.open(method, url, true);
    xhttp.send();
}

function JPage2HTML(obj,name){
    var div = document.createElement('div');
    div.setAttribute('id',name);
    JNode(obj,div);
    return div;
}

function JNode(obj,node){
    for (var i in obj){
        //check if item is an object
        if (typeof obj[i] === 'object'){
            for(var j in obj[i]){
                //check if child is an attribute or event
                if (j == 'attr'){
                    JAttr(obj[i][j],node);
                }else if(j == 'event'){
                    JEvent(obj[i][j],node);
                }else{
                    var child = document.createElement(j);
                    node.appendChild(child);
                    //check if content of child is an array
                    if (obj[i][j].constructor === Array){
                        JNode(obj[i][j],child);
                    }
                    //if not, draws as inner html
                    else{
                        child.innerHTML = obj[i][j];
                    }
                }
            }
        }
        //if not, draws an html inner contents
        else{
            node.innerHTML = obj[i];
        }
    }
}

function JAttr(obj,node){
    for (i in obj){
        for (attr in obj[i]){
            var value = obj[i][attr];
            node.setAttribute(attr,value);
        }
    }
}

function JEvent(obj,node){
    for (i in obj){
        for (ev in obj[i]){
            var fn = eval("(" + obj[i][ev] + ")");
            node.addEventListener(ev,fn);
        }
    }
}

})();