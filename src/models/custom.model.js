const mongoose = require('mongoose');

const customSchema = mongoose.Schema({
  key: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
});

/**
 * @typedef Custom
 */
const Custom = mongoose.model('Custom', customSchema, 'custom');

module.exports = Custom;
