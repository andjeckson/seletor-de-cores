/* Seletor de cores © Andjeckson Tavares Guimarães - 2024 */

var SeletorDeCores = (function(){
      'use strict'
      
      var $ = document.querySelector.bind(document);
      
      class SeletorDeCores{
          constructor(){
             let corRGBA = 'rgba(255, 0, 0, 1)';
             let corHEX = '#ff0000'
             let hex = false
             let x = 150;
             let y = 0;
             let w = 180
             let h = 150
             let w2 = 10
             let t = this
             
             
             let elmSeletor = document.createElement('div')
                 elmSeletor.classList.add('seletor-de-cores')
             
             let flexbox = document.createElement('div')
                 flexbox.classList.add('flexbox')
             
             let bloco = document.createElement('div')
                 bloco.classList.add('bloco-de-cores')
                 
             let canvasBloco = document.createElement('canvas')
             
             let deslizadorDoBloco = document.createElement('span')
                deslizadorDoBloco.classList.add('deslizador')
             
             let barraLateral = document.createElement('div')
                 barraLateral.classList.add('barra-lateral')
                 
             let canvasLateral = document.createElement('canvas')
             
             let deslizadorLateral = document.createElement('span')
             
                deslizadorLateral.classList.add('deslizador')
             
             let section = document.createElement('section')
                 section.classList.add('acoes')
             
             let flexboxItens = document.createElement('div')
                 flexboxItens.classList.add('flexbox-itens')
                 
             let label = document.createElement('label')
             let spanValor = document.createElement('span')
                 spanValor.innerText = hex === true ? corHEX : corRGBA
             
             let flexboxBtn = document.createElement('div')
                 flexboxBtn.classList.add('flexbox-btn')
             
             let btnFechar = document.createElement('button')
                 btnFechar.setAttribute('type','button')
                 btnFechar.innerText = 'Fechar'
                 
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
                 
                 
                 document.body.appendChild(elmSeletor)
                 
                 
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
                       
                       t.aoSelecionar ? t.aoSelecionar(hex?corHEX:cor) : null
                       
                       label.style.setProperty('background-color', cor)
                       spanValor.innerText = hex === true ? corHEX : cor
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
                   
                   
                 barraLateral.addEventListener('touchstart', (evt)=> mudarCor(evt))
                 
                 barraLateral.addEventListener('touchmove', (evt)=> mudarCor(evt))
                 
                 bloco.addEventListener('touchstart', (evt)=> mudarCorDoBloco(evt))
                 
                 bloco.addEventListener('touchstart', (evt)=> mudarCorDoBloco(evt))
                 
                 
                 bloco.addEventListener('touchmove', (evt)=> mudarCorDoBloco(evt))
             
             this.abrir = ()=>{
               elmSeletor.classList.add('mostrar')
             }
             
          this.converterParaHEX = ()=>{
              hex = true
              spanValor.innerText = corHEX
          }
        }
      }
      
      return SeletorDeCores;
})();
                   
