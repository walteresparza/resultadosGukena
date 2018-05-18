var ua = 'TODO';
var claustro = 'T';
var categoria = 'R';
var grafico = null;
var tipo = 'pie';
var titulo;
var carpetajson;

$(function () {
    json = categoria +"_"+ ua +"_"+ claustro + '.json';
    llamadaAjax();

});
function cambioTablaGrafico(opcion, valor){
    if (opcion == 'ua') {
        ua = valor;
    } else if (opcion == 'claustro') {
        claustro = valor;
    } else if (opcion == 'categoria') {
        categoria = valor;
    } else
        console.log('Error variable inexistente');
    json = categoria +"_"+ ua +"_"+ claustro + '.json';
    cambioGrafico();
    llamadaAjax();
}
function llamadaAjax(){
$.ajax({
        url: carpetajson+json,
        dataType: 'json',
        cache: false,
        success: function(data) {
                                actualizarTabla(data);
                                actualizarGrafico(data);
                                actualizarTitulo(data);
                                }}); 
}
function actualizarTabla(data)
{
    $('#tabla').bootstrapTable('destroy');
    $('#tabla').bootstrapTable({
                                    data: data.data,
                                    columns: data.columns
                                });

}
function actualizarGrafico(data){
  // var arregloTotal = carga(data);
   if (grafico != null) {grafico.destroy();};
   grafico = new Chart(document.getElementById("grafico"), {
    type: tipo,//'pie',horizontalBar
    data: {
            labels: data.labels,
             datasets: [{
                        backgroundColor: "#3498db",// arregloTotal[0],
                        borderColor: "#1a5276",//arregloTotal[1],
                        borderWidth: 2,//arregloTotal[2],
                        data: data.total,
                      }]
           },
    options:{
             legend:{
                    display: false,//arregloTotal[3],
                    position: "top",//arregloTotal[4],
                },
                title: {
                        display: true,
                        text: data.titulo,
                        },
                        scales:{
                        	xAxes:[{ticks:{beginAtZero:true}}]
                        }
            },
    });
}
function carga(data){
    var i, salida=[], color=[], aux=arregloDeColore(), borderTam=[], borderColor=[];
    var display = (tipo=='pie')?true:false;
    var lado = (tipo=='pie')?"right":"top";
    for (i in data.data){
        borderTam[i]=2;
        borderColor[i]=(tipo=='pie')?'black':"#1a5276";
        color[i]= (tipo=='pie')?aux[i]:"#3498db";
    }
    salida.push(color);//se encuentran los colores que representan la lista [0]
    salida.push(borderColor);//se encuentra el color del borde de cada porcion en este caso black [1]
    salida.push(borderTam);//se encuentra el tamaño del borde de cada porcion en este caso es 2 [2]
    salida.push(display);//para la variable display true para pie falso horizBar [3]
    salida.push(lado); //para la posicion[4]
    return salida;
}
function arregloDeColore(){
    var salida = ["#5793F3","#DD4444","#FD9C35","#D4Df5A","#FEC42C","#5578C2","#DD4D79","#BD3B47"];
    return salida;
}
$(".dropdown-menu").on('click', 'li a', function(){
  var selText = $(this).children("h7").html();
 $(this).parent('li').siblings().removeClass('active');
  $(this).parents('.nav-item').find('.selection').html(selText);
  $(this).parents('li').addClass("active");
});
function actualizarTitulo(data){
document.getElementById('titulo').innerHTML = data.titulo;
document.getElementById('hora').innerHTML = data.fecha;
titulo=data.titulo;
}
function cambioGrafico(){
    if (ua == 'TODO' && claustro == 'T' && categoria == 'R') {
        tipo = 'pie';
    } else{
        tipo = 'horizontalBar';}
}
function exportarTabla(){
    $("#tabla").table2excel({
        name:titulo,
        filename: titulo
  });
}
function cambiar(carpeta) {
    carpetajson=carpeta;
}