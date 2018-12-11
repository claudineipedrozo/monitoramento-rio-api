import axios from 'axios';
import { URL_API_ANA } from '../config';
import dateFormat from 'dateformat';
import xml2js from 'xml2js';
import xpath from 'xml2js-xpath';


class MonitoramentoController {

    realizarLeituraDoDia(req, res) {

        try {
            const dataAtual = dateFormat(new Date(), 'dd/mm/yyyy');
            const url = URL_API_ANA
                .replace('DATA_INICIO', dataAtual)
                .replace('DATA_FIM', dataAtual);
            axios
                .get(url)
                .then(resposta => {
                    xml2js.parseString(resposta.data, (erro, json) => {
                        let dados = xpath.find(json, "//DadosHidrometereologicos");

                        /*const pegaHora = (dataHorario) => {
                           
                        };*/
                        
                        let resultado = [];
                        dados.forEach(dado => {
                            let elemento = {
                                nivel: dado["Nivel"][0],
                                chuva: dado["Chuva"][0],
                                dataHorario: dado["DataHora"][0].substring(10, 16)
                            };
                            
                            resultado.push(elemento);
                        });
                        resultado.reverse();
                        res.json(resultado);

                    });
                        
                                        
                })
                .catch(erro => res.status(500).json(erro));
        } catch (erro) {
            console.log(erro);
        }

    }
}

export default MonitoramentoController;

//xml2js
//xml2js-xpath