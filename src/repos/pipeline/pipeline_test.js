import mongoose from 'mongoose';

const pipeline_test = (_id, { offset, size }) =>
[
  {
    '$match': {
      '_id': typeof _id == 'string' ? mongoose.Types.ObjectId(_id) : _id
    }
  }
]

export default pipeline_test;