enum DRI {
    //% block="M1(P7,P16~)"
    1,
    //% block="M2(P6,P8~)"
    2,

}

enum DER {
    //% block="正转"
    1,
    //% block="反转"
    0,

}

enum STOP {
    //% block="M1(P7,P16~)"
    1,
    //% block="M2(P6,P8~)"
    2,
    //% block="全部"
    3
}


//% color="#fa1644" iconWidth=50 iconHeight=40
namespace Maxbot{


    
    //% block="电机[DRI]以[NUM]速度[DER]" blockType="command"
    //% DRI.shadow="dropdownRound" DRI.options="DRI" DRI.defl="DRI.1"
    //% NUM.shadow="range" NUM.params.min=0 NUM.params.max=1023 NUM.defl=0
    //% DER.shadow="dropdownRound" DER.options="DER" DER.defl="DER.1"
    export function speed(parameter: any, block: any){
        let driver = parameter.DRI.code
        let number = parameter.NUM.code
        let der = parameter.DER.code

        Generator.addImport("from pinpong.board import Pin");
        Generator.addImport("from pinpong.board import Board");

        // Generator.addInitHeader("init","Board().begin()");
        Generator.addInit("pin1","pin1 = Pin(Pin.P7, Pin.OUT)");
        Generator.addInit("pin2","pin2 = Pin(Pin.P16, Pin.PWM)");
        Generator.addInit("pin3","pin3 = Pin(Pin.P6, Pin.OUT)");
        Generator.addInit("pin4","pin4 = Pin(Pin.P8, Pin.PWM)")
        if (driver == "1"){
            Generator.addCode(`pin1.write_digital(${der})`)
            Generator.addCode(`pin2.write_analog(${number})`)
        }
        else {
            Generator.addCode(`pin3.write_digital(${der})`)
            Generator.addCode(`pin4.write_analog(${number})`)
        }
    }

    //% block="电机[STOP]停止" blockType="command"
    //% STOP.shadow="dropdownRound" STOP.options="STOP" STOP.defl="STOP.1"
    export function stop(parameter: any, block: any){
        let stop = parameter.STOP.code
        Generator.addImport("from pinpong.board import Pin");
        Generator.addImport("from pinpong.board import Board");

        // Generator.addInitHeader("init","Board().begin()");
        Generator.addInit("pin1","pin1 = Pin(Pin.P7, Pin.OUT)");
        Generator.addInit("pin2","pin2 = Pin(Pin.P16, Pin.PWM)");
        Generator.addInit("pin3","pin3 = Pin(Pin.P6, Pin.OUT)");
        Generator.addInit("pin4","pin4 = Pin(Pin.P8, Pin.PWM)")
        if (stop == "1"){
            Generator.addCode(`pin2.write_analog(0)`)
        }
        else if(stop == "2"){
            Generator.addCode(`pin4.write_analog(0)`)
        }
        else {
            Generator.addCode(`pin2.write_analog(0)`)
            Generator.addCode(`pin4.write_analog(0)`)
        }
    }

}