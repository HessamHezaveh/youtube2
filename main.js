//now we should attach it in to our windo object 
//const THREE = window.MINDAR.IMAGE.THREE;
//modular 
import * as THREE from 'three';
//import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { CSS3DObject } from './src/CSS3DRenderer.js';
import { MindARThree} from 'mindar-image-three';

console.log(CSS3DObject);
// import {loadVideo } from './src/loader.js';
// import {createChromaMaterial} from "./src/chroma-video.js" ;


const createYoutube=() =>{
        return new Promise((resolve, reject)=>{
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                const onYouTubeIframeAPIReady=() =>{
                        const player=new onYouTubeIframeAPIReady.player('player',{
                                videoId:"1yE9DBF-Qow",
                                events:{
                                        onReady:()=>{
                                                resolve(player);
                                        }
                                }
                        })
                }
        })
}



document.addEventListener('DOMContentLoaded', () =>{
const start = async() => {
        const player = await createYoutube();

        //instantiate the image 
        const mindarThree = new MindARThree({
            container: document.body,  
            //container: document.querySelector("#my-ar-container"),
            imageTargetSrc: './assets/targets.mind',
        });

        const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

        const obj = new CSS3DObject(document.querySelector("#ar-div"));
        const cssAnchor = mindarThree.addCSSAnchor(0)

        cssAnchor.group.add(obj);


        cssAnchor.onTargetFound = () =>{
                player.playVideo();
        }
        cssAnchor.onTargetLost=()=>{
                player.pauseVideo();
        }



//////////START the engine
        //await must use in a syc 
        await mindarThree.start();
        renderer.setAnimationLoop(()=>{
                cssRenderer.render(cssScene, camera);

        });
    }
    start();
//     const button = document.createElement("button");
//     button.textContent = "Start";
//     button.addEventListener("click", start);
//     document.body.appendChild(button);



});