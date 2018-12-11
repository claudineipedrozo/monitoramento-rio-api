import express from 'express';
import MonitoramentoController from '../controllers/MonitoramentoController';

const router = express.Router();
const controller = new MonitoramentoController();


router.get('/leitura', controller.realizarLeituraDoDia)

export default router;
