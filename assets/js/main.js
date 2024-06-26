/* Seletor de cores © Andjeckson Tavares Guimarães - 2024 */

var SeletorDeCores = (function(){
      'use strict'
      
      var $ = document.querySelector.bind(document);
      
      HTMLElement.prototype.on = function(evento, callback){
               return this.addEventListener(evento, callback)
              };

      
      class SeletorDeCores{
          constructor(){
           
             this.versao = 0.03
             this.desenvolvedor = 'Andjeckson Tavares Guimarães.'
             
             function criarElemento(elm){
              return document.createElement(elm)
             }
             
             let corRGBA = 'rgba(255, 0, 0, 1)';
             let corRGB = 'rgb(255, 0, 0)'
             let corHEX = '#ff0000'
             let hex = false
             let x = 150;
             let y = 0;
             let w = 180
             let h = 150
             let w2 = 10
             let t = this
             
             
             let fundoSeletor = criarElemento('section')
                 fundoSeletor.classList.add('fundo-seletor')
                 
             let elmSeletor = criarElemento('div')
                 elmSeletor.classList.add('seletor-de-cores')
             
             let flexbox = criarElemento('div')
                 flexbox.classList.add('flexbox')
             
             let bloco = criarElemento('div')
                 bloco.classList.add('bloco-de-cores')
                 
             let canvasBloco = criarElemento('canvas')
             
             let deslizadorDoBloco = criarElemento('span')
                deslizadorDoBloco.classList.add('deslizador')
             
             let barraLateral = criarElemento('div')
                 barraLateral.classList.add('barra-lateral')
                 
             let canvasLateral = criarElemento('canvas')
             
             let deslizadorLateral = criarElemento('span')
             
                deslizadorLateral.classList.add('deslizador')
             
             let section = criarElemento('section')
                 section.classList.add('acoes')
             
             let flexboxItens = criarElemento('div')
                 flexboxItens.classList.add('flexbox-itens')
                 
             let label = criarElemento('label')
             let spanValor = criarElemento('span')
                 spanValor.innerText = hex === true ? corHEX : corRGBA
             
             let flexboxBtn = criarElemento('div')
                 flexboxBtn.classList.add('flexbox-btn')
             
             let btnFechar = criarElemento('button')
                 btnFechar.setAttribute('type','button')
                 btnFechar.innerText = 'OK'
                 btnFechar.on('click', ()=>{this.fechar()})
                 
                 flexboxItens.appendChild(label)
                 flexboxItens.appendChild(spanValor)
                 section.appendChild(flexboxItens)
                 section.appendChild(flexboxBtn)
                 flexboxBtn.appendChild(btnFechar)
                 
                 bloco.appendChild(canvasBloco)
                 bloco.appendChild(deslizadorDoBloco)
                 
                 flexbox.appendChild(bloco)
                 
                 barraLateral.appendChild(canvasLateral)
                 barraLateral.appendChild(deslizadorLateral)
                 
                 flexbox.appendChild( barraLateral )
                 
                 elmSeletor.appendChild(flexbox)
                 elmSeletor.appendChild(section)
                 
                 fundoSeletor.appendChild(elmSeletor)
                 document.body.appendChild(fundoSeletor)
                 
                 
                 canvasBloco.width = w
                 canvasBloco.height = h
                 
                 canvasLateral.height = h
                 canvasLateral.width = w2
                 
                 let ctxBloco = canvasBloco.getContext('2d')
                     criarGradiente()
                     
                 let ctxLateral = canvasLateral.getContext('2d')
                    
                 function criarGradiente(){
                     ctxBloco.fillStyle = corRGBA
                     ctxBloco.fill()
                     ctxBloco.fillRect(0, 0, w, h)
                     
                     let grd1 = ctxBloco.createLinearGradient(0, 0, 0, h)
                         grd1.addColorStop(0, 'rgba(0, 0, 0, 0)')
                         grd1.addColorStop(1, 'rgba(0, 0, 0, 1)')
                         ctxBloco.fillStyle = grd1
                         ctxBloco.fillRect(0, 0, w , h)
                         
                         
                     let grd2 = ctxBloco.createLinearGradient(0, 0, w, 0)
                         grd2.addColorStop(0, 'rgba(255, 255, 255, 1)')
                         grd2.addColorStop(1, 'rgba(255, 255, 255, 0)')
                         ctxBloco.fillStyle = grd2
                         ctxBloco.fillRect(0, 0, w, h)
                         
                         
                 }
                 
                 function criarBarraLateral(){
                    
                    let grd = ctxLateral.createLinearGradient(0, 0, w2, h)
                        
                        grd.addColorStop(0, 'rgba(255, 0, 0, 1)')
                        grd.addColorStop(0.16, 'rgba(255, 255, 0, 1)')
                        grd.addColorStop(0.32, 'rgba(0, 255, 0, 1)')
                        grd.addColorStop(0.48, 'rgba(0, 255, 255, 1)')
                        grd.addColorStop(0.64, 'rgba(0, 0, 255, 1)')
                        grd.addColorStop(0.8, 'rgba(255, 0, 255, 1)')
                        grd.addColorStop(1, 'rgba(255 0, 0, 1)')
                        
                    
                    ctxLateral.fillStyle = grd
                    ctxLateral.fill()
                    ctxLateral.fillRect(0, 0, w2, h)
                 }
                 
                 criarBarraLateral()
                 
                 function mudarCor(evt){
                   let {changedTouches} = evt
                       changedTouches = changedTouches[0]
                       
                       let {clientY}   = changedTouches
                       let {offsetTop} = barraLateral
                       
                       let posicaoY = clientY - offsetTop
                       
                       posicaoY > h ? posicaoY = h-1 : ( posicaoY < 0 ? posicaoY = 0 : posicaoY = posicaoY)
                       
                       let cor = obterCor(0, posicaoY, ctxLateral)
                       
                       corRGBA = cor
                       criarGradiente()
                       
                       
                       deslizadorLateral.style.setProperty('top', posicaoY + 'px')
                       
                       deslizadorLateral.style.setProperty('background-color', corRGBA)
                       
                       mudarCorDoBloco({
                           changedTouches : [{
                              clientX : x,
                              clientY : y
                           }]
                       })
                 }
                 
                 function mudarCorDoBloco(evt){
                   let {changedTouches} = evt
                       changedTouches = changedTouches[0]
                       
                       let {clientX, clientY}   = changedTouches
                       let {offsetLeft, offsetTop} = bloco
                       
                       let posicaoX = x - offsetLeft
                       let posicaoY = y - offsetTop
                       
                       
                       posicaoX > w ? posicaoX = w-1 : ( posicaoX < 0 ? posicaoX = 0 : posicaoX = posicaoX)
                       
                       posicaoY > h ? posicaoY = h-1 : ( posicaoY < 0 ? posicaoY = 0 : posicaoY = posicaoY)
                       
                       
                        x = clientX
                        y = clientY
                       
                       
                       let cor = obterCor(posicaoX, posicaoY, ctxBloco)
                       
                       deslizadorDoBloco.style.setProperty('left', posicaoX + 'px')
                       
                       deslizadorDoBloco.style.setProperty('top', posicaoY + 'px')
                       
                       deslizadorDoBloco.style.setProperty('background-color', cor)
                       
                       t.aoAlterar ? t.aoAlterar(hex?corHEX:cor) : null
                       
                       label.style.setProperty('background-color', cor)
                       spanValor.innerText = hex === true ? corHEX : cor
                       corRGB = cor
                 }
                  
                  mudarCorDoBloco({
                           changedTouches : [{
                              clientX : x*2,
                              clientY : y
                           }]
                       })
                       
                  function obterCor(x, y, ctx){
                    let imgData = ctx.getImageData(x, y, 1, 1).data
                        
                        let [r, g, b] = [imgData[0], imgData[1], imgData[2]]
                        
                        corHEX = RGBparaHex(r, g, b)
                        return 'rgb('+r+','+g+','+b+')'
                  }
                  
                   
                   function RGBparaHex(r, g, b) {
                     const hex = (num)=> Number(num).toString(16).padStart(2, '0')
                        r = hex(r)
                        g = hex(g)
                        b = hex(b)
                        
                        return '#'+r+g+b
                   }
                        
                  mudarCor({
                     changedTouches: [{
                     clientX: 0,
                     clientY: 0
                       }]
                   })
                   
                   
                 barraLateral.on('touchstart', (evt)=> mudarCor(evt))
                 
                 barraLateral.on('touchmove', (evt)=> mudarCor(evt))
                 
                 bloco.on('touchstart', (evt)=> mudarCorDoBloco(evt))
                 
                 bloco.on('touchstart', (evt)=> mudarCorDoBloco(evt))
                 
                 
                 bloco.on('touchmove', (evt)=> mudarCorDoBloco(evt))
             
             this.abrir = ()=>{
               fundoSeletor.classList.add('mostrar')
             }
             
             this.fechar = ()=>{
                 elmSeletor.animate([{
                   opacity: 1,
                   transform: 'scale(1)'
                 },{
                   opacity : 0,
                   transform: 'scale(0.9)'
                 }],{
                    duration: 400,
                    easing: 'ease-in-out'
                 })
                 setTimeout(()=>{
                  fundoSeletor.classList.remove('mostrar')
                  t.aoFechar ? t.aoFechar(hex?corHEX:corRGB) : null
                 }, 400)
                 
             }
             
          this.converterParaHEX = ()=>{
              hex = true
              spanValor.innerText = corHEX
          }
        }
      }
      
   
      return SeletorDeCores;
})();
