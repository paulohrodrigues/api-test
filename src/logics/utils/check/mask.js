class Mask {
    checkMaskPlate(plate) {
        if(!plate) {
            return false;
        }
        const separatePlate = plate.split("-");
        if(!separatePlate[0] || !separatePlate[1]) {
            return false;
        }
        if(typeof separatePlate[0] != "string" || !this.isNumber(separatePlate[1])) {
            return false;
        }
        if(separatePlate[0] !== separatePlate[0].toUpperCase()) {
            return false;
        }
        if(separatePlate[0].length!=3 || separatePlate[1].length!=4) {
            return false;
        }
        return true;
    }

    isNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }
}

const MaskSingleton = new Mask();

export {
    MaskSingleton
}