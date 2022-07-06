const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const nameSchema = mongoose.Schema(
  {
    name: { type: String, unique: true, trim: true, required: true },
    owner: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

nameSchema.plugin(toJSON);
nameSchema.plugin(paginate);

/**
 * @typedef Name
 */
const Name = mongoose.model('Name', nameSchema, 'name');

module.exports = Name;
