$(document).on("pagebeforeshow", "#home", function () {
     
     var p = localStorage.getItem('login');
    
	    if(p=='true')
     {
     
        $(".SiLogin").html("");
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
      
         $(".SiLogin").append(li_dati);
           $(".SiLogin").show();
         $(".logoutApp").show();
     }
     
    });

     $(document).on("pagebeforeshow", "#login", function () {
     $("#usernameLogin").val("");
     $("#passwordLogin").val("");
     
      var p = localStorage.getItem('login');
	    if(p=='true')
     {
       $(".SiLogin").html("");
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
         $(".SiLogin").append(li_dati);
          $(".SiLogin").show();
         $(".logoutApp").show();
     }
     });

      $(document).on("pagebeforeshow", "#database", function () {
        
     var p = localStorage.getItem('login');
	    if(p=='true')
     {
       $(".SiLogin").html("");
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
         $(".SiLogin").append(li_dati);
          $(".SiLogin").show();
         $(".logoutApp").show();
     }
       $("#lista_datiJson").html("");
         selezionoDati ();
    });

      $(document).on("pagebeforeshow", "#notifica", function () {
     var p = localStorage.getItem('login');
      
	    if(p=='true')
     {
      $(".SiLogin").html("");
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
         $(".SiLogin").append(li_dati);
          $(".SiLogin").show();
         $(".logoutApp").show();
     }
      
    });

     $(document).on("pagebeforeshow", "#inviaInfo", function () {
		 $("#nomeInfo").val(""); 
     $("#cognomeInfo").val(""); 
     $("#emailInfo").val(""); 
     $("#richiestaInfo").val("");   
     $("#privacyInfo").prop('checked', false);  
     var p = localStorage.getItem('login');
      if(p=='true')
     {
       $(".SiLogin").html("");  
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
         $(".SiLogin").append(li_dati);
          $(".SiLogin").show();
         $(".logoutApp").show();
     }
    });

    $(document).on("pagebeforeshow", "#infoMvitalia", function () {
		 $("#nomeMv").val(""); 
     $("#cognomeMv").val(""); 
     $("#emailMv").val("");  
     $("#privacyMv").prop('checked', false);  
   var p = localStorage.getItem('login');
      if(p=='true')
     {
         $(".SiLogin").html("");  
         var li_dati="<span style='font-size:11px !important; color:#fff; padding-left:10px;'>"+localStorage.getItem('username')+"</span>";
         $(".SiLogin").append(li_dati);
          $(".SiLogin").show();
         $(".logoutApp").show();
     }
    });

    

     $(document).on("pageshow", "#home", function () {
        carica_slider();
    });


     $(document).on("pageshow", "#notifica", function () {
           $(".schedaNotifica").html("");
     caricaNotifica(); 
     });


$('#search').keyup(function () {	
	caricaNotificheFiltrate();
            
});	

    // Validazione e registrazione utente
$('#registrazioneSincro').validate({
    rules: {
        nome: {
            required: true
        },
        cognome: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        lnascita: {
            required: true
        },
        dataNascita: {
            required: true
        },
        citta: {
            required: true
        },
        username: {
            required: true
        },
        pass: {
            required: true
        },
         privacy: {
            required: true
        }
    },
    messages: {
        nome: {
            required: "Inserire il nome."
        },
        cognome: {
            required: "Inserire il cognome."
        },
        email: {
            required: "Inserire l' E-mail.",
            email:"Prego inserire un E-mail corretta"
        },
         lnascita: {
            required: "Inserire luogo di nascita"
        },
         dataNascita: {
            required: "Inserire la data di nascita"
        },
         citta: {
            required: "Inserire residenza"
        },
         username: {
            required: "Inserire username"
        },
         pass: {
            required: "Inserire password"
        },
        privacy: {
            required: "Acconsenti privacy."
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
     var privacy;
      if ($('#privacy').is(":checked"))
      {
         privacy=1
      }else{
         privacy=0
      }
      var nome = $("#nome").val();
      var cognome = $("#cognome").val();
      var email = $("#email").val();
      var luogoN = $("#lnascita").val();
      var dataN = $("#dataNascita").val();
      var citta = $("#citta").val();
      var username = $("#username").val();
      var password = $("#pass").val();
      aggiungiUtente(nome,cognome,email,luogoN,dataN,citta,username,password,privacy);
      return false;
    }
});


// Validate del form login 
$('#loginSincro').validate({
    rules: {
        usernameLogin: {
            required: true
        },
        passLogin: {
            required: true
        }
    },
    messages: {
        usernameLogin: {
            required: "Inserire ilusername."
        },
        passLogin: {
            required: "Inserire password."
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
     var usernameLogin = $("#usernameLogin").val();
      var passLogin = $("#passLogin").val();
      loginUtente(usernameLogin,passLogin);  
      return false;
    }
});
 
 
// Validate del form recupero password
$('#recuperoPass').validate({
    rules: {
        emailRecuperoPass: {
            required: true,
            email: true
        }
    },
    messages: {
        usernameLogin: {
            required: "Inserire E-mail",
            email: "Inserire un E-mail valida"
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
     var emailRecuperoPass = $("#emailRecuperoPass").val();
     recuperoPassword(emailRecuperoPass);  
     return false;
    }
});


   $('.logoutApp').click(function(){
     
       // localStorage.removeItem("login");
       localStorage.removeItem('login');
       localStorage.removeItem('username');
        $(".SiLogin").hide();
         $(".logoutApp").hide();
         
      });
  
  $('#social').click(function(){
      condividiNotifica();
  });

// popolo la notifica   
/*function logoutApp ()
{
      alert("entra");
       // localStorage.removeItem("login");
          localStorage.setItem('login', false);
          localStorage.removeItem("Id_login");
         $(".SiLogin").hide();
}*/

 $(document).on("click", ".storage", function () {
     var id = $(this).parents("div").attr("id");
     alert(id);
     sessionStorage.setItem('ID_not', id);
      cancellaNotifica ();
});



$(document).on("click", ".detail", function () {
     var id = $(this).parents("div").data("itemid");
     localStorage.removeItem("Id_notifica");
     localStorage.setItem('Id_notifica', id);
     $( ":mobile-pagecontainer" ).pagecontainer( "change", "#notifica", {    transition: "flip", reload:false, allowSamePageTransition:true } );
     
});






$(document).on("click", ".paginaMappa", function () {
  event.preventDefault();
  window.location.href ="page/mappa.html"  
});

$('#cancellaNot').click(function(){
        alert("entra");
      cancellaNotifica ();
      });

$('#noCancellanot').click(function(){
        $("#purchase").popup( "close" );
});

$('#cancellaTutteNotifiche').click(function(){
       cancellaAllNotifiche();
});


/*$(document).on("click", ".chiudiNotifica", function () {
     var id = $(this).parents("div").data("item");
    $('.box_n'+id+'').hide();
})*/

/*$(document).on("click", ".apriNotificaDettaglio", function () {
     var id = $(this).parents("div").data("item");
     localStorage.setItem('Id_notifica', id);
    $('#box_n'+id+'').hide();
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "notifica.html", {    transition: "flip", reload:true } );

});*/


// Validazione e invio email per l' informazione della notifica

$('#inviaInfoNotifica').validate({
    rules: {
        nomeInfo: {
            required: true
        },
        cognomeInfo: {
            required: true
        },
        emailInfo: {
            required: true,
            email: true
        },
        richiestaInfo: {
            required: true
        },
         privacyInfo: {
            required: true
        }
    },
    messages: {
        nomeInfo: {
            required: "Inserire il nome."
        },
        cognomeInfo: {
            required: "Inserire il cognome."
        },
        emailInfo: {
            required: "Inserire l' E-mail.",
            email:"Prego inserire un E-mail corretta"
        },
        richiestaInfo: {
            required: "Inserire la richiesta."
        },
        privacyInfo: {
            required: "Acconsenti privacy."
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
     var pInfo
     if ($('#privacyInfo').is(":checked"))
      {
         pInfo=1
      }else{
         pInfo=0
      }
      var nInfo = $("#nomeInfo").val();
      var cInfo = $("#cognomeInfo").val();
      var eInfo = $("#emailInfo").val();
      var rInfo = $("#richiestaInfo").val();
     inviaInformazione(pInfo,nInfo,cInfo,eInfo,rInfo);
        return false;
    }
});

// Validazione e invio email Mvitalia


$('#inviaInfoMv').validate({
    rules: {
        nomeMv: {
            required: true
        },
        cognomeMv: {
            required: true
        },
        emailMv: {
            required: true,
            email: true
        },
         privacyMv: {
            required: true
        }
    },
    messages: {
        nomeMv: {
            required: "Inserire il nome."
        },
        cognomeMv: {
            required: "Inserire il cognome."
        },
        emailMv: {
            required: "Inserire l' E-mail.",
            email:"Prego inserire un E-mail corretta"
        },
        privacyMv: {
            required: "Acconsenti privacy."
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
     var pMv
     if ($('#privacyMv').is(":checked"))
      {
         pMv=1
      }else{
         pMv=0
      }
      var nMv = $("#nomeMv").val();
      var cMv = $("#cognomeMv").val();
      var eMv = $("#emailMv").val();
      var rMv = $("#richiestaMv").val();
      inviaInformazioneMv(pMv,nMv,cMv,eMv,rMv);
        return false;
    }
});