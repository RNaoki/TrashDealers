var initial_url = "http://localhost:3000/";
var server = "http://ec2-100-25-156-187.compute-1.amazonaws.com:5000/"
var trash = {
    adiciona: 0,
    gastar_pontos :0,
    change_page: function(){
        email = document.getElementById('email').value
        pw = document.getElementById('pw').value
        var url = server + 'usuarios/usuario/' + email
        var url2 = server + 'usuarios/usuario/email&' + email
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
                        if(btoa(pw) == data[0].senha){
                            $.ajax({
                                url: url2,
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
                                success: function(values) {
                                    localStorage.setItem('user', values[0].idUsuario)
                                    if(values == []){
                                    }
                                    else{
                                        localStorage.setItem('points', values[0].pontos)
                                    }
                                    window.location.href = initial_url + 'points.html';
                                }
                            });
                        }
                    }
                });
            }
        });
    },
    
    load_points: function(){
        document.getElementById('points').innerHTML = localStorage.getItem('points')
    },

    exchange_page: function(){
        window.location.href = initial_url + 'sales.html';
    },

    points_page: function(){
        window.location.href = initial_url + 'points.html';
    },

    recycle_page: function(){
        window.location.href = initial_url + 'recycle.html';
    },

    create_page: function(){
        window.location.href = initial_url + 'create.html';
    },

    back_page: function(){
        window.location.href = initial_url;
    },

    chart_page: function(){
        window.location.href = initial_url + 'chart.html';
    },

    create_account: function(){

        var name =  document.getElementById('name').value
        var lastName =  document.getElementById('lastName').value
        var email =  document.getElementById('email').value
        var nick =  document.getElementById('nick').value
        var pw =  document.getElementById('pw').value

        var url = server + 'usuarios/create/' + name + '&'+ lastName + '&' + email + '&' + nick + '&' + btoa(pw)

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
        var url = server + 'usuarios/usuario/' + localStorage.getItem('user') + '/updatePontos/+&' + trash.adiciona
        var url2 = server + 'coletas/create/' + quantia + '&' + value + '&' + localStorage.getItem('user') + '&1'
        var url3 = server + 'usuarios/usuario/id&' + localStorage.getItem('user')

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
                                window.location.href = initial_url + 'points.html'; 
                            }
                        });
                    }
                });
            }
        });

        
    },

    open_sidebar: function(){
        if(document.getElementById("menu").style.display == "none" || document.getElementById("menu").style.display == ""){
            document.getElementById("menu").style.width = "15%";
            document.getElementById("menu").style.display = "block";
            document.getElementById("right").style.width = "85%";
            document.getElementById("right").style.marginLeft = "15%";
            document.getElementById("abre_fecha").style.left = "15%";
        }else{
            document.getElementById("menu").style.width = "0%";
            document.getElementById("menu").style.display = "none";
            document.getElementById("right").style.width = "100%";
            document.getElementById("right").style.marginLeft = "0";
            document.getElementById("abre_fecha").style.left = "0";

        }
        
    },

    pay_point: function(){
        var url = server + 'usuarios/usuario/' + localStorage.getItem('user') + '/updatePontos/-&' + this.gastar_pontos
        var url2 = server + '/historicoResgatesPremio/create/' + this.gastar_pontos + '&1' + '&' + localStorage.getItem('user')
        var url3 = server + 'usuarios/usuario/id&' + localStorage.getItem('user')

        $.ajax({
            url: url,
            crossDomain: true,
            type: 'POST',
            success: function(data) {
                $.ajax({
                    url: url3,
                    crossDomain: true,
                    type: 'GET',
                    success: function(data) {
                        localStorage.setItem('points', data[0].pontos)
                        $.ajax({
                            url: url2,
                            crossDomain: true,
                            type: 'POST',
                            success: function(data) {
                                $.ajax({
                                    url: url2,
                                    crossDomain: true,
                                    type: 'POST'
                                });
                                window.location.href = initial_url + '/sales.html'; 
                            }
                        })
                    }
                });
            }
        });
        this.gastar_pontos = 0;

        
    },

    read: function() {
        var url = server + '/reciclaveis/todos';
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
    },

    show: function(appear, disapear){
        appear.style.opacity = "1";
        disapear.style.opacity = "0";
        appear.style.height = "200px";

    },

    hide:function (appear, disapear) {
        appear.style.opacity = "0";
        disapear.style.opacity = "1";
        appear.style.height = "0px";


    },

    populate_teste:function(id){
        
        if(id == "changeReverse1"){
            this.gastar_pontos = 500;
            var html = "";
            html += "<img class='logos_promo'  src='assets/img/logo-adidas.png'>";
            html += "<p class='custo'> Custo: " + this.gastar_pontos +" pontos</p>"
            html += "<p style='color: #212121; margin-top: -2px;'>Condições da oferta:</p>";
            html += "<p class='oferta'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.";
            html += "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.</p>";
            document.getElementById("condicoes").innerHTML = html;
            
        }
        if(id == "changeReverse2"){
            this.gastar_pontos = 250;
            var html = "";
            html += "<img class='logos_promo'  src='assets/img/logo-centauro.png'>";
            html += "<p class='custo'> Custo: " + this.gastar_pontos +" pontos</p>"
            html += "<p style='color: #212121; margin-top: -2px;'>Condições da oferta:</p>";
            html += "<p class='oferta'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.";
            html += "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.</p>";
            document.getElementById("condicoes").innerHTML = html;
            
        }
        if(id == "changeReverse3"){
            this.gastar_pontos = 1500;
            var html = "";
            html += "<img class='logos_promo'  src='assets/img/logo-extra.png'>";
            html += "<p class='custo'> Custo: " + this.gastar_pontos +" pontos</p>"
            html += "<p style='color: #212121; margin-top: -2px;'>Condições da oferta:</p>";
            html += "<p class='oferta'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.";
            html += "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.</p>";
            document.getElementById("condicoes").innerHTML = html;
            
        }
        if(id == "changeReverse4"){
            this.gastar_pontos = 1000;
            var html = "";
            html += "<img class='logos_promo'  src='assets/img/logo-ifood.png'>";
            html += "<p class='custo'> Custo: " + this.gastar_pontos +" pontos</p>"
            html += "<p style='color: #212121; margin-top: -2px;'>Condições da oferta:</p>";
            html += "<p class='oferta'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.";
            html += "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.</p>";
            document.getElementById("condicoes").innerHTML = html;
            
        }
        if(id == "changeReverse5"){
            this.gastar_pontos = 750;
            var html = "";
            html += "<img class='logos_promo'  src='assets/img/logo-nike.png'>";
            html += "<p class='custo'> Custo: " + this.gastar_pontos +" pontos</p>"
            html += "<p style='color: #212121; margin-top: -2px;'>Condições da oferta:</p>";
            html += "<p class='oferta'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.";
            html += "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
            html += "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an";
            html += "unknown printer took a galley of type and scrambled it to make a type specimen book.";
            html += "It has survived not only five centuries, but also the leap into electronic typesetting,";
            html += "remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset";
            html += "sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like";
            html += "Aldus PageMaker including versions of Lorem Ipsum.</p>";
            document.getElementById("condicoes").innerHTML = html;
            
        }
    },

    abrejanela:function(id) {
        this.populate_teste(id);
        document.getElementById("myModal").style.display = "block";
        
    },
    botaoscroll:function(){
        document.getElementById('right_2').scrollIntoView({behavior:"smooth"});
    }


}



var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    document.getElementById("myModal").style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}
    


