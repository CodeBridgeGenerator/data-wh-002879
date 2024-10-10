
    module.exports = function (app) {
        const modelName = 'data_w_h';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serviceName: { type: String, required: true, unique: false, lowercase: false, uppercase: false, index: false, trim: false },
count: { type: Number, required: false, max: 10000000 },
data: { type: Schema.Types.Mixed, required: false },
timestamp: { type: Date, required: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };