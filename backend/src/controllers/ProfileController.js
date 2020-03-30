const connection = require('../database/connection');

module.exports = {
    async index (request, response){
        const ond_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ond_id)
            .select('*');
        return response.json(incidents);
    }
}