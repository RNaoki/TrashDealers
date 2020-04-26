var initial_url = "http://localhost:3000/";

var trash = {
    adiciona: 0,
    change_page: function(){
        email = document.getElementById('email').value
        pw = document.getElementById('pw').value
        var url = 'http://25.117.120.200:5000/usuarios/usuario/email&' + email
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            cors: true ,
            contentType:'application/json',
            secure: true,
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
            beforeSend: function (xhr) {
              xhr.setRequestHeader ("Authorization", "Basic " + btoa(""));
            },
            success: function(data) {
                localStorage.setItem('user', data[0].idUsuario)
                if(pw == data[0].senha){
                    
                    if(data == []){
                    }
                    else{
                        localStorage.setItem('points', data[0].pontos)
                    }
                }
            window.location.href = initial_url + '/points.html';
            }
        })
    },
    
    load_points: function(){
        document.getElementById('points').innerHTML = localStorage.getItem('points')
    },

    exchange_page: function(){
        window.location.href = initial_url + 'exchange.html';
    },

    points_page: function(){
        window.location.href = initial_url + 'points.html';
    },

    recycle_page: function(){
        window.location.href = initial_url + 'recycle.html';
    },

    work_page: function(){
        window.location.href = initial_url + 'work.html';
    },
    
    food_page: function(){
        window.location.href = initial_url + 'food.html';
    },

    sales_page: function(){
        window.location.href = initial_url + 'sales.html';
    },

    create_page: function(){
        window.location.href = initial_url + 'create.html';
    },

    back_page: function(){
        window.location.href = initial_url;
    },

    create_account: function(){

        var name =  document.getElementById('name').value
        var lastName =  document.getElementById('lastName').value
        var email =  document.getElementById('email').value
        var nick =  document.getElementById('nick').value
        var pw =  document.getElementById('pw').value

        var url = 'http://25.117.120.200:5000/usuarios/create/' + name + '&'+ lastName + '&' + email + '&' + nick + '&' + pw

        $.ajax({
            url: url,
            crossDomain: true,
            type: 'POST',
            success: function(data) {
                window.location.href = initial_url; 
            }
        });

    },

    create_point: function(){
        var e = document.getElementById("category");
        var value = e.options[e.selectedIndex].id;
        var quantia =  document.getElementById('quantia').value
        var url = 'http://25.117.120.200:5000/usuarios/usuario/' + localStorage.getItem('user') + '/updatePontos/+&' + trash.adiciona
        var url2 = 'http://25.117.120.200:5000/coletas/create/' + quantia + '&' + value + '&' + localStorage.getItem('user') + '&1'
        var url3 = 'http://25.117.120.200:5000/usuarios/usuario/id&' + localStorage.getItem('user')

        $.ajax({
            url: url,
            crossDomain: true,
            type: 'POST',
            success: function(data) {
                $.ajax({
                    url: url2,
                    crossDomain: true,
                    type: 'POST',
                    success: function(data) {
                        $.ajax({
                            url: url3,
                            crossDomain: true,
                            type: 'GET',
                            success: function(data) {
                                localStorage.setItem('points', data[0].pontos)
                                window.location.href = initial_url + '/points.html'; 
                            }
                        });
                    }
                });
            }
        });

        
    },

    pay_point: function(value){
        var url = 'http://25.117.120.200:5000/usuarios/usuario/' + localStorage.getItem('user') + '/updatePontos/-&' + value
        var url2 = 'http://25.117.120.200:5000/usuarios/usuario/id&' + localStorage.getItem('user')

        $.ajax({
            url: url,
            crossDomain: true,
            type: 'POST',
            success: function(data) {
                $.ajax({
                    url: url2,
                    crossDomain: true,
                    type: 'GET',
                    success: function(data) {
                        localStorage.setItem('points', data[0].pontos)
                        window.location.href = initial_url + '/points.html'; 
                    }
                });
            }
        });

        
    },

    read: function() {
        var url = 'http://25.117.120.200:5000/reciclaveis/reciclavel/todos';
        var html="";
        $.ajax(
            {
                type: 'GET',
                url: url,
                dataType: 'json'
            }
        ).done(function(data) {
            html += '<label for="type">Category: </label>';
            html += '<select id="category" onchange="trash.change_value()" >';
            html += '<option disabled selected value> -- select an option -- </option>';
            for(value in data) {
                html += "<option id=" + data[value].idReciclavel + " value=" + data[value].valor + ">" + data[value].nome + "</option>";
            }
            html += "</select></label>";
        
            document.getElementById("content").innerHTML = html;
        })
            .fail(
                function(jqXHR, textStatus, err) {
                    console.log('AJAX error response:', textStatus);
                }
            );
    },

    change_value: function(){
        var e = document.getElementById("category");
        var value = e.options[e.selectedIndex].value;
        trash.adiciona = document.getElementById('quantia').value * value
    }


}

function test(){
    alert("Msg de teste");
}