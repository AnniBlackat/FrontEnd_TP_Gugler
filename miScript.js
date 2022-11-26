const newLocal = true;
//esta función permite la activación del código javascript 
//una vez que el árbol DOM esté cargado, sin esperar a las 
//imágenes o los demás recursos. .ready
$( document ).ready(function(){
        
    //Creamos un arreglo que aparecera por defecto al ingresar, para que no se modifiquen los pokemon se lo hace estático
    let arrayPokemon=[2,5,6,7,8,9,4,55,1,22,36,150,236,21,15,10,16,23,50,60,48,69,30,222,105,207,27,59,41,80];
    //variable global
    let longitudDePokemon=arrayPokemon.length;
    let banderaBooleana=true;//empleada para verificar si es la primera vez que se cargan pokemon
    //Se crea una función cuya funcionalidad será recibir un vector con valores numericos de pokemon y buscará en la api los mismos
    cargarPokemonDefecto(arrayPokemon,0,arrayPokemon.length,banderaBooleana);
    //crearCardTipo();
    //Función realizada para cuando se desea ingresar a una card de la pantalla principal
    clickEnCardParaDetalles(arrayPokemon);


    //------------------------EVENTOS-----------------------------//

    //Si se efectúa un click sobre "Iniciar Sesión" se muestra el Modal
    //creado para dicha acción. El mismo se encuentra creado en el archivo
    //html de forma estática.
    $("#IniciarSesion").click(function(){
        $("#iniciar").modal('show');
    });

    //Si se efectúa un click sobre "Registrarse" se muestra el Modal
    //creado para dicha acción. El mismo se encuentra creado en el archivo
    //html de forma estática.
    $("#RegistroCuenta").click(function(){
        $("#registro").modal('show');
    });

      
     //Busca el pokemon al presiona enter
     //Busca el id formBusqueda
    $("#formBusqueda").submit(function (event) {
        let pokemonBuscado=$('#busquedaNombrePokemon').val();//obtenemos el nombre del pokemon de acuerdo a su id
        if (pokemonBuscado.length !== 0){ //si la longitud es distinta de cero el pokemon se encontró
            //nos aseguramos que al presionar enter no se recargue la pagina sin buscar el pokemon
            event.preventDefault();           
            //eliminamos si existe o no algun valor que pudiera tener el input
             $('#busquedaPokemon').empty();              
            //verificamos por consola si nos retorna algun valor
             console.log(pokemonBuscado);
             //creamos una card con el nombre del pokemon solicitado
            crearCardPokemonBuscado(pokemonBuscado);
            //mostramos en la sección derecha el pokemon 
            $('#busquedaPokemon').show();
        } else{
            //caso para el que no se halla ningun pokemon de acuerdo al nombre solicitado
            event.preventDefault(); 
            $('#busquedaPokemon').empty();           
        }
        
      });

     //Busca el pokemon y presiona el botón de buscar
     $("#botonBusqueda").click(function (event) {
        let pokemonBuscado=$('#busquedaNombrePokemon').val();//obtenemos el nombre del pokemon de acuerdo a su id
        if (pokemonBuscado.length !== 0){//si la longitud es distinta de cero el pokemon se encontró
            //eliminamos si existe o no algun valor que pudiera tener el input
            $('#busquedaPokemon').empty();
            //verificamos por consola si nos retorna algun valor         
            console.log(pokemonBuscado);
            //creamos una card con el nombre del pokemon solicitado
            crearCardPokemonBuscado(pokemonBuscado);
            //mostramos en la sección derecha el pokemon 
            $('#busquedaPokemon').show();
        } else{
             //caso para el que no se halla ningun pokemon de acuerdo al nombre solicitado
            $('#busquedaPokemon').empty();
            
        }
        
      });

      //Acción a realizar cuando se pasa a la pantalla de tipo de pokemon
      $("#TipoPokemonMenu").click(function (event){
       console.log("Estuvo por aquí");
       //Se elimina la sección que contenia las cards de pokemones
        $("#SeccionPokemon").empty();
        //Se crean cards con los tipos
        crearCardTipo();
        //Se muestran las cards de tipos
        $("#SeccionPokemon").show();
      });

      
      
    //-----------------------FUNCIONES---------------------------//

    //Función creada para cargar los pokemon que aparecerán por defecto.
    //Para esto lo que se realizó es pasar un arreglo con los mismos.
    //A partir del parametro no solo se crearán las card sino que también
    //se genera dinamicamente una división en html la cual contendrá
    //un botón de "Ver más" por si se desea seguir viendo más pokemon
    function cargarPokemonDefecto(arrayPokemonCarga, inicio, fin, primeraVez){        
        //antes de cargar pokemon verificamos si hubo modificación en el arreglo
        //Con ello logramos que se pueda acceder a cualquier detalle de pokemon,
        //sea por defecto o agregado.
        if(!primeraVez){
            longitudDePokemon=arrayPokemonCarga.length
        }
        console.log(arrayPokemonCarga.length);
        console.log(arrayPokemonCarga);
        for(i=inicio;i<fin;i++){
            crearCardPokemon(i,arrayPokemonCarga[i]);
        }
    }

    //Función creada para determinar el color de los tipos de pokemon
    //a emplear en cada ficha de detalle.
    function colorPorTipo(tipo){
        identificador="";
        switch(tipo){
            case "electric": identificador="Electrico"; break;
            case "bug": identificador="Insecto"; break;
            case "dark": identificador="Oscuro"; break;
            case "dragon": identificador="Dragon"; break;
            case "fairy": identificador="Hada"; break;
            case "fighting": identificador="Lucha"; break;
            case "fire": identificador="Fuego"; break;
            case "flying": identificador="Vuelo"; break;
            case "ghost": identificador="Fantasma"; break;
            case "grass": identificador="Planta"; break;
            case "ground": identificador="Tierra"; break;
            case "ice": identificador="Hielo"; break;
            case "normal": identificador="Normal"; break;
            case "poison": identificador="Veneno"; break;
            case "psychic": identificador="Psiquico"; break;
            case "rock": identificador="Roca"; break;
            case "steel": identificador="Metal"; break;
            case "water": identificador="Agua"; break;
            default: identificador="Defecto"; break;
        }
        return identificador;
    }     


    function clickEnCardParaDetalles(arrayPokemon){
        //let longitudDeArray=arrayPokemon.length;
        //recorremos el vector de pokemon para verificar en cuales se realizo click
        for(let i=0;i<longitudDePokemon;i++){
            //Se busca card que posea en respectivo id
          $('#pokemon'+i.toString()).click(function () {
              //Se obtiene el nombre del pokemon
              let nombreDePokemon= document.querySelector('#nombre'+i.toString()).textContent;
              //Se verifica que se obtiene
              console.log(nombreDePokemon);
              //Se realiza la verificación de si se obtuvo algun id correcto
              if(nombreDePokemon!=null){
                //Se limpia la sección con card
                $('#SeccionPokemon').empty();  
                //Escondemos si había algun pokemon buscado 
                $('#busquedaPokemon').hide(); 
                //Se crea la card cliqueada
                crearCardPokemonClickeado(nombreDePokemon);
              }
                  
          });
      }
      
    }

      
    //Función creada para que cuando se haga click sobre una card
    //se pueda acceder a la ficha de detalles del pokemon
    //Para esto se crea un card horizontal y se agrega de forma
    //dinámica html para la creación de la misma.
    function crearCardPokemonClickeado(nombreP){
        //se crea cada elemento necesario para la card
        const cabeceraPokemon=document.createElement('div')
        cabeceraPokemon.className="card-header text-capitalize text-center text-secondary border-0";
        cabeceraPokemon.id="nombre";        
        const articuloPokemon=document.createElement('article');
        //articuloPokemon.setAttribute('style','width: 70em');
        articuloPokemon.className="card mb-3 border-0";
        articuloPokemon.id="cartaClickeada";
        const fila=document.createElement('div');
        fila.className="row g-0";
        const columna1=document.createElement('div');
        columna1.className="col-md-4";
        const imagenPokemon=document.createElement('img');
        imagenPokemon.setAttribute('src','');
        imagenPokemon.className="card-img-top";
        imagenPokemon.id="pokemon";
        const columna2=document.createElement('div');
        columna2.className="col-md-8";
        const divisionPokemon=document.createElement('div');
        divisionPokemon.className="card-body";
        divisionPokemon.id="cardBody";
        const pieDeFicha=document.createElement('div');
        pieDeFicha.className="card-footer border-0 bg-white mt-3";
        pieDeFicha.id="pieFicha";
        const tipoPokemon=document.createElement('div');
        tipoPokemon.className="rounded-pill text-capitalize text-center text-white mb-1 mt-1";                            
        
        //se inserta cada elemento en el lugar deseado
        articuloPokemon.insertAdjacentElement("beforeend",cabeceraPokemon);
        articuloPokemon.insertAdjacentElement("beforeend",fila);
        fila.insertAdjacentElement("beforeend",columna1);
        columna1.insertAdjacentElement("beforeend",imagenPokemon);
        fila.insertAdjacentElement("beforeend",columna2);
        columna2.insertAdjacentElement("beforeend",divisionPokemon); 
        columna2.insertAdjacentElement("beforeend",pieDeFicha); 
        pieDeFicha.insertAdjacentElement("beforeend",tipoPokemon)

        //conforme al nombre pasado como parámetro de la función, nos aseguramos
        //que el mismo esté en minuscula para acceder a la url correcta
        let direccion="https://pokeapi.co/api/v2/pokemon/"+ nombreP.toLowerCase();
        console.log(direccion);
        //pido el recurso con la dirección armada previamente
        $.get(direccion,function(data){
          //verifico que se esté leyendo algo
          console.log(data);
          //tomo la imagen del pokemon y la aplico en el atributo src
          $("#"+"pokemon").attr('src',data.sprites.other.home.front_default);
          //modifico el contenido del titulo por el nombre del pokemon
          cabeceraPokemon.textContent=data.name;
          //Se verifica cuantos tipos posee el pokemon
          //Si la longitud del areglo types es igual a 2 se obtiene ambos datos
          if(data.types.length==2)
          {
            tipoPokemon.textContent=data.types[0].type.name;
            tipoPokemon.id=colorPorTipo(tipoPokemon.textContent);
            const tipoPokemon2=document.createElement('div');
            tipoPokemon2.className="rounded-pill text-capitalize text-center text-white mb-1 mt-1";
            pieDeFicha.insertAdjacentElement("beforeend",tipoPokemon2);
            tipoPokemon2.textContent=data.types[1].type.name;
            tipoPokemon2.id=colorPorTipo(tipoPokemon2.textContent);
          }else{ // en caso contrario el único tipo
            tipoPokemon.textContent=data.types[0].type.name;
            tipoPokemon.id=colorPorTipo(tipoPokemon.textContent);
          }
          
           //Creamos la "tabla" de habilidades
           const tablaHabilidadesFilas=document.createElement('div');
           tablaHabilidadesFilas.className="row text-capitalize mt-3 mb-1 fw-bold";       
           tablaHabilidadesFilas.id="Fila_Titulo_Habilidad";
           divisionPokemon.insertAdjacentElement("beforeend",tablaHabilidadesFilas);
           tablaHabilidadesFilas.textContent="HABILIDADES";
           for(h=0;h<data.abilities.length;h++){
             const tablaHabilidadesFilas=document.createElement('div');
             tablaHabilidadesFilas.className="row-8 text-capitalize ";       
             tablaHabilidadesFilas.id="Fila"+i;
             divisionPokemon.insertAdjacentElement("beforeend",tablaHabilidadesFilas);
             tablaHabilidadesFilas.textContent=data.abilities[h].ability.name;
           }

          //Creamos la tabla de puntos de base
          const tablaPuntosDeBaseFilas=document.createElement('div');
          tablaPuntosDeBaseFilas.className="row text-capitalize mt-3 mb-1 fw-bold";       
          tablaPuntosDeBaseFilas.id="Fila_Titulo_Puntos_De_Base";
          divisionPokemon.insertAdjacentElement("beforeend",tablaPuntosDeBaseFilas);
          tablaPuntosDeBaseFilas.textContent="PUNTOS DE BASE";
          for(let i=0;i<6;i++){
            //tabla de Puntos de Base.Necesito n filas, una para cada uno
           const tablaPuntosDeBaseFilas=document.createElement('div');
           tablaPuntosDeBaseFilas.className="row text-capitalize";       
           tablaPuntosDeBaseFilas.id="Fila"+i;
           
           divisionPokemon.insertAdjacentElement("beforeend",tablaPuntosDeBaseFilas);
                      
           //Obtenemos el que tipo es y el valor
           for(let j=0;j<2;j++){
               const tablaPuntosDeBaseColumnas=document.createElement('div');
                if(j==0){
                tablaPuntosDeBaseColumnas.textContent=data.stats[i].stat.name;
                tablaPuntosDeBaseColumnas.className="col-8 text-capitalize";
                }else{
                tablaPuntosDeBaseColumnas.textContent=data.stats[i].base_stat;
                tablaPuntosDeBaseColumnas.className="col text-end text-capitalize";
               }
               tablaPuntosDeBaseColumnas.id="Columna"+j;
               tablaPuntosDeBaseFilas.insertAdjacentElement("beforeend",tablaPuntosDeBaseColumnas);
           }
       }
      
          
          });
          $('#SeccionPokemon').append(articuloPokemon);
     }
   
             
    //Función creada para cuando se busca un pokemon en especifico
    //Se crea una card con los puntos de Base y las habilidades del
    //pokemon buscado
    function crearCardPokemonBuscado(nombreP){
        //se crea cada elemento necesario para la card
        const cabeceraPokemon=document.createElement('div')
        cabeceraPokemon.className="card-header text-capitalize text-center text-secondary border-0";
        cabeceraPokemon.id="nombre";
        const articuloPokemon=document.createElement('article');
        //articuloPokemon.setAttribute('style','width: 20rem');
        articuloPokemon.className="card border-0";
        articuloPokemon.id="cartaBusqueda";
        const imagenPokemon=document.createElement('img');
        imagenPokemon.setAttribute('src','');
        imagenPokemon.className="card-img-top";
        imagenPokemon.id="pokemonBuscado";
        const divisionPokemon=document.createElement('div');
        divisionPokemon.className="card-body";
        const pieDeFicha=document.createElement('div');
        pieDeFicha.className="card-footer border-0";
        const tipoPokemon=document.createElement('div');
        tipoPokemon.className="rounded-pill text-capitalize text-center text-white";
       
         //se inserta cada elemento en el lugar deseado                  
        articuloPokemon.insertAdjacentElement("beforeend",cabeceraPokemon);
        articuloPokemon.insertAdjacentElement("beforeend",imagenPokemon);
        articuloPokemon.insertAdjacentElement("beforeend",divisionPokemon);       
        //divisionPokemon.insertAdjacentElement("beforeend",nombrePokemon);
        //divisionPokemon.insertAdjacentElement("beforeend",tablaHabilidades);
        articuloPokemon.insertAdjacentElement("beforeend",pieDeFicha);
        pieDeFicha.insertAdjacentElement("beforeend",tipoPokemon)
        //conforme al nombre anterior busco el pokemon y concateno en el url
        let direccion="https://pokeapi.co/api/v2/pokemon/"+ nombreP.toLowerCase();
        console.log(direccion);
         //pido el recurso con la dirección armada previamente
         $.ajax({
            url : direccion,
            type:'GET',
            dataType : 'json',
            success: function(){
                $.get(direccion,function(data){
                    //verifico que se esté leyendo algo
                    console.log(data);
                    console.log("nombre");
                    console.log(data.name==" ");
                    //tomo la imagen del pokemon y la aplico en el atributo src
                    $("#"+"pokemonBuscado").attr('src',data.sprites.other.home.front_default);
                     //modifico el contenido del titulo por el nombre del pokemon
                    cabeceraPokemon.textContent=data.name;
                    if(data.types.length==2)
                    {
                      tipoPokemon.textContent=data.types[0].type.name;
                      tipoPokemon.id=colorPorTipo(tipoPokemon.textContent);
                      const tipoPokemon2=document.createElement('div');
                      tipoPokemon2.className="rounded-pill text-capitalize text-center text-white";
                      pieDeFicha.insertAdjacentElement("beforeend",tipoPokemon2);
                      tipoPokemon2.textContent=data.types[1].type.name;
                      //dependiendo de los tipos se asigna un color diferente a cada elemento
                      tipoPokemon2.id=colorPorTipo(tipoPokemon2.textContent);
                    }else{
                      tipoPokemon.textContent=data.types[0].type.name;
                      tipoPokemon.id=colorPorTipo(tipoPokemon.textContent);
                    }
                    //Creamos la "tabla" de habilidades
                    const tablaHabilidadesFilas=document.createElement('div');
                    tablaHabilidadesFilas.className="row text-capitalize mt-3 mb-1 fw-bold";       
                    tablaHabilidadesFilas.id="Fila_Titulo_Habilidad";
                    divisionPokemon.insertAdjacentElement("beforeend",tablaHabilidadesFilas);
                    tablaHabilidadesFilas.textContent="HABILIDADES";
                    for(h=0;h<data.abilities.length;h++){
                      const tablaHabilidadesFilas=document.createElement('div');
                      tablaHabilidadesFilas.className="row-8 text-capitalize ";       
                      tablaHabilidadesFilas.id="Fila"+i;
                      divisionPokemon.insertAdjacentElement("beforeend",tablaHabilidadesFilas);
                      tablaHabilidadesFilas.textContent=data.abilities[h].ability.name;
                    }
                    
                    //Creamos la tabla de puntos de base
                    const tablaPuntosDeBaseFilas=document.createElement('div');
                    tablaPuntosDeBaseFilas.className="row text-capitalize mt-3 mb-1 fw-bold";       
                    tablaPuntosDeBaseFilas.id="Fila_Titulo_Puntos_De_Base";
                    divisionPokemon.insertAdjacentElement("beforeend",tablaPuntosDeBaseFilas);
                    tablaPuntosDeBaseFilas.textContent="PUNTOS DE BASE";
                    for(let i=0;i<6;i++){
                      //tabla de Puntos de Base.Necesito n filas, una para cada uno
                     const tablaPuntosDeBaseFilas=document.createElement('div');
                     tablaPuntosDeBaseFilas.className="row text-capitalize";       
                     tablaPuntosDeBaseFilas.id="Fila"+i;
                     
                     divisionPokemon.insertAdjacentElement("beforeend",tablaPuntosDeBaseFilas);
                                
                     //Obtenemos el que tipo es y el valor
                     for(let j=0;j<2;j++){
                         const tablaPuntosDeBaseColumnas=document.createElement('div');
                          if(j==0){
                          tablaPuntosDeBaseColumnas.textContent=data.stats[i].stat.name;
                          tablaPuntosDeBaseColumnas.className="col-8 text-capitalize";
                          }else{
                          tablaPuntosDeBaseColumnas.textContent=data.stats[i].base_stat;
                          tablaPuntosDeBaseColumnas.className="col text-end text-capitalize";
                         }
                         tablaPuntosDeBaseColumnas.id="Columna"+j;
                         tablaPuntosDeBaseFilas.insertAdjacentElement("beforeend",tablaPuntosDeBaseColumnas);
                     }
                 }
                
                    
                    });
                    $('#busquedaPokemon').append(articuloPokemon);
             },
             error : function() {
                alert('Nombre de pokemon no válido.');
            },
            });
            
        }    
    
    //Se crean la función para las card de pokemon que se verán en el inicio del sitio
    function crearCardPokemon(valorId,numeroPokemon){
        //se crean los elementos necesarios para las card que aparecen por defecto
        const columna=document.createElement('div');
        columna.className="col";
        const articuloPokemon=document.createElement('article');
        //articuloPokemon.setAttribute('style','width: 10em',);
        articuloPokemon.className="card border-0";
        articuloPokemon.id="cartas";
        articuloPokemon.setAttribute('data-clickable','true');
        articuloPokemon.setAttribute('data-href','registrarse.html');
        const imagenPokemon=document.createElement('img');
        imagenPokemon.setAttribute('src','');
        imagenPokemon.className="card-img-top";
        imagenPokemon.id="pokemon"+valorId.toString();
        const divisionPokemon=document.createElement('div');
        divisionPokemon.className="card-body";
        const nombrePokemon=document.createElement('h5');
        nombrePokemon.className="card-title text-capitalize text-center text-secondary text-nowrap";
        nombrePokemon.id="nombre"+valorId.toString();
               
        
         //se inserta cada elemento en el lugar deseado
        columna.insertAdjacentElement("beforeend",articuloPokemon);
        articuloPokemon.insertAdjacentElement("beforeend",imagenPokemon);
        articuloPokemon.insertAdjacentElement("beforeend",divisionPokemon);
        divisionPokemon.insertAdjacentElement("beforeend",nombrePokemon);
        
        //conforme al numero anterior busco el pokemon y concateno en el url
        let direccion="https://pokeapi.co/api/v2/pokemon/"+ numeroPokemon.toString();
        //pido el recurso con la dirección armada previamente
        $.get(direccion,function(data){
        //tomo la imagen del pokemon y la aplico en el atributo src
        $("#"+"pokemon"+valorId.toString()).attr('src',data.sprites.other.home.front_default);
        //modifico el contenido del titulo por el nombre del pokemon
        nombrePokemon.textContent=data.name;});

        $('#FilaPokemon').append(columna);
            
        
    }
   
    function crearCardTipo(){
        //se crean los elementos necesarios para las card que aparecen por defecto
        for(i=0;i<18;i++){
            console.log("Pasó");
            const articuloPokemon=document.createElement('article');
            articuloPokemon.setAttribute('style','width: 10rem',);
            articuloPokemon.className="card border-0";
            articuloPokemon.id="cartas";
            articuloPokemon.setAttribute('data-clickable','true');
            articuloPokemon.setAttribute('data-href','registrarse.html');
            const imagenPokemon=document.createElement('img');
            imagenPokemon.setAttribute('src','');
            imagenPokemon.className="card-img-top";
            imagenPokemon.id="pokemon";
            const divisionPokemon=document.createElement('div');
            divisionPokemon.className="card-body";
            const nombrePokemon=document.createElement('h5');
            nombrePokemon.className="card-title text-capitalize text-center text-secondary";
            nombrePokemon.id="nombre";
    
            articuloPokemon.insertAdjacentElement("beforeend",imagenPokemon);
            articuloPokemon.insertAdjacentElement("beforeend",divisionPokemon);
            divisionPokemon.insertAdjacentElement("beforeend",nombrePokemon);

            $("#"+"TipoPokemon").attr('src','TipoAcero.png');
            $('#SeccionPokemon').append(articuloPokemon);

        }
      
        
        
    }
      
    

  });