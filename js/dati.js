// Variabili globali per il login
var usernameLoginApp;
 function checkInternet() 
 {
    
     var online = window.navigator.onLine;
            if (online) {
                return true;
            } else {
                return false;
            }
  }

  

// Prelevo i dati dal server
function caricoDatiServerSalvoInDb ()
{
       alert("Si");
       var connessione = checkInternet();
       if (connessione==true) {
          // Prima bisonga cancellare un db se già essitente è crearlo se non esiste
          db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
          db.transaction(
                            // Metodo di chiamata asincrona
                            function(tx) {
                                            tx.executeSql("DROP TABLE IF EXISTS clienti");
                                            tx.executeSql("CREATE TABLE IF NOT EXISTS clienti (id INTEGER PRIMARY KEY AUTOINCREMENT,identificativo, nome, cognome, email,foto)");
                                          },
                             function () {
                                            // alert("Errore");
                                         },
                             function(){
                                           // alert("Cancellazione effettuata");
                                        }
            )
            // Prelevo dati dal server
                $.getJSON("http://www.trovoperte.com/admin/CS_Sync.aspx", function (dati) {
                    var li_dati = "";
                    $.each(dati, function (i, name) {
                        // Inserisco dati nel db sqllite dell' App
                       db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
                       db.transaction(
                            // Metodo di chiamata asincrona
                            function(tx) {
                                            tx.executeSql("INSERT INTO clienti (identificativo,nome,cognome,email,foto) VALUES (?,?,?,?,?)",[name.ID,name.nome,name.cognome,name.email,name.foto]);
                                          },
                                            onDbError,
                             function(){
                                          //  alert("Inserimento effettuato");
                                         }
                    )
                    });
                      selezionoDati ();
                });
               
            } else {
                // Carico i dati dal db se è stato creato almeno una volta
                 selezionoDati ();

            }
            
}



function selezionoDati ()
{
    
   db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);  
   db.transaction(select,successoSelect);                    
}

function select(tx)
{
       tx.executeSql("SELECT C.ID as ID_notifica,  N.*, C.* FROM notizie as N, notifiche as C WHERE C.ID_notizia=N.ID",[], successoSelect,erroreSelect);     
}

function successoSelect(tx,dati)
{
    var len = dati.rows.length;
        var li_dati="";
        if(len!=0)
        {
             
             for(var i=0; i<len; i++)
            {
                var data = dati.rows.item(i).data_ora;
                var splitarray = new Array();
                splitarray = data.split(" ");
                var dataDue = splitarray[0];
                var arrayData = new Array ();
                arrayData = dataDue.split("-");
                var dataCorretta = arrayData[2] + "-" + arrayData[1] + "-" + arrayData[0] + " " + splitarray[1];
              /*  li_dati += "<li id="+dati.rows.item(i).ID_notifica+" data-itemid="+dati.rows.item(i).ID_notizia+"><a class='detail' href='#'><img src='http://89.36.209.130/scan_dispositivi/public/upload_gallery/immagini/"+dati.rows.item(i).immagine+"'/>";
                li_dati+="<h6 style='font-size:14px;color:#AE1C1F'>" + dati.rows.item(i).ID_notifica +"-"+ dati.rows.item(i).titolo +  "</h6> <p style='text-align:left !important;font-size:10px'><b>Data notifica: </b>" + dataCorretta + "</p> <p style='font-size:10px; text-align:left !important;'>";
                li_dati+="<b>Descrizione: </b>"+dati.rows.item(i).descrizione+"</p></a><a  class='storage' href='#purchase' data-rel='popup' data-position-to='window' data-transition='pop'>Cancella</a></li>";*/
                li_dati+="<div id="+dati.rows.item(i).ID_notifica+" data-itemid="+dati.rows.item(i).ID_notizia+" class='single-news animated fadeinright delay-2'><h4 class='single-news-title'><a class='detail' href='#' >"+dati.rows.item(i).titolo+"</a>";
                li_dati+="</h4><div class='margin-bottom-5'><span class='single-news-category'>"+dataCorretta+"</span></div><div class='single-news-channel'>"+dati.rows.item(i).descrizione+"</div>";
                li_dati+="<div class='storage btn_cancella_notifica'><i id='cancellaNot'  class='ion-close'></i></div>";
                li_dati+="<div class='clr'></div></div>";
            }
           /*  $("#cancellaTutteNotifiche").show();
             $("#noNotifiche").hide();*/
        }else{
           /*   $("#cancellaTutteNotifiche").hide();
             $("#noNotifiche").show();*/
            
        }
       // Permette di "appendere" il codice html creato in dinamico con i dati
     /*  $("#lista_datiJson").append(li_dati).promise().done(function () {
         $(this).listview("refresh");
        });*/
         $("#lista_datiJson").append(li_dati);
       /*   <div class="single-news animated fadeinright delay-2">
              <h4 class="single-news-title">
                <a href="article.html">That I neglect my talents</a>
              </h4>
              <span class="single-news-channel">technet.com - 1 min ago</span> <span class="single-news-category">TECH</span>
              <div class="clr">
              </div>
            </div>*/
}

function erroreSelect (e)
{
    alert("Select non avvenuta"+e);
}

function onDbError ()
{
    alert("Errore");
}

// Registra utente

function aggiungiUtente(nome,cognome,email,luogoN,dataN,citta,username,password,privacy)
{
  //  alert(nome+"-"+cognome+"-"+email+"-"+luogoN+"-"+dataN+"-"+citta+"-"+username+"-"+password);
       $.ajax({
        type: "POST",
		data: '{nome:"'+nome+'",cognome:"'+cognome+'",email:"'+email+'",luogo_nascita:"'+luogoN+'",data_nascita:"'+dataN+'",citta:"'+citta+'",username:"'+username+'",password:"'+password+'",privacy:"'+privacy+'"}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_aggiungiCliente.aspx/prova',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
		//console.log(data);
        var ID_utente = data.d;
		  // alert('Cliente Salvato'+ID_utente);
         //   alert(uriImmagine);
          //     $("#pop").click();
            var successo ="<div class='modal-content'><h4>Registrazione Effettuata </h4><p>Registrazione al sistema effettuata con successo</p></div>";
            successo+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_registrazione").html("");
            $("#box_registrazione").append(successo);
            $("#btn_box_Registrazione").click();
		},
		error: function(e){
			//console.log(data);
			//alert('Errore'+e.status);
            //alert('Errore2'+e.statusTest);
             var fallito ="<div class='modal-content'><h4>Registrazione Fallita </h4><p>Connessione internet assente</p></div>";
            fallito+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_registrazione").html("");
            $("#box_registrazione").append(fallito);
            $("#btn_box_Registrazione").click();
		}
	});
}

// Login utente

function loginUtente(usernameLogin,passLogin)
{
       localStorage.setItem('username',usernameLogin);
       $.ajax({
        type: "POST",
		data: '{userLogin:"'+usernameLogin+'",passLogin:"'+passLogin+'"}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_loginUtente.aspx/login',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
		//console.log(data);
        var login = data.d;
		if(login!="")
        {
            //alert("Utente Loggato"+login);
            localStorage.setItem('login', true);
            localStorage.setItem('Id_login',login);
            localStorage.setItem('Id_login',login);
            var benvenuto ="<div class='modal-content'><h4>Login Effettuato </h4><p>Benvenuto "+localStorage.getItem("username")+"</p></div>";
            benvenuto+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
            $(".SiLogin").append(li_dati);
            $(".logoutApp").show();
            $("#box_successoLogin").html("");
            $("#box_successoLogin").append(benvenuto);
            $("#btn_box_Login").click();
            
           
        }else{
           // alert("Utente non loggato");
           var noBenvenuto="<div class='modal-content'><h4>Login Fallito </h4><p>Controlla di aver inserito i dati corretti o di avere una connessione internet disponibile </p></div>";
           noBenvenuto+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
           $("#box_successoLogin").html("");
           $("#box_successoLogin").append(noBenvenuto);
           $("#btn_box_Login").click();
        }
		},
		error: function(e){
			//console.log(data);
			//alert('Errore'+e.status);
            //alert('Errore2'+e.statusTest);
            var noBenvenuto="<div class='modal-content'><h4>Login Fallito </h4><p>Controlla di aver inserito i dati corretti o di avere una connessione internet disponibile </p></div>";
            noBenvenuto+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_successoLogin").html("");
            $("#box_successoLogin").append(noBenvenuto);
            $("#btn_box_Login").click();
		}
	});
    
}

function caricaNotifica ()
{
   
    db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
     db.transaction(selectNotifica,successoSelectNotifica);  
}

function selectNotifica(tx)
{
         
       tx.executeSql("SELECT * FROM notizie WHERE ID = "+localStorage.getItem('Id_notifica')+"",[], successoSelectNotifica,erroreSelect);        
}

function successoSelectNotifica(tx,dati)
{
    var len = dati.rows.length;
       
        var li_dati="";
        if(len!=0)
        {
            
            // Data giusta attivo_da
            var data = dati.rows.item(0).attivo_da;
            var splitarray = new Array();
            splitarray = data.split(" ");
            var dataDue = splitarray[0];
            var arrayData = new Array ();
            arrayData = dataDue.split("-");
            var data_attivo_da = arrayData[2] + "-" + arrayData[1] + "-" + arrayData[0]; //aggiungere anche ora + " " + splitarray[1];
            // Data giusta attivo_a
            var dataTre = dati.rows.item(0).attivo_a;
            var splitarrayUno = new Array();
            splitarrayUno = dataTre.split(" ");
            var dataQuattro = splitarrayUno[0];
            var arrayDataDue = new Array ();
            arrayDataDue = dataQuattro.split("-");
            var data_attivo_a = arrayDataDue[2] + "-" + arrayDataDue[1] + "-" + arrayDataDue[0]; // aggiungere anche ora + " " + splitarrayUno[1];
           sessionStorage.setItem('titolo_notifica',dati.rows.item(0).titolo);
           var immagineNot ="<img src='http://magicbeep.mvclienti.com/public/upload_gallery/immagini/"+dati.rows.item(0).immagine+"' alt=''>";
           li_dati+="<h2 class='uppercase'>"+dati.rows.item(0).titolo+"</h2>";
           li_dati+="<div class='post-author'><span>Attivo dal "+data_attivo_da+" al "+data_attivo_a+"</span></div>";
           li_dati+=" <p class='text-flow'>"+dati.rows.item(0).descrizione+"</p><hr>";
           if(dati.rows.item(0).link!="")
           {
           li_dati+="<blockquote class='primary-border'>Link: <a href='http://"+dati.rows.item(0).link+"'>"+dati.rows.item(0).link+"</a> </blockquote>"
           }
           
           if(dati.rows.item(0).allegato!="")
           {
           li_dati+="<blockquote class='primary-border'>Allegato: <a href='http://magicbeep.mvclienti.com/public/upload_gallery/immagini/"+dati.rows.item(0).allegato+"' target='_blank'>"+dati.rows.item(0).allegato+"</a>  </blockquote>"
           }
          li_dati+="<hr>";
          $(".appendDettaglioNotifica").html("");
          $("#box_img_notifica").html("");
          $("#box_img_notifica").append(immagineNot);
          $(".appendDettaglioNotifica").append(li_dati);
        }
     
}

function cancellaNotifica ()
{
    alert(sessionStorage.getItem('ID_not'));
    // Cancellare notifica in base all 'id'
    var idNotifica = sessionStorage.getItem('ID_not');
     db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function(tx) {
                tx.executeSql("DELETE FROM notifiche WHERE id=?",[idNotifica]);
            },
            function(){
                alert("Cancellazione non effettua");
               
            },
            function(){
                alert("Cancellazione effettua");
               
            }
        )
      $("#purchase").popup( "close" );
      $("#lista_datiJson").html("");
      selezionoDati();
}

function cancellaAllNotifiche ()
{
      db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
        db.transaction(
            // Metodo di chiamata asincrona
            function(tx) {
                tx.executeSql("DELETE FROM notifiche",[]);
            },
            function(){
               // alert("Cancellazione non effettua");
               
            },
            function(){
               // alert("Cancellazione effettua");
               
            }
        )
      $("#lista_datiJson").html("");
      selezionoDati();
}

// Gestire ancora la privacy nel file inviaInfo.aspx.cs
function inviaInformazione(privacy,nome,cognome,email,richiesta)
{
  
   $.ajax({
        type: "POST",
		data: '{nome:"'+nome+'",cognome:"'+cognome+'",email:"'+email+'",richiesta:"'+richiesta+'",privacy:"'+privacy+'",notizia:"'+ sessionStorage.getItem('titolo_notifica')+'"}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_inviaInfo.aspx/invia',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
        var ritorno = data.d;
		// alert('Cliente Salvato'+ritorno);
         // Creare popo per invio email
         //   alert(uriImmagine);
         
          //     $("#pop").click();
            var successo ="<div class='modal-content'><h4>Informazione Inviata </h4><p>Informazioni sulla notizia "+sessionStorage.getItem('titolo_notifica')+" inviata con successo</p></div>";
            successo+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoNotifica").html("");
            $("#box_infoNotifica").append(successo);
            $("#btn_box_infoNotifica").click();
		},
		error: function(e){
			//console.log(data);
			//alert('Errore'+e.status);
            //alert('Errore2'+e.statusTest);
             var fallito ="<div class='modal-content'><h4>Invio Fallito </h4><p>Connessione internet assente</p></div>";
            fallito+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_infoNotifica").html("");
            $("#box_infoNotifica").append(fallito);
            $("#btn_box_infoNotifica").click();
		}
     	});
}

function inviaInformazioneMv(pMv,nMv,cMv,eMv,rMv)
{
// alert(pMv+"-"+nMv+"-"+cMv+"-"+eMv+"-"+rMv);
  $.ajax({
        type: "POST",
		data: '{nome:"'+nMv+'",cognome:"'+cMv+'",email:"'+eMv+'",richiesta:"'+rMv+'",privacy:"'+pMv+'",notizia:""}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_inviaInfoMv.aspx/invia',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
        var ritorno = data.d;
        
		// alert('Cliente Salvato'+ritorno);
         var successo ="<div class='modal-content'><h4>Informazione Inviata </h4><p>Informazioni sulla notizia inviata con successo</p></div>";
         successo+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
         $("#box_infoMvitalia").html("");
         $("#box_infoMvitalia").append(successo);
          $("#btn_box_infoMvitalia").click();

		},
		error: function(e){
			//console.log(data);
		//	alert('Errore'+e.status);
          //  alert('Errore2'+e.statusTest);
         var fallito ="<div class='modal-content'><h4>Invio Fallito </h4><p>Connessione internet assente</p></div>";
         fallito+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
         $("#box_infoMvitalia").html("");
         $("#box_infoMvitalia").append(fallito);
         $("#btn_box_infoMvitalia").click();
		}
     	});
}

function apriNotifica(id)
{
    var prova = id;
     localStorage.setItem('Id_notifica', prova);
    $('#'+id+'').hide();
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#notifica", {    transition: "flip", reload:false, allowSamePageTransition:true } );
}

function salvaNotifica(id)
{
    
      $('#'+id+'').hide();
}


function condividiNotifica ()
{
   // Prendere i dati giusti da condividere
    db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
                       db.transaction(
                            // Metodo di chiamata asincrona
                            function(tx) {
                                            tx.executeSql("SELECT * FROM notizie WHERE ID = "+localStorage.getItem('Id_notifica')+"",[],
                                         function(tx,dati){
                                            var len = dati.rows.length;
                                            if(len!=0)
                                            {
                                                var immagine = "http://magicbeep.mvclienti.com/public/upload_gallery/immagini/"+dati.rows.item(0).immagine+"";
                                                var notifica = "Notifica:"+dati.rows.item(0).titolo+"Descrizione:"+dati.rows.item(0).descrizione;
                                                window.plugins.socialsharing.share(notifica, 'The subject',immagine);
                                            }
                                         },
                                           function () {
                                             alert("Errore"+e.message);
                                         });
                        });
                           
                            
                    

}



/*function recuperoPassword(email)
{
  
   $.ajax({
        type: "POST",
		data: '{email:"'+email+'"}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_recuperoPassword.aspx/recupera',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
        var ritorno = data.d;
		 alert(ritorno);
         // Creare popo per invio email
         //   alert(uriImmagine);
         
          //     $("#pop").click();

		},
		error: function(e){
			//console.log(data);
			alert('Errore'+e.status);
            alert('Errore2'+e.statusTest);
		}
     	});
}*/

function recuperoPassword(email)
{
  
   $.ajax({
        type: "POST",
		data: '{email:"'+email+'"}',
		url: 'http://magicbeep.mvclienti.com/webservices/CS_recuperoPassword.aspx/recupera',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
		success: function(data){
        var ritorno = data.d;
		// alert(ritorno);
         if(ritorno!="")
         {
            
            var successo ="<div class='modal-content'><h4>Recupero Password</h4><p>Controlla la tua E-mail per recuperare la password </p></div>";
            successo+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_Password").html("");
            $("#box_Password").append(successo);
            $("#btn_box_recuperoPassword").click();
         }else{
            var fallito ="<div class='modal-content'><h4>Recupero Password</h4><p>Fallito!!<br>Assicurati di aver inserito l' E-mail corretta</p></div>";
            fallito+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_Password").html("");
            $("#box_Password").append(fallito);
            $("#btn_box_recuperoPassword").click();
         }
        

		},
		error: function(e){
			//console.log(data);
		//	alert('Errore'+e.status);
         //   alert('Errore2'+e.statusTest);
           var fallito ="<div class='modal-content'><h4>Recupero Password</h4><p>Fallito!!<br>Connessione internet assente</p></div>";
            fallito+="<div class='modal-footer'> <a href='#' class='modal-action modal-close waves-effect waves-green btn-flat'>Chiudi</a></div>";
            $("#box_Password").html("");
            $("#box_Password").append(fallito);
            $("#btn_box_recuperoPasswordFailed").click();
		}
     	});
}

function caricaNotificheFiltrate () {
     
   var searchFiled = $("#search").val();
  // alert(searchFiled);
   // Faccio query
    db = window.openDatabase("DatabaseSqlliteApp", "1.0", "Database prova", 200000);
                       db.transaction(
                            // Metodo di chiamata asincrona
                            function(tx) {
                                         tx.executeSql("SELECT C.ID as ID_notifica,  N.*, C.* FROM notizie as N, notifiche as C WHERE C.ID_notizia=N.ID AND N.titolo like '%"+searchFiled+"%' OR N.descrizione like '%"+searchFiled+"%'",[],
                                         function(tx,dati){
                                            var len = dati.rows.length;
                                           
                                            var li_dati="";
                                            if(len!=0)
                                            {
                                               
                                                        for(var i=0; i<len; i++)
                                                        {
                                                        
                                                            var data = dati.rows.item(i).data_ora;
                                                            var splitarray = new Array();
                                                            splitarray = data.split(" ");
                                                            var dataDue = splitarray[0];
                                                            var arrayData = new Array ();
                                                            arrayData = dataDue.split("-");
                                                            var dataCorretta = arrayData[2] + "-" + arrayData[1] + "-" + arrayData[0] + " " + splitarray[1];
                                                            li_dati="<div id="+dati.rows.item(i).ID_notifica+" data-itemid="+dati.rows.item(i).ID_notizia+" class='single-news animated fadeinright delay-2'><h4 class='single-news-title'><a class='detail' href='#' >"+dati.rows.item(i).titolo+"</a>";
                                                            li_dati+="</h4><div class='margin-bottom-5'><span class='single-news-category'>"+dataCorretta+"</span></div><div class='single-news-channel'>"+dati.rows.item(i).descrizione+"</div>";
                                                            li_dati+="<div class='clr'></div></div>";
                                                            $("#lista_datiJson").html("");
                                                            $("#lista_datiJson").append(li_dati);
                                                        }
                                             }
                                            
                                            

                                         },
                                           function () {
                                             alert("Errore"+e.message);
                                         });
    });
}

function dinamico ()
    {
     var li_dati = "";
      $.getJSON("http://magicbeep.mvclienti.com/webservices/slider_home.aspx", function (dati) {
                    
                    $.each(dati, function (i, name) {
                    li_dati+="<div class='swiper-slide'> <div class='slider-bottom-right valign-wrapper'><div class='valign center-align width-100 p-b-5em'>";
                    li_dati+="<h2 class='uppercase'>"+name.titolo+"</h2> <p>"+name.testo+"</p></div></div></div>";
                    $(".swiper-wrapper").html("");
                    $(".swiper-wrapper").append(li_dati);
                    });
					 
                                
                });
     /* var dai="<div class='swiper-slide'> <div class='slider-bottom-right valign-wrapper'><div class='valign center-align width-100 p-b-5em'>";
      dai+="<h2 class='uppercase'>Halo</h2> <p>Is a mobile website, developed to make your life easer!</p></div></div></div>";
      dai+="<div class='swiper-slide'> <div class='slider-bottom-right valign-wrapper'><div class='valign center-align width-100 p-b-5em'>";
      dai+="<h2 class='uppercase'>Halo</h2> <p>Is a mobile website, developed to make your life easer!</p></div></div></div>";*/
 
      
    }
 