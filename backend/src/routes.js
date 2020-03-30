const express = require('express');
const Ongcontrollers = require('./controllers/OngControlles');
const incidentsControllers = require('./controllers/incidentsControllers');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const { celebrate, Segments, Joi } = require('celebrate');

const routs = express.Router();


/**
 * Rota / Recursos
 */

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/Listar uma informação do Back-end.
 * POST: Criar uma informação no Back-end.
 * PUT: Alterar uma informação no Back-end.
 * DELETE:  Deletar uma informação no Back-end.
 */



routs.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), sessionController.create);


// rota para pegar dados.
routs.get('/ongs', Ongcontrollers.index);

/**
 * Query
 * Route
 * Body 
 */

// rota para inserir dados.
routs.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), Ongcontrollers.create);
  
// rota para pegar dados
routs.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), profileController.index);


routs.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),

    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),

}), incidentsControllers.create);


routs.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentsControllers.index);

routs.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentsControllers.delete);

module.exports = routs;