let timer, predosleZnenie, time
animacieInstrukcie = []
prestavkovyCas = 250
vystupHlavny = document.getElementById('outputMain')
platnoHlavne = document.getElementById("canvasMain")
lastInput = undefined
lastInputTimer = undefined
  
function generuj(arg){
  lastInput = undefined
  platnoHlavne.innerHTML = ''
  vystupHlavny.innerHTML = ''
  predoslyTyp = arg
  do {arg()} while (predosleZnenie == znenie)
  predosleZnenie = znenie
  document.getElementById("prikladSamotny").innerHTML = znenie
  document.getElementById("inputVysledok").focus()
  if (time != undefined) {
    clearTimeout(timer)
    timer = setTimeout(slow, time)
  }
}

function scitovanie(){
  const prveCislo = Math.floor(Math.random() * 19 + 1)
  const druheCislo = Math.floor(Math.random() * (19 - prveCislo) + 1)
  vysledok = prveCislo + druheCislo
  znenie = prveCislo + ' + ' + druheCislo
  chvost()
}

function chvost(){
  chvostZaciatok()
  chvostKoniec()
}
function chvostZaciatok(){
  znenie += " = <form action='javascript:check()'><input id='inputVysledok' autocomplete='off'></form>"
}
function chvostKoniec(){
  znenie += "<button id='submitButton' type='button' onclick='check()'>Skontrolovať</button><button id='generateButton' type='button' onclick='generuj(predoslyTyp)'>Nový príklad</button>"
}

function odcitovanie(){
  const prveCislo = Math.floor(Math.random() * 20 + 1)
  const druheCislo = Math.floor(Math.random() * (prveCislo - 1) + 1)
  vysledok = prveCislo - druheCislo
  znenie = prveCislo + ' - ' + druheCislo
  chvost()
}

function nasobenie(){
  const prveCislo = Math.floor(Math.random() * 9 + 1)
  const druheCislo = Math.floor(Math.random() * 10)
  vysledok = prveCislo * druheCislo
  znenie = prveCislo + ' * ' + druheCislo
  chvost()
}

function delenie(){
  const prveCislo = Math.floor(Math.random() * 10)
  const druheCislo = Math.floor(Math.random() * 10)
  const sucin = prveCislo * druheCislo

  if (sucin == 0){//ak sa nachadza aspon jedna 0
    if (Math.random() < 0.5) {//fifty fifty ze delim 0 vacsim cislom
      vysledok = 0//sucin
      znenie = '0 : ' + Math.max(prveCislo, druheCislo)
    } else {//alebo vacsie cislo nulou
      znenie = Math.max(prveCislo, druheCislo) + ' : 0'
    }
    if (znenie.includes(': 0')){//zahrna pripady ak su len nuly
      vysledok = 'special'
    }
  } else {
    vysledok = sucin / prveCislo
    znenie = sucin + ' : ' + prveCislo
  }

  chvostZaciatok()
  znenie += '<select id="dropdown"><option value="1">špeciálne prípady</option><option value="2">1. nulou sa nedelí</option></select>'
  chvostKoniec()
}

function check(){
  let vstupVysledok = document.getElementById("inputVysledok")
  if (vstupVysledok.value.replace(",", ".") == lastInput){
    vstupVysledok.focus()
    console.log(lastInput, vstupVysledok.value.replace(",", "."))
    return
  } else {
    lastInput = vstupVysledok.value.replace(",", ".")
    function checkInputField(){
      if (vstupVysledok.value != '') {
        if (isNaN(vstupVysledok.value.replace(",", "."))){
          vystupHlavny.innerHTML = '<div class="output"><p>Asi máte <em>preklep</em>.</p></div>' + vystupHlavny.innerHTML
          vstupVysledok.focus()
        } else if (vstupVysledok.value.replace(",", ".") == vysledok){
          vystupHlavny.innerHTML = '<div class="output"><p>Príklad bol vypočítaný <em>správne</em>. Super!</p></div>' + vystupHlavny.innerHTML
          clearTimeout(timer)
          vstupVysledok.blur()
        } else {
          vystupHlavny.innerHTML = '<div class="output"><p>Príklad bol vypočítaný <em>nesprávne</em>. Skúste to ešte raz.</p></div>' + vystupHlavny.innerHTML
          vstupVysledok.focus()
        }
      } else {
        vstupVysledok.focus()
      }
    }
      
    if (document.getElementById('prikladMain').innerHTML.includes('dropdown')){
      if (vstupVysledok.value != '' && document.getElementById('dropdown').value != 1){
        vystupHlavny.innerHTML = '<div class="output"><p>Použite prosím iba <em>jednu</em> formu vstupu.</p></div>' + vystupHlavny.innerHTML
        } else {
          if (document.getElementById('dropdown').value != 1){
            if (document.getElementById('dropdown').value == 2 && vysledok=='special'){
              vystupHlavny.innerHTML = '<div class="output"><p>Príklad bol vypočítaný <em>správne</em>. Super!</p></div>' + vystupHlavny.innerHTML
              clearTimeout(timer)
            } else {
              vystupHlavny.innerHTML = '<div class="output"><p>Príklad bol vypočítaný <em>nesprávne</em>. Skúste to ešte raz.</p></div>' + vystupHlavny.innerHTML
              vstupVysledok.focus()
            }
          } else {
            checkInputField()
          }
        }
    } else {
      checkInputField()
    }
  }  
}

function zaokruhlovanie(){
  const prveCisloNezaokruhlene = Math.random() * 10 + 1
  const desatinneMiesta = Math.floor(Math.random() * 15)

  vysledok = (Number(Math.round(prveCisloNezaokruhlene + 'e' + desatinneMiesta) + 'e-' + desatinneMiesta) + '')
  znenie = 'Zaokrúhli ' + (prveCisloNezaokruhlene + '').replace(".", ",") + ' na ' + desatinneMiesta
  if (desatinneMiesta == 1){
    znenie += ' desatinné miesto'
  } else if (desatinneMiesta > 1 && desatinneMiesta < 5){
    znenie += ' desatinné miesta'
  } else {
    znenie += ' desatinných miest' }
  chvost()
}

function scitovanieMnohoclenov(){
  let pocetCifier = 4
  vysledok = []
  let cifry = 20
  cisla = []

  for (let x = 0; x < pocetCifier; x++){
    cisla[x] = []
    cisla[x][0] = Math.floor(Math.random() * 9 + 1)
    for (let y = 1; y < pocetCifier; y++){
      cisla[x].push(Math.floor(Math.random() * 10))
    }
  }

  znenie = cisla.map(daneCislo => daneCislo.join("")).join(" + ")
  scitovanieArray()
  vysledok=vysledok.join("")
  chvostZaciatok()
  znenie += "<button id='postupButton' type='button' onclick='postupScitovanie()'>Postup</button>"
  chvostKoniec()
}

function scitovanieArray(argCislaRaw = cisla){
  let argCisla = argCislaRaw.map(daneCislo => (daneCislo.map(danaCifra => danaCifra)))
  let najdlhsiVstup = Math.max(...argCisla.map(ciselko => ciselko.length))
  for (let w = 0; w < argCisla.length; w++){
    for (let t = argCisla[w].length; t < najdlhsiVstup; t++){
      argCisla[w].unshift(0)
    }//doplni za zaciatok nuly aby sa zhodovali dlzky arrayov s cislami
  }
  vysledok = []
  let vysledokZvysokLocal = []
  let zvysok = 0

  for (let z = argCisla[0].length; z >= 0; z--){//ratam s tym ze maju vsetky cisla rovnaku dlzku, pre potreby vypoctov dosadim nuly pred cisla
    if (z == 0){
      if (zvysok != 0){
        vysledok[0] = zvysok
        zvysok = 0
      } else {
        vysledok.shift()
        break
      }//zvysok treba vynulovat po zapise
    } else {
      vysledok[z] = zvysok
      for (let x = 0; x < argCisla.length; x++){
        vysledok[z] += argCisla[x][z-1]
      }
      if (vysledok[z] > 9){
        zvysok = Math.floor(vysledok[z] / 10)//zobere aj v pripade ze prenesiem 20 atd, nezoberie ak mam 100+ lebo zaokruhli na 10+, co nechcem
        vysledok[z] -= zvysok * 10
      } else {
        zvysok = 0
      }

    }
    vysledokZvysokLocal.unshift(zvysok)    
  }
  vysledokZvysok = vysledokZvysokLocal
}

function nakresliCiaru(xArg, yArg, text = '', dlzka = vysledok.length){
  animacieInstrukcie.push(
    setTimeout(function(){
      ctx.font = "40px Arial"
      ctx.beginPath()
      ctx.moveTo(xArg + 25, yArg)
      ctx.lineTo(xArg - 30 * vysledok.length, yArg)
      ctx.stroke()
    }, prestavka += 250)
  )
  animacieInstrukcie.push(
    setTimeout(function(){
      ctx.fillText(text, xArg - 30 * vysledok.length, yArg - 10)
    }, prestavka += 100)
  )
}

function nakresliPoleSpredu(arg, xArg, yArg){
  animacieInstrukcie.push(
    setTimeout(function(){
      ctx.font = "30px Arial"
      xPosun = - 30 * arg.length
    }, prestavka += 1)
  )
  for (let e = 0; e < arg.length; e++){
    animacieInstrukcie.push(
      setTimeout(function(){
        ctx.fillText(arg[e], xArg + (xPosun += 30), yArg)
      }, prestavka += prestavkovyCas)
    )
  }   
}

function nakresliPoleZozaduRozsirene(argNormal, argZvysok, xArg, yArg){
  animacieInstrukcie.push(
    setTimeout(function(){
      xPosun = 30
    }, prestavka += 1)
  )
  for (let e = argNormal.length - 1; e >= 0; e--){
    animacieInstrukcie.push(
      setTimeout(function(){
        ctx.font = "30px Arial"
        ctx.fillText(argNormal[e], xArg + (xPosun -= 30), yArg)
      }, prestavka += prestavkovyCas)
    )
    if (argZvysok[e] != 0 && !(e == 0 || (e == 1 && argZvysok[1] == argNormal[0]))){
      animacieInstrukcie.push(
        setTimeout(function(){
          ctx.font = "15px Arial"
          ctx.fillText(argZvysok[e], xArg + xPosun - 10, yArg - 15)
        }, prestavka += prestavkovyCas)
      )
    }
  }
}

function nulovanieAnimacii(){
  for (let g = animacieInstrukcie.length - 1; g > 0; g--){
    clearTimeout(animacieInstrukcie[g])
  }
}

function postupScitovanie(){
  document.getElementById("inputVysledok").focus()
  prestavka = 0
  if (platnoHlavne.innerHTML.includes('myCanvas')){
    platnoHlavne.innerHTML = ''
    return
  }
  function scitajDveCisla(argPrve, argDruhe){
    nakresliPoleSpredu(argPrve, x, y += 30)
    nakresliPoleSpredu(argDruhe, x, y += 30)
    nakresliCiaru(x, y += 10)
  }
  
  nulovanieAnimacii()
  animacieInstrukcie = []
  
  platnoHlavne.innerHTML = '<div class="blok"><canvas id="myCanvas1" style="width:250px;height:130px">Použite prosím novší prehliadač.</canvas><canvas id="myCanvas2" style="width:250px;height:130px">Použite prosím novší prehliadač.</canvas><canvas id="myCanvas3" style="width:250px;height:130px">Použite prosím novší prehliadač.</canvas></div>';
  
  c = document.getElementById("myCanvas1")
  ctx = c.getContext("2d")
  ctx.fillStyle = '#ff6347'
  ctx.strokeStyle ='#ff6347'
  x = c.width - (c.width - vysledok.length * 30) / 2
  y = 20
  scitajDveCisla(cisla[0], cisla[1])
  scitovanieArray(cisla.slice(0, 2))
  nakresliPoleZozaduRozsirene(vysledok, vysledokZvysok, x, y += 30)
  
  animacieInstrukcie.push(
    setTimeout(function(){
      c = document.getElementById("myCanvas2")
      ctx = c.getContext("2d")
      ctx.fillStyle= '#ff6347'
      ctx.strokeStyle='#ff6347'
    }, prestavka += 250)
  )
  x = c.width - (c.width - vysledok.length * 30) / 2
  y = 20
  scitajDveCisla(vysledok, cisla[2])
  scitovanieArray([vysledok, cisla[2]])
  nakresliPoleZozaduRozsirene(vysledok, vysledokZvysok, x, y += 30)


  animacieInstrukcie.push(
    setTimeout(function(){
      c = document.getElementById("myCanvas3")
      ctx = c.getContext("2d")
      ctx.fillStyle= '#ff6347'
      ctx.strokeStyle='#ff6347'
    }, prestavka+=250)
  )
  
  
  x = c.width - (c.width - vysledok.length * 30) / 2
  y = 20
  scitajDveCisla(vysledok, cisla[3])
  scitovanieArray([vysledok, cisla[3]])
  nakresliPoleZozaduRozsirene(vysledok, vysledokZvysok, x, y += 30)

  vysledok = vysledok.join("")
}

function nasobenieViacCiferneho(){
  pocetCifierPrveho = Math.floor(Math.random() * 9 + 1)//<1;9>
  pocetCifierDruheho = 10 - pocetCifierPrveho
  prvySucinitel = []
  druhySucinitel = []
  vysledok = []
  cisla = []//bude obsahovat medzivysledky
  cislaZvysok = []

  prvySucinitel.push(Math.floor(Math.random() * 9 + 1))
  for (let x = 1; x < pocetCifierPrveho; x++){//neurobi prvu cifru pretoze ta nemoze byt 0
    prvySucinitel.push(Math.floor(Math.random() * 10))
  }

  druhySucinitel.push(Math.floor(Math.random() * 9 + 1))
  for (let x = 1; x < pocetCifierDruheho; x++){
    druhySucinitel.push(Math.floor(Math.random() * 10))
  }

  znenie=prvySucinitel.join("") + ' * ' + druhySucinitel.join("")
  if (druhySucinitel.length > prvySucinitel.length){
    let tempArray = prvySucinitel
    prvySucinitel = druhySucinitel
    druhySucinitel = tempArray
    tempArray = pocetCifierPrveho
    pocetCifierPrveho = pocetCifierDruheho
    pocetCifierDruheho = tempArray
  }

  for (let z = pocetCifierDruheho - 1; z >= 0; z--){
    let zvysok = 0
    cislaZvysok[pocetCifierDruheho - 1 - z] = []
    cisla[pocetCifierDruheho - 1 - z] = []//chcem vytvorit zoznam cisel tkore poslem potom do dalsej funckie na vysledok

    for (let x = pocetCifierPrveho; x > 0; x--){
        if (druhySucinitel[z] == 0){
          cisla[pocetCifierDruheho - 1 - z] = [0]
          cislaZvysok[pocetCifierDruheho - 1 - z].unshift(zvysok)
          break
        }//aby som nenasobil nulou kazdu cifru; necha vsak stale prazdne slots na prvych zvysnych miestach
        cisla[pocetCifierDruheho - 1 - z][x] = druhySucinitel[z] * prvySucinitel[x - 1] + zvysok
        if (cisla[pocetCifierDruheho - 1 - z][x] > 9){
          zvysok = Math.floor(cisla[pocetCifierDruheho - 1 - z][x] / 10)
          cisla[pocetCifierDruheho - 1 - z][x] -= zvysok * 10
        } else {
          zvysok = 0
        }    
        cislaZvysok[pocetCifierDruheho - 1 - z].unshift(zvysok)
    }
    if (druhySucinitel[z] != 0){
      if (zvysok != 0) {
        cisla[pocetCifierDruheho - 1 - z][0] = zvysok
        zvysok = 0
        cislaZvysok[pocetCifierDruheho - 1 - z].unshift(zvysok)
      } else {
        cisla[pocetCifierDruheho - 1 - z].shift()
      }//zvysok treba vynulovat po zapise
    }
  }
  

  //mam cisla ktore maju za sebou potrebne nuly, este treba pridat na zaciatok nuly kvoli scitovaniu
  neupraveneCisla = cisla.map(daneCislo => (daneCislo.map(danaCifra => danaCifra)))
  //ziska dlzku najdlhsieho cisla
  najdlhsieCislo = cisla[cisla.length - 1].length + cisla.length - 1//najdlhsi medzivysledok, vysledok moze v skutocnosti byt dlhsi
  
  //doplni cisla na rovnaku dlzku aby som vedel pocitat s nimi potom
  for (let w = 0; w < cisla.length; w++){//pre kazde cislo=medzivysledok
    for (let g = 0; g < w; g++){
      cisla[w].push(0)
    }//treba pridat na zaver nuly v druhom riadku jednu atd
  }

  scitovanieArray()
  neupravenyVysledok = vysledok.map(danaCifra => danaCifra)
  vysledok = vysledok.join("")
  chvostZaciatok()
  znenie += "<button id='postupButton' type='button' onclick='postupNasobenie()'>Postup</button>"
  chvostKoniec()
}

function postupNasobenie(){
  document.getElementById("inputVysledok").focus()
  prestavka = 0
  if (platnoHlavne.innerHTML.includes('myCanvas')){
    platnoHlavne.innerHTML = ''
    return
  }
  nulovanieAnimacii()
  animacieInstrukcie = []

  platnoHlavne.innerHTML = '<div class="blok"><canvas  id="myCanvas">Použite prosím novší prehliadač.</canvas></div>'
  c = document.getElementById("myCanvas")
  c.width = vysledok.length * 30 + 40
  c.height = cisla.length * 30 + 110 + 60
  ctx = c.getContext("2d")

  ctx.fillStyle = '#ff6347'
  ctx.strokeStyle = '#ff6347'  

  x = c.width - 35
  y = 50

  nakresliPoleSpredu(prvySucinitel, x, y)
  nakresliPoleSpredu(druhySucinitel, x, y += 30)
  nakresliCiaru(x, y += 10, '.')
  
  for (let w = 0; w < cisla.length; w++){
    nakresliPoleZozaduRozsirene(neupraveneCisla[w], cislaZvysok[w], x, y += 30)
    x -= 30
  }
  x = c.width - 35

  if (druhySucinitel.length != 1){
    nakresliCiaru(x, y += 10)
    nakresliPoleZozaduRozsirene(neupravenyVysledok, vysledokZvysok, x, y += 30)
  }
}

function casovacFunction(){
  //zbali menu casovaca
  if (document.getElementById("casovacParagraph").innerHTML.includes('submit')){
    document.getElementById("casovacParagraph").innerHTML = "<button id='casovacButton' type='button' title='Nastavte si čas, za ktorý chcete príklad vypočítať.' onclick='casovacFunction()'>Počítanie na čas</button>"
  } else if (time != undefined){//zrusi nastaveny casovac
    time = undefined
    clearTimeout(timer)
    document.getElementById("casovacButton").style = "border:4px solid #666666"
    vystupHlavny.innerHTML = "<div class='output'><p>Časovač bol vypnutý.</p></div>" + vystupHlavny.innerHTML
  } else {//otovri menu casovaca
    document.getElementById("casovacButton").style = "border:4px solid blue"
    document.getElementById("casovacParagraph").innerHTML += "<form action='javascript:casovacActivate()'><input id='inputCasovac' style.width=3px autocomplete='off'> (sekundy) <button type='submit' onclick=''>Potvrdiť</button></form>"
    document.getElementById("inputCasovac").focus()
    lastInputTimer = undefined
  }    
}  

function casovacActivate(){
  let casovacVstupnePole = document.getElementById('inputCasovac')
  let casovacVstupnaHodnota = casovacVstupnePole.value.replace(",", ".");
  
  if (casovacVstupnaHodnota == lastInputTimer){
    casovacVstupnePole.focus()
    console.log(lastInputTimer, casovacVstupnaHodnota)
    return
  } else {
    lastInputTimer = casovacVstupnaHodnota
    if (casovacVstupnaHodnota == ''){
      document.getElementById("casovacParagraph").innerHTML = "<button id='casovacButton' type='button' title='Nastavte si čas, za ktorý chcete príklad vypočítať.' onclick='casovacFunction()'>Počítanie na čas</button>"
      time = undefined
      clearTimeout(timer)
      vystupHlavny.innerHTML = "<div class='output'><p>Časovač <em>nebol</em> nastavený.</p>" + vystupHlavny.innerHTML
      if (predosleZnenie != undefined){
        document.getElementById('inputVysledok').focus()
      }
      return
    }
    else if (isNaN(casovacVstupnaHodnota)){
      vystupHlavny.innerHTML = "<div class='output'><p>Asi máte <em>preklep</em>.</p></div>" + vystupHlavny.innerHTML
      casovacVstupnePole.focus()
      return
    }
    else if (casovacVstupnaHodnota.includes('.')){
      vystupHlavny.innerHTML = "<div class='output'><p>Zadajte prosím celé číslo (<em>bez</em> desatinnej čiarky).</p></div>" + vystupHlavny.innerHTML
      casovacVstupnePole.focus()
      return
    }  
    else if (casovacVstupnaHodnota <= 0){
      vystupHlavny.innerHTML = "<div class='output'><p>V tomto prípade je zbytočné nastavovať časovač.</p></div>" + vystupHlavny.innerHTML
      casovacVstupnePole.focus()
      return
    }  
    else if (casovacVstupnaHodnota < 5){
      vystupHlavny.innerHTML = "<div class='output'><p>Zadajte prosím <em>aspoň</em> 5 sekúnd.</p></div>" + vystupHlavny.innerHTML
      casovacVstupnePole.focus()
      return
    }
    else if (casovacVstupnaHodnota > 900){
      vystupHlavny.innerHTML = "<div class='output'><p>Zadajte prosím <em>menej</em> ako 15 minút.</p></div>" + vystupHlavny.innerHTML
      casovacVstupnePole.focus()
      return
    }
    
    vystupHlavny.innerHTML = "<div class='output'><p>Časovač bol úspešne nastavený na " + casovacVstupnaHodnota + "s.</p></div>" + vystupHlavny.innerHTML
    time = casovacVstupnaHodnota * 1000
    if (predosleZnenie != undefined){
      timer = setTimeout(slow, time)
      document.getElementById('inputVysledok').focus()
    }
    document.getElementById("casovacParagraph").innerHTML = "<button style='border:4px solid blue' id='casovacButton' type='button' title='Nastavte si čas, za ktorý chcete príklad vypočítať.' onclick='casovacFunction()'>Počítanie na čas</button>"
  
  }
}

function slow(){
  check()
  vystupHlavny.innerHTML = "<div class='output'><p><em>Ubehol čas.</em></p></div>" + vystupHlavny.innerHTML
}



































