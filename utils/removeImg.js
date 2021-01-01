const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)

module.exports.removeImg=async function(id, model){

        const oldImageDelete=await model.findById(id)
        str=oldImageDelete.imagePath          
        await unlinkAsync(str)
       
}
