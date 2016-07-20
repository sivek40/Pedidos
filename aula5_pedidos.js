/**
 * aula5_pedidos.js
 */

$(document).ready(function(){
  //$('<td>1</td><td>123-456</td><td>Amortecedor</td><td>4</td><td class="valor">R$ 356,00</td><td class="valor">R$ 1.424,00</td>').appendTo($('#lista tbody'));
  
  var totalGeral = 0;

  $('button.add').click(function(){

    var formValido = true;
    
    $('#form div.erro').removeClass('erro');
    
    $('#form input, #form select').each(function (index, elem){
      if($(elem).val() == ''){
	$(elem).parent().addClass('erro');
	formValido = false;
      }
    });
    
    if (formValido == false) return;
    
    var cod = $('[name="produto-cod"]').val();
    var produto = $('[name="produto"]').val();
    var quant = $('[name="quant"]').val();
    var valUnit = $('[name="val-unit"]').data('valor');

    valUnit = parseFloat(valUnit).toFixed(2);
    var valTotal = valUnit * quant;
    var numItem = $('tbody tr').length + 1;
    $('[name="produto-cod"]').val('');
    $('[name="produto"]').val('');
    $('[name="quant"]').val('');
    $('[name="val-unit"]').val('');
    
    totalGeral += valTotal;
      
    $('#lista tbody').append('<tr><td>'+numItem+'</td><td>'+cod+'</td><td>'+produto+'</td><td>'+quant+'</td><td class="valor">'+formataReais(parseFloat(valUnit))+'</td><td class="valor">'+formataReais(parseFloat(valTotal))+'</td></tr>');
    
    $('#lista tfoot .valor span').html(formataReais(totalGeral));
       
  });
  
  $('.quant').keydown(function(evento){
    console.log(evento.keyCode);
    if (evento.keyCode == 08) return true; //back space
    if (evento.keyCode == 37) return true; //seta esquerda
    if (evento.keyCode == 39) return true; //seta direita
    if (evento.keyCode == 35) return true; //end
    if (evento.keyCode == 36) return true; //home
    if (evento.keyCode == 46) return true; //del
    if (evento.keyCode == 190 ||evento.keyCode == 110) return true; //(.) ponto
    if (evento.keyCode == 188 ||evento.keyCode == 108) return true; //(,) virgula
		      
    if ((evento.keyCode >= 48 && evento.keyCode <= 57) || (evento.keyCode >= 96 && evento.keyCode <= 105) ){
      return true;
    } else {
      return false;
    }
  });
  
  $('.val-unit').keydown(function(evento){
    console.log(evento.keyCode);
    if (evento.keyCode == 08) return true; //back space
    if (evento.keyCode == 37) return true; //seta esquerda
    if (evento.keyCode == 39) return true; //seta direita
    if (evento.keyCode == 35) return true; //end
    if (evento.keyCode == 36) return true; //home
    if (evento.keyCode == 46) return true; //del
    if (evento.keyCode == 190 ||evento.keyCode == 110) return true; //(.) ponto
    if (evento.keyCode == 188 ||evento.keyCode == 108) return true; //(,) virgula

    evento.preventDefault();
		      
    if ((evento.keyCode >= 48 && evento.keyCode <= 57) || (evento.keyCode >= 96 && evento.keyCode <= 105) ){
      var val = $('.val-unit').data('valor') || '';
      var digitado = String.fromCharCode(evento.keyCode);
      
      console.log(val+digitado);
      
      $('.val-unit').data('valor', val+digitado);
      $('.val-unit').val(formataReais(val+digitado));
      
      return true;
    } else {
      return false;
    }
  });
  
  $('.produto-nome').change(function(e){
    $('[name="produto-cod"]').val($(this).val());
  });
  
  $('[name="produto-cod"]').keyup(function(evento){
    var elem  = pesquisaProduto($(this).val());
    if (elem != null){
      $('.produto-nome').val(elem.cod);
    } else {
      $('.produto-nome').val("");
    }
  });
 
  var listaProdutos = [];
  
  jQuery.getJSON('aula5_produtos.json',function(data){
    
    listaProdutos = data;
    
    $(data).each(function(idx, elem){
      $('.produto-nome').append('<option value="'+elem.cod+'">'+elem.nome+'</option>');
    })
  
  pesquisaProduto(1236);
  });

  /*
  jQuery.get('aula5_produtos.json',function(data){
    var dados = JSON.parse(data);
    console.log(dados);
  });
*/
  
  function formataReais(valor){
    valor = parseFloat(valor);
    var formatado = "R$ ";
    var vlInicial = valor.toFixed(2).toString();
    var partes = vlInicial.split('.');
    var int = partes[0];
    var mil = "";
    
    while (int.length > 3) {
      mil = "." + int.substr(-3,3) + mil;
      int = int.substr(0, int.length - 3);
    }
    
    formatado += int + mil + "," + partes[1];
    return formatado;
  }

  function pesquisaProduto(cod){
    for (idx in listaProdutos){
      var codigo = listaProdutos[idx].cod.toString();
      if (codigo.search(cod) == 0){
	return listaProdutos[idx];
      }
    }
  }
  
});