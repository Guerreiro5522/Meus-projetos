const audio = document.getElementById("meuAudio");
const btn = document.getElementById("meuBotao");
const legendaArea = document.getElementById("legenda-area");

// SINCRONIZAÇÃO COMPLETA - DIE WITH A SMILE
const listaLegendas = [
    { tempo: 10.0, texto: "Eu acabei de acordar de um sonho" },
    { tempo: 14.5, texto: "Onde você e eu tínhamos que dizer adeus" },
    { tempo: 20.5, texto: "E eu não sei o que tudo isso significa" },
    { tempo: 25.5, texto: "Mas desde que sobrevivi, eu percebi..." },
    { tempo: 32.5, texto: "Onde quer que você vá, é para lá que eu vou" },
    { tempo: 38.5, texto: "Ninguém tem o amanhã prometido" },
    { tempo: 44.0, texto: "Então eu vou te amar todas as noites como se fosse a última" },
    { tempo: 48.5, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" },
    { tempo: 58.0, texto: "Bem ao seu lado..." },
    { tempo: 66.2, texto: "Ooooh, se a festa tivesse acabado" },
    { tempo: 69.5, texto: "E o nosso tempo na Terra estivesse terminando" },
    { tempo: 75.0, texto: "Eu iria querer te segurar por um momento" },
    { tempo: 80.5, texto: "E morrer com um sorriso" },
    { tempo: 83.5, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" },
    { tempo: 90.0, texto: "Bem ao seu lado..." },
    { tempo: 98.2, texto: "Perdido, perdido nas palavras que gritamos" },
    { tempo: 104.0, texto: "Eu nem quero mais fazer isso" },
    { tempo: 108.0, texto: "Porque você já sabe o que significa para mim" },
    { tempo: 112.0, texto: "E todo o nosso amor é pelo que vale a pena lutar" },
    { tempo: 118.0, texto: "Onde quer que você vá, é para lá que eu vou" },
    { tempo: 125.0, texto: "Ninguém tem o amanhã prometido" },
    { tempo: 130.0, texto: "Então eu vou te amar todas as noites como se fosse a última" },
    { tempo: 138.0, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" },
    { tempo: 148.0, texto: "Se a festa tivesse acabado e o nosso tempo na Terra terminasse" },
    { tempo: 158.0, texto: "Eu iria querer te segurar por um momento" },
    { tempo: 163.0, texto: "E morrer com um sorriso" },
    { tempo: 168.0, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" },
    { tempo: 178.0, texto: "Bem ao seu lado, ao seu lado" },
    { tempo: 185.0, texto: "Bem ao seu lado..." },
    { tempo: 210.0, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" },
    { tempo: 220.0, texto: "Se a festa tivesse acabado e o nosso tempo na Terra terminasse" },
    { tempo: 230.0, texto: "Eu iria querer te segurar por um momento" },
    { tempo: 235.0, texto: "E morrer com um sorriso" },
    { tempo: 240.0, texto: "Se o mundo estivesse acabando, eu iria querer estar ao seu lado" }
];

// Divide o texto respeitando emojis (🥹, ❤️, 🔒, etc.)
function dividirGrafemas(texto) {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
        const segmenter = new Intl.Segmenter("pt-BR", { granularity: "grapheme" });
        return Array.from(segmenter.segment(texto), s => s.segment);
    }
    return Array.from(texto); // fallback
}

function dispararBalao(idBalao, idTexto, mensagem) {
    const balao = document.getElementById(idBalao);
    const areaTexto = document.getElementById(idTexto);
    if(!balao || !areaTexto) return;

    balao.style.opacity = "1";
    areaTexto.innerHTML = ""; 

    const caracteres = dividirGrafemas(mensagem);

    caracteres.forEach((char, index) => {
        if (char === "\n") {
            areaTexto.appendChild(document.createElement("br"));
            return;
        }
        const span = document.createElement("span");
        if (char === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = char; // textContent preserva emojis corretamente
        }
        span.classList.add("letra"); 
        span.style.animationDelay = `${index * 0.03}s`; 
        areaTexto.appendChild(span);
    });
}

function iniciar() {
    btn.innerText = "Aguarde que está carregando";
    btn.classList.add("botao-carregando");
    audio.play().catch(e => console.log("Erro ao iniciar áudio:", e));
}

audio.ontimeupdate = () => {
    let tempoAtual = audio.currentTime;
    let fraseEncontrada = "";

    for (let i = listaLegendas.length - 1; i >= 0; i--) {
        if (tempoAtual >= listaLegendas[i].tempo) {
            fraseEncontrada = listaLegendas[i].texto;
            break; 
        }
    }

    if (tempoAtual < 95) {
        if (legendaArea.getAttribute("data-texto") !== fraseEncontrada) {
            legendaArea.setAttribute("data-texto", fraseEncontrada);
            legendaArea.innerHTML = ""; 

            if (fraseEncontrada !== "") {
                const letrasLegenda = dividirGrafemas(fraseEncontrada);
                letrasLegenda.forEach((char, index) => {
                    const span = document.createElement("span");
                    if (char === " ") {
                        span.innerHTML = "&nbsp;";
                    } else {
                        span.textContent = char;
                    }
                    span.classList.add("letra");
                    span.style.animationDelay = `${index * 0.04}s`; 
                    legendaArea.appendChild(span);
                });
            }
        }
    } else {
        // Quando o balão 3 começa, esconde a legenda com fade suave
        if (legendaArea.style.opacity !== "0") {
            legendaArea.style.transition = "opacity 1.5s";
            legendaArea.style.opacity = "0";
            legendaArea.setAttribute("data-texto", "");
        }
    }

    if (tempoAtual >= 45) {
        btn.style.transition = "opacity 1s";
        btn.style.opacity = "0";
        setTimeout(() => { if(btn) btn.style.display = "none"; }, 1000);

        const todosCoracoes = document.querySelectorAll('.coracao-svg');
        todosCoracoes.forEach(coracao => {
            coracao.style.stroke = "#330000"; 
            coracao.style.opacity = "0.3";    
        });

        const galeria = document.getElementById("galeria");
        if(galeria) galeria.style.opacity = "0";
    }

    // --- LÓGICA DOS BALÕES ---

    if (tempoAtual >= 50 && !btn.dataset.b1) {
        btn.dataset.b1 = "true";
        const msg1 = "Amor, se um dia você duvidar do quanto é importante, olha pra mim… porque foi você que me ensinou o que é amar de verdade e ser amado, pois de tanto apanhar é difícil pensar que não sou amado, e se o mundo inteiro desmoronar, eu ainda vou estar aqui, segurando sua mão, escolhendo você todos os dias… porque você não é só o amor da minha vida, você é a minha vida inteira. 🥹🌹";
        dispararBalao("balao-1", "texto-balao-1", msg1);
    }

    if (tempoAtual >= 74 && !btn.dataset.b2) {
        btn.dataset.b2 = "true";
        const msg2 = "Dia bacana, um dos dias mais memoráveis que tive com você. Não teve igual. Nesse dia você já estava começando a brigar comigo, mas tipo, o amor é lindo sabe kkkk. Te amo muito e amei o dia, e até hoje a amo, amo mais que tudo mô.";
        dispararBalao("balao-2", "texto-balao-2", msg2);
    }

    if (tempoAtual >= 95 && !btn.dataset.b3) {
        btn.dataset.b3 = "true";
        const msg3 = "4 de março de 2024. O mundo continuou girando, mas para mim, o tempo parou nessa foto. Sabe, às vezes eu me pego te olhando e meu peito aperta de tanta gratidão. Eu vejo sua força, seu carinho, e percebo o quanto você me transformou. Antes de você, eu existia; com você, eu aprendi a viver. Você curou lugares em mim que eu nem sabia que doíam e me mostrou que o amor de verdade não machuca, ele acolhe. Eu quero envelhecer segurando essa sua mão que nunca soltou a minha. Você é o meu maior presente, hoje e para todo o sempre. ❤️🔒";
        dispararBalao("balao-3", "texto-balao-3", msg3);
    }

    // --- MOLDURAS COM FOTOS (m1 a m13) ---
    const tempoInicialMolduras = 100;
    const intervaloEntreMolduras = 2;

    for (let i = 1; i <= 13; i++) {
        const tempoEntrada = tempoInicialMolduras + (i - 1) * intervaloEntreMolduras;
        const moldura = document.getElementById(`moldura-${i}`);
        if (!moldura) continue;

        if (tempoAtual >= tempoEntrada && !moldura.classList.contains("visivel")) {
            moldura.classList.add("visivel");
        }
    }

    // 14 - Balão central com texto formatado igual ao bloco de notas
    const tempoCentral = tempoInicialMolduras + 13 * intervaloEntreMolduras;
    if (tempoAtual >= tempoCentral && !btn.dataset.b14) {
        btn.dataset.b14 = "true";
        const msgCentral = `Data do início de toda a história: 10/11/2023
Data do fim da história: Indeterminado

Meu amor, fiz esse vídeo para você com todo
o meu amor, mostrando nossa linha do tempo.
Espero que tenha gostado. Demorei, mas
consegui fazer isso especialmente para você.
Saiba que isso é uma fração do quanto eu
te amo. Não chore, não é para chorar.
Estou aqui te amando e te vigiando. O tempo
é curto, porém é nesse tempo curto que montamos
nossa história. Sou chato mesmo, puxo seu pé,
pois quero o melhor para você. Te amo muito,
minha princesa. ❤️`;
        dispararBalao("balao-especial", "texto-balao-central", msgCentral);
    }
}; 

// Slideshow das fotos lateral
let fotos = document.querySelectorAll('.foto-container img');
let fotoAtual = 0;
setInterval(() => {
    if(fotos.length > 0) {
        fotos[fotoAtual].classList.remove('ativa');
        fotoAtual = (fotoAtual + 1) % fotos.length;
        fotos[fotoAtual].classList.add('ativa');
    }
}, 4000);