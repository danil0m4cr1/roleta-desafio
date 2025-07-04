import './Roleta.css';
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import CopoPremium from '../../assets/copo-premium.png';
import Bandana from '../../assets/bandana.png';
import EcoBag from '../../assets/eco-bag.png';
import Ingresso1 from '../../assets/ingresso1.png';
import Ingresso2 from '../../assets/ingresso2.png';
import Bone from '../../assets/bone.png';
import Chaveiro from '../../assets/chaveiro.png';
import Leque from '../../assets/leque.png';
import PowerBank from '../../assets/powerbank.png';
import Adesivo from '../../assets/adesivo.png';


function Roleta(){
    const premios = [
        { nome: "Copo Premium", horario: '13:00:00', img: CopoPremium },
        { nome: "Bandana", horario: '13:26:04', img: Bandana },
        { nome: "Ecobag", horario: '13:53:20', img: EcoBag }, 
        { nome: "Ingresso 14/08", horario: '14:20:00', img: Ingresso1 },
        { nome: "Boné", horario: '14:46:40', img: Bone },
        { nome: "Chaveiro", horario: '15:13:20', img: Chaveiro },
        { nome: "Leque", horario: '15:40:00', img: Leque },
        { nome: "Power Bank", horario: '16:06:40', img: PowerBank },
        { nome: "Adesivos", horario: '16:33:20', img: Adesivo }, 
        { nome: "Ingresso 15/08", horario: '17:00:00', img: Ingresso2 }
    ];

    const [angulo, setAngulo] = useState(0);
    const [premio, setPremio] = useState('');
    const [girar, setGirar] = useState(true);
    const [telaPremio, setTelaPremio] = useState('hidden');

    function pegarHorario(){
        const data = new Date();
        const h = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
        const min = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
        const seg = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds();
        const horarioAtual = `${h}${min}${seg}`;

        return { h, min, seg, horarioAtual };
    }

    function verificarHorario(){ // Verifica tudo em relação ao horário
        const { h, min, horarioAtual } = pegarHorario();
        let premioAtual = null;

        if(h >= 13 && h <= 17){ // Verifica horários entre 13-17
            if(h != 17 || h == 17 && min <= 10){ // Verifica até os ultimos minutos - 17:10
                setGirar(true);
                premios.map((premio, ind) => {
                    const [h2, m2, s2] = premio.horario.split(':');
                    const horarioPremio = `${h2}${m2}${s2}`;
                    
                    if(horarioAtual >= horarioPremio){ // Verifica qual premio deve ser escolhido
                        premioAtual = ind;
                    }
                });
                return premioAtual;
            }
            setGirar(false);
        } else {
            setGirar(false);
            return premioAtual;
        };
    }

    function girarRoleta(indice){ // Giro da roleta
        if(indice != null){ // Verifica se é nulo ou não
            const anguloInd = 34 * (indice-1);
            const giros = 360 * 4;
            let novoAngulo = 0;

            switch(indice){
                case 1: // Já é na posição 0
                    novoAngulo = giros;
                    break;
                default: // Os premios restantes são necessários negativar o angulo em questão
                    novoAngulo = (-anguloInd) + giros;
                    break;
            }
            
            setAngulo(novoAngulo);
            setPremio(premios[indice]);

            const telaPremio = setInterval(()=>{ // Mostra a janela de premio recebido
                setTelaPremio('premio');
                clearInterval(telaPremio);
            }, 4000);
        }
    }

    const { h, min } = pegarHorario();
    let disponivel = '';
    if(h >= 13 && h <= 17){ // Classes para disponibilidade da funcionalidade de giro
        if(h == 17 && min > 10){
            disponivel = 'ndisponivel';
        } else {
            disponivel = 'disponivel';
        }
    } else {
        disponivel = 'ndisponivel';
    };

    return (
        <div className="container">
            <h1>Rode a Roleta da Sorte!</h1>
            
            <div className="roleta">

                <div onClick={() => girar ? girarRoleta(verificarHorario()) : null}
                className="pointer">
                    <span className={disponivel}>Gire!</span>
                </div>

                <div style={{transform: `rotate(${angulo}deg)` }} className="circle">
                    
                    <div className="segment one">
                        <p>Copo Premium</p>
                    </div>

                    <div className="segment two">
                        <p>Bandana</p>
                    </div>

                    <div className="segment three">
                        <p>Ecobag</p>
                    </div>

                    <div className="segment four">
                        <p>Ingresso 14/08</p>
                    </div>

                    <div className="segment five">
                        <p>Boné</p>
                    </div>

                    <div className="segment six">
                        <p>Chaveiro</p>
                    </div>

                    <div className="segment seven">
                        <p>Leque</p>
                    </div>

                    <div className="segment eight">
                        <p>Power Bank</p>
                    </div>

                    <div className="segment nine">
                        <p>Adesivos</p>
                    </div>

                    <div className="segment ten">
                        <p>Ingresso 15/08</p>
                    </div>

                </div>

            </div>

            <div className={telaPremio} id='premio-container'>
                <div className="premio-content">
                    <h1>Parabéns! Você ganhou:<br/>{premio.nome}</h1>
                    <img src={premio.img} />
                    <p>Para retirar seu prêmio, fale com o administrador!</p>
                    <div className="button">
                        <button onClick={() => setTelaPremio('hidden')}>
                            <ChevronLeft />
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
                
        </div>
    );

}

export default Roleta;