const { DataWH } = require('./dataWH.class');
const createModel = require('../../models/dataWH.model');
const hooks = require('./dataWH.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/dataWH', new DataWH(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('dataWH');

  // Get the schema of the collections 
  app.get("/dataWHSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};